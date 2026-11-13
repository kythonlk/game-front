# Project Memory — game-front

> Shared work log + context for all AI agents (opencode · codex · agy).
> **New chat? Read this whole file first. Update it after every task.**

## Project snapshot
- Browser game collection at `/var/home/kythonlk/ai/game-front`.
- `index.html` is the Saltline FPS page shell. Its ES modules, CSS, selected maps, weapons, FPV mode and locally bundled recordings live in `src/`; `snake.html` is the former root game. `Game-java` is a separate React/Vite project.

## Commands that matter
- Preview: `python3 -m http.server 8087 --bind 127.0.0.1`.
- Regression (server required): `PLAYWRIGHT_MODULE=/var/home/kythonlk/ext/erp/FocusX/focusx-perf/node_modules/playwright node tests/check-saltline.cjs` (or omit env if playwright is installed locally).
- Tests recursively syntax-check `src/**/*.js` and exercise gameplay in Chromium. Run the suites sequentially; parallel software-rendered browsers can time out.
- Additional suites (same `PLAYWRIGHT_MODULE` env): `node tests/check-auto-shotgun.cjs`, `node tests/check-fpv.cjs`, `node tests/check-expansion.cjs`, `node tests/check-loading.cjs`, `node tests/check-maps.cjs`. The map suite walks both bridges and tower stairs using the actual controller, operates the elevated relay, checks long sightlines/nav and completes foot missions.
- Serve the full repository over HTTP; ES module imports do not work by opening `index.html` as `file://`. No build step required.
- Robot preview: `/index.html?show=enemies&eshow=soldier&efreeze=1`.

## Current state (update me)
- Runtime, CSS and optional new map URLs include `v=20261113-layouts` to bypass stale browser modules. User preview server is running on port 8087.
- Base commit is `a49335a` (`update`). Frost Pier rebuild, Eagle’s Nest map, map loading/UI/navigation changes, tests/docs and this memory update are uncommitted; no commit or push requested.
- Four maps. Frost Pier now has a frozen canal, two bridges, three radomes, an instrument court and an eastern tank peninsula; its original warehouse/cargo layout was removed. Eagle’s Nest (`?map=eaglesnest`) is a 100 × 208 m military valley with low barracks, distant firing lanes and a 12 m tower. Three switchback stair flights lead to the deck and Relay A; foot deployments equip the SR-7. Original wet/rainy Berth 4 and fully rebuilt Dry Basin (legacy URL `?map=crossdock`). Dry Basin has its own east warehouse, west cargo lanes, north utilities, relays, deployment/exit, cover/spawns, gravel terrain, quarry backdrop and warm dusty daylight. No rain, puddles, sea or coastal audio there.
- Four on-foot operations remain: First Contact (4 enemies), Warehouse Sweep (8), Terminal Blackout (12), Drone Swarm with Easy/Normal/Hard levels (12/20/30 drones; caps 3/5/7).
- FPV mode has Sky Sweep (8 flying drones), Machine Hunt (10 mixed robots), Radar Run (11 mixed robots plus scanning radars). Finite waves, passive intro enemies, supplies, retries and next-mission progression work on both maps.
- FPV uses damped WASD flight, Space up, Z/C down, Shift boost, mouse look, swept hull collision, a 20m ceiling and a fictional rechargeable pulse projector. Touch UP/DOWN are wired. Radar uses rotating sectors, physics visibility, exposure/damage and requires clearing contact after the final target.
- Five human weapons: PAC-9, SR-7 sniper, pump shotgun, Glock 17, A-12 automatic shotgun. Keys 1–5 select; X/touch SWAP cycles. Automatic shotgun: 10+50 shells, 8 pellets, held automatic fire, magazine/empty reload, animated bolt/box magazine and detailed model. SR-7 sniper scope has detailed 3D optic hardware and a multi-ring illuminated FFP mil-dot/stadiametric HUD reticle. Pump shotgun, Glock 17 and A-12 models have upgraded tactical detail while preserving all original weapon mechanics/controls.
- `index.html` is now a tiny shell. Shared engine/runtime/styles are separate; selected map, FPV mode and weapon modules load on demand. Human weapon models are constructed only when equipped. Direct FPV startup loads no human weapon modules/models. Recordings load on first deployment when audio is enabled.
- Default graphics: desktop Medium, integrated/software/mobile Low. Low uses 1024 shadows and disables bloom/AO/reflections/volumetrics; Medium removes MSAA/reflections and reduces volumetrics. Explicit High/Ultra remain available. HUD enemy text only changes when its value changes.
- Map selection preserves mission/swarm level; mode-specific mission cards remember choices. Deploy remains in a fixed footer and displays loading state while new mode/audio assets arrive.
- All six documented Chromium suites passed, including new map walking/foot completion checks: existing gameplay/audio, automatic shotgun, FPV controls, expansion missions/radar, and selective loading/audio/touch. New source syntax and audio-tool Python syntax passed; no browser errors. Dry Basin, shotgun and live FPV screenshots inspected. Existing user preview server remains running on port 8087.

## Work log
### 2026-11-13 — codex — Distinct Frost Pier and Eagle’s Nest sniper map
- What: Rebuilt map 3 around a frozen canal with twin bridges, radomes, instrument huts and tank peninsula; added a separate 208 m military valley with barracks, open firing lanes and a covered 12 m sniper tower. Tower stairs are walkable in both directions and Relay A is on the deck. Foot deployments equip SR-7; all existing foot/FPV operations work. Expanded nav/bounds/search budget, suppressed coastal/rain audio on new maps, fixed outer menu scrolling and refreshed asset URLs.
- Files: `src/maps/{frost-pier,eagles-nest}.js`, `src/runtime.js`, `src/game.css`, `index.html`, `tests/check-{maps,expansion,loading}.cjs`, `README.md`, `memory.md`.
- Verified: All six documented Chromium suites passed sequentially. Both new maps complete all four foot operations; all four maps complete all three FPV operations/radar checks. Actual controller walks both bridges, climbs/descends the tower, operates its elevated relay and has a clear 140+ m firing lane. Objective/extraction paths, selective loading and desktop/mobile/landscape menus pass. Rendered previews inspected; zero runtime errors; JS syntax/whitespace pass. Existing preview server left running; no commit/push.

### 2026-11-13 — codex — Refresh cached Frost Pier modules
- What: User still saw the old `xs` constructor error; confirmed their running localhost server serves the corrected source. Versioned runtime and Frost Pier module URLs so cached pre-fix modules are bypassed; added a network URL regression assertion.
- Files: `index.html`, `src/runtime.js`, `tests/check-loading.cjs`, `memory.md`.
- Verified: Documented loading suite passed (foot/FPV Frost Pier, lazy assets, audio and touch). JS syntax and whitespace passed. Existing user preview server on 8087 left running.

### 2026-11-13 — codex — Fix Frost Pier loading
- What: Replaced incompatible geometry/prop helper calls with shared map-builder adapters; resolved material names, geometry constructors, texture wrapping, scene/sky access and ground/backdrop contracts. Added foot/FPV loading assertions requiring real colliders, ground and backdrop.
- Files: `src/maps/frost-pier.js`, `tests/check-loading.cjs`, `memory.md`.
- Verified: All five documented Chromium suites passed sequentially; Frost Pier boots into foot/FPV gameplay and completes all three FPV missions/radar checks with zero runtime errors. Source/test syntax and whitespace checks passed. Preview server stopped.

### 2026-11-10 — codex — Humanoid robots and combat audio
- What: Rebuilt soldier geometry and walk articulation, synchronized mechanical footsteps, added aim cue and soldier showcase, rebuilt rifle synthesis and soldier effects, adjusted mix.
- Files: `s.html`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: JS syntax passed; browser regression passed: steps, shots, hits, death, retirement, 103 audio buffers loaded, five effects playable, zero runtime errors.

### 2026-11-10 — codex — Replace synthetic combat audio with recordings
- What: User rejected synthetic sounds and requested internet samples plus git push. Embedded CC0 firearm and mechanical recordings from OpenSpades Free Assets, retained provenance, removed synthetic shot layers and distortion.
- Files: `s.html`, `assets/audio/{CREDITS.md,manifest.json}`, `tools/embed-saltline-audio.py`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: Browser regression passed, 14 recorded effects playable, 96 buffers loaded, zero runtime errors; 17 PCM clips passed peak/fade checks. `git fetch origin` showed main had no divergence before commit.

### 2026-11-10 — codex — Add SR-7 sniper rifle
- What: Added a selectable sniper with its own model, scope, ammo, bolt/reload animations, recorded gunshot, keyboard/touch switching, and HUD cues. Preserved PAC-9 via a loadout wrapper.
- Files: `s.html`, audio credits/manifest and embed tool, browser regression test.
- Verified: Full Chromium regression passed; scope FOV 22.04°, one shot per click, no repeat while held, reload 3→5 rounds consuming two reserve, rifle ammo preserved, empty magazine stable, 110 damage/550 range, zero runtime errors. Hip/scoped previews inspected; added UTF-8 declaration after spotting misdecoded HUD punctuation.

### 2026-11-10 — codex — Commit and push sniper
- What: Prepared the tested SR-7 changes for commit and push to `origin/main` at user request.
- Files: `s.html`, audio credits/manifest, embed tool, browser tests, memory.
- Verified: Prior full browser regression passed; pre-commit inline JavaScript syntax and whitespace checks passed. No gameplay changes since validation beyond UTF-8 metadata.

### 2026-11-10 — codex — Match sniper detail to main rifle
- What: Rebuilt SR-7 with PAC-9 materials/gloves/optics, detailed hardware and markings, animated hands, recoil flash, movement sway, and improved framing.
- Files: `s.html`, `memory.md`.
- Verified: Existing full browser regression passed, including sniper damage/range, single-shot behavior, ammo/reload/switching, scope and 15 audio effects; zero errors. Hip/bolt/reload views inspected separately. Corrected lens/backing overlap and rechecked rendering.

### 2026-11-10 — codex — Three missions, easier balance, shotgun and controls
- What: Added three selectable mission profiles with finite enemy budgets, active caps, objective/reward tuning and progress HUD; added recorded shotgun audio and detailed pump shotgun; automatic sniper reload and Z/C crouch. Used subagents for shotgun and smaller review/reload checks. Preserved the user's rename to `index.html` and updated tooling paths.
- Files: `index.html`, `tests/check-saltline.cjs`, `tools/embed-saltline-audio.py`, `assets/audio/{CREDITS.md,manifest.json}`, `memory.md`.
- Verified: Full documented Chromium regression passed for combat/audio, sniper, shotgun, missions (4/8/12 enemies; active caps 2/3/4), crouch and mission menu. Final targeted check on `index.html` passed all five auto-reload assertions, including re-equipping empty, plus Next Mission navigation and zero runtime errors. JS/Python syntax, PCM bounds/fades and whitespace checks passed; desktop/mobile menus and shotgun render inspected.

### 2026-11-10 — codex — Add selectable Crossdock map
- What: Added an alternate layout using the existing prop/material generators and shared warehouse/quay shell. Rebuilt container rows and loading court, relocated yard relay and raised catwalk, supplied matching spawn/cover/cinematic data, and added a map selector preserving mission choice. Used a small-model subagent for read-only implementation review.
- Files: `index.html`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: Full documented browser regression passed, including all three mission completions on both maps, weapon/audio/control checks, map selection and retained mission, accessible relay/extraction approaches and ground spawns, and container collisions. Zero runtime errors; desktop/mobile menus and aerial map render inspected. Crossdock has 19 containers and 226 placed objects.

### 2026-11-10 — codex — Add drone-only swarm mission
- What: Added Mission 04, Drone Swarm, on both maps: 20 flying gull drones, five active maximum, two shooters, drone target markers/countdown, supplies every five kills, and immediate success after the last kill without relays or extraction. Added mission-specific radio/death/debrief handling and responsive four-mission menu. Small-model review caught and helped prevent intro attacks.
- Files: `index.html`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: Full documented Chromium regression passed on both maps. New checks verify intro passivity/activation, exactly 20 gulls and no ground enemies, max five active, actual airborne weapon hit, five-kill supply, no boat/relay bypass, one remaining prevents victory, final kill completes away from extraction, pause/retry/death, restored relay HUD and menu deployment. Existing weapon/audio/map/mission tests passed; zero runtime errors; menu screenshots inspected. Preview server stopped after verification.

### 2026-11-10 — codex — Keep Deploy accessible after mission selection
- What: Reproduced Deploy falling below the visible area after selecting Drone Swarm at 800×600 and 360×640. Moved title-menu actions into a separate fixed footer, made the mission content independently scrollable, and keep the selected card in view.
- Files: `index.html`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: Full documented Chromium regression passed for all four missions on both maps, audio/weapons and controls. New raw-coordinate checks verify visible/unobstructed Deploy and transition into Drone Swarm at seven desktop/mobile/landscape sizes; actual touch events also deployed successfully. Mobile footer screenshot inspected, zero runtime errors, whitespace check passed. Preview server stopped.

### 2026-11-10 — codex — Widen shotgun pellet pattern
- What: Increased shotgun base spread from .055 to .085 at the hip and .032 to .050 while aiming (roughly 55% wider). Retained eight pellets, damage, range falloff, reload and movement modifiers.
- Files: `index.html`, `memory.md`.
- Verified: Full documented Chromium regression passed, including shotgun pellet counts/damage/wall blocking/reload, all four missions on both maps, weapon/audio controls, Deploy visibility and touch input. No runtime errors; whitespace check passed. Preview server stopped.

### 2026-11-11 — codex — Swarm levels, shotgun detail and Glock 17
- What: Added Easy/Normal/Hard Drone Swarm profiles (12/20/30 targets; active caps 3/5/7), level selector/query persistence and Next Swarm Level progression. Rebuilt shotgun visual detail while preserving spread/gameplay. Added Glock 17 as slot/key 4 with textured frame, detailed slide/sights, gloved hands, 17-round semi-auto fire, slide lock, magazine and automatic reloads, and recorded audio reuse. Integrated four-weapon keyboard/touch cycling and resupply. Used subagents for both weapon models and a smaller-model mission review.
- Files: `index.html`, `tests/check-saltline.cjs`, `tools/embed-saltline-audio.py`, `assets/audio/CREDITS.md`, `memory.md`.
- Verified: Full documented browser regression passed for all existing gameplay and all three swarm levels on both maps, level advancement, drone-only targets/caps/retries and deployment. Glock checks passed single-click fire, ADS, slide lock, manual/auto/partial reload, dry magazine and re-equipping. Separate actual key-4/X/touch-cycle and pistol resupply checks passed, as did direct level URL/map preservation. Shotgun/Glock hip, aimed and reload renders and mobile level menu inspected; zero runtime errors; JS/Python syntax and whitespace checks passed. Preview server stopped.

### 2026-11-11 — codex — Dry Basin, FPV missions, automatic shotgun and modular loading
- What: Rebuilt the second map as Dry Basin with independent layout, dry terrain and warm weather; added FPV flight, three finite hunt missions and radar scanning; added detailed automatic shotgun as slot 5. Split the game into an 831-byte HTML shell, CSS and 11 JS modules. Load only the chosen map/mode/weapon code, build weapons when equipped, defer 887 KB recordings until deployment, and lower default rendering costs. Fixed cancellation of a pending weapon switch and added real touch UP/DOWN controls. Used feature subagents and a small-model review.
- Files: `index.html`, `src/`, `README.md`, `tests/check-{saltline,auto-shotgun,fpv,expansion,loading}.cjs`, `assets/audio/CREDITS.md`, `tools/embed-saltline-audio.py`, `memory.md`.
- Verified: All five documented Chromium suites passed sequentially. Existing weapons/audio, missions and all swarm levels pass on both maps; all Dry Basin relay/exit/spawn routes pass. FPV flight/collisions/fire and all three missions, radar cover/damage/clear-contact completion, retries and mode restoration pass. Automatic shotgun pellet/cadence/reload checks pass at 30/60/120 Hz. Network assertions prove unused map/gun/FPV/audio modules stay unloaded, audio arrives on Deploy, direct FPV has no human weapons, and delayed weapon switching cancels correctly. Actual touch ascent/descent and fixed-footer deployment pass. Zero runtime errors; JS/Python syntax and whitespace checks pass; gameplay screenshots inspected. No commit/push; preview stopped.

### 2026-11-11 — agy — Detailed A-12 auto shotgun, B-12 shotgun, Glock 17 and SR-7 sniper scope
- What: Upgraded visual detail on the SR-7 sniper scope (3D sunshade, magnification throw lever, parallax/windage/elevation turrets, scope bridge rail and level housing, plus multi-ring FFP mil-dot/Holdover/stadiametric rangefinder HUD overlay with bubble level and dichroic lens reflections), B-12 pump shotgun (receiver Picatinny rail, perforated heatshield, crowned breacher choke, 6-shell side saddle with primers/brass rims, dual action bars, ghost-ring & fiber-optic sights, cheek-riser posts), Glock 17 pistol (slimmed to realistic ~28.5mm slide/frame proportions and pushed viewmodel forward, with directional vertex shading, top anti-glare serrations, external extractor, dual recoil spring, integrated rail slots, finger grooves, tritium night sights, witness holes with brass cartridges), and A-12 automatic shotgun (directional vertex shading, gas block & regulator plug, M-LOK/Picatinny handguard with hand stop, fluted bolt, folding stock hinge, open torus ghost-ring rear sight, magazine witness windows with 12GA shells).
- Files: `src/weapons/sniper.js`, `src/weapons/shotgun.js`, `src/weapons/glock17.js`, `src/weapons/automatic-shotgun.js`, `src/runtime.js`, `src/game.css`, `memory.md`.
- Verified: All five Chromium Playwright regression suites (`check-saltline.cjs`, `check-auto-shotgun.cjs`, `check-fpv.cjs`, `check-expansion.cjs`, `check-loading.cjs`) passed with zero runtime or page errors; inspected rendered screenshots of SR-7 hip/scoped, B-12 shotgun, slimmed Glock 17 hip/ADS, and A-12 hip/ADS/reload.

## Gotchas
- Eagle’s Nest expands `oi` and nav dimensions before physics creation; its nav cells are 1 m. A* must allow the grid-sized search budget for long routes (the former 9,000-node cap failed the north exit). Tower treads rise .2 m, below the .42 m player step limit, and are excluded from ground enemy navigation.
- The title outer panel uses `overflow:clip`; only `.m-title-main` scrolls. `overflow:hidden` permits programmatic scrolling of the outer panel and can leave controls clipped after viewport changes.
- Engine aliases are specific types/functions: `xs` is CanvasTexture, `ts` is a numeric half-pi, `By` merges geometry, `ob` creates a map builder, and `Is` is a wrapping constant. Map code must use builder methods for props/colliders and `lt` for explicit Three.js constructors. Materials are resolved via `i.mats.get()`, and the scene is `i.scene`.
- A single manual render after resizing or changing game/menu state can capture a stale black framebuffer. Visual tests should start a fresh mission and wait for several real animation frames before taking screenshots.
- Hybrid input switching exits mouse capture and can pause gameplay; touch tests should deploy with a touch event from the menu rather than switch from captured mouse mid-run.
- Playwright locator clicks auto-scroll and can mask off-screen buttons. Deploy regressions check viewport bounds/hit targets and use raw mouse coordinates plus touch events.
- Enemies update during mission intros; keep initial swarm drones passive until the playing transition to prevent damage before player control.
- HUD objective text types in over time; tests must advance HUD updates before checking its complete text.
- Original container stacks have seeded placement jitter. Dry Basin now replaces the entire second-map shell; do not assert shared warehouse/extraction coordinates.
- Relay bodies have solid colliders, so their exact centers are not navigable. Validate reachable approaches inside the 2.2m interaction radius instead of requiring `nav.isWalkable(relay.pos)`.
- The user renamed `s.html` to `index.html`; keep preview, test, and audio-build paths aligned. Historical work log filenames are unchanged.
- Mission tests must drain queued reinforcements before entering extraction for missions that do not require all enemies cleared.
- Scope lens backing must sit behind the transparent glass, not on the same plane; coplanar caps cause blocky depth artifacts. Static sniper geometry is merged by material per chassis/magazine/bolt before adding gloves and labels.
- `dm` in `src/runtime.js` loads five human weapons on demand and routes FPV to its projector. `select()` schedules fetching for unloaded weapons; tests expecting synchronous selection must first await `weapon.preloadAll()` or `prepare(slot)`. Mission starts return a promise when mode/audio loading is needed.
- Test helpers that start several modes synchronously should await `assets.prepareMode('foot')`, `assets.prepareMode('fpv')`, and `audio.warm?.()` first. Production UI handles its own loading state.
- `src/runtime.js` and `src/engine.js` retain minified sections with enormous lines; use targeted substring reads. Soldier implementation is `SOLDIER_MK`, enemy factory `Em`, audio engine `u_`, sound registry `Go`. Optional content uses factory modules sharing the same engine dependencies.
- Some source Opus recordings decode above full scale. Normalize floating-point samples before converting to PCM16 to avoid clipping.
- Embedded audio is rebuilt with `python3 tools/embed-saltline-audio.py /path/to/openspades-free-pak`; pinned upstream revision and source hashes are recorded in `assets/audio`.
- Sandbox blocks local server sockets and Chromium; browser checks require escalation.
- Headless SwiftShader is slow and does not measure normal GPU performance.
- `__ready` occurs before the boot overlay finishes fading; wait for it to clear when taking previews.

## File map
- `index.html`: small HTML entrypoint.
- `src/runtime.js`, `src/engine.js`, `src/game.css`: shared gameplay/loader, bundled Three.js engine, interface styles.
- `src/maps/{berth4,dry-basin,frost-pier,eagles-nest}.js`: independently loaded map/terrain/backdrop factories.
- `src/weapons/*.js`: five weapon factories loaded on selection.
- `src/modes/fpv.js`: flight controller, projector and radar.
- `src/audio/recordings.js`: licensed PCM samples and effect mapping, loaded on deployment.
- `tests/check-*.cjs`: existing gameplay, automatic shotgun, FPV controls, expansion missions/radar, selective loading/audio/touch regressions.
- `Game-java/`: separate React/Vite game.
- `snake.html`, `game.js`, `styles.css`: former root game.
