# Project Memory — game-front

> Shared work log + context for all AI agents (opencode · codex · agy).
> **New chat? Read this whole file first. Update it after every task.**

## Project snapshot
- Browser game collection at `/var/home/kythonlk/ai/game-front`.
- `index.html` is a standalone Saltline FPS containing bundled Three.js, game code, and embedded recorded audio; `snake.html` is the former root game. `Game-java` is a separate React/Vite project.

## Commands that matter
- Preview: `python3 -m http.server 8087 --bind 127.0.0.1`.
- Regression (server required): `PLAYWRIGHT_MODULE=/var/home/kythonlk/ext/erp/FocusX/focusx-perf/node_modules/playwright node tests/check-saltline.cjs` (or omit env if playwright is installed locally).
- Test parses inline JS, boots robot showcase and gameplay in Chromium, exercises soldier movement/shooting/damage/death/pool retirement, and checks audio playback and runtime errors.
- Robot preview: `/index.html?show=enemies&eshow=soldier&efreeze=1`.

## Current state (update me)
- User committed the mission/weapon work in `78c7185` and renamed `s.html` to `index.html` in `f4ed309`. Final HUD/reload refinements, renamed tooling paths, alternate map, Drone Swarm mission and regression coverage, and memory update are pending locally; no commit or push performed for this task.
- Four selectable missions: First Contact (4 enemies, maximum 2 active), Warehouse Sweep (8, maximum 3), Terminal Blackout (12, maximum 4), Drone Swarm (20 flying drones, maximum 5). Both Berth 4 and Crossdock support these missions, with distinct relay objectives; Warehouse Sweep also requires clearing all enemies.
- Drone Swarm is a kill-only mission: no relay/extraction requirement, drone markers and remaining counter, victory after the last of 20 drones, and 20 health/ammo resupply every five kills. Drones stay passive through the intro and activate when control begins.
- Maps: original Berth 4 plus selectable Crossdock (`?map=crossdock`), reusing the same prop generators and warehouse/quay shell with new cargo rows, central court, relay, cover, spawns, camera path and south catwalk. Map changes reload the level and preserve the selected mission.
- Mission menu: Deploy/Settings/Controls stay in a fixed footer while the header, maps and mission cards scroll separately; selecting a mission keeps its card visible.
- Easier balance: reduced incoming damage, staggered reinforcements, relay health/ammo rewards, enemy progress counter, retry and next-mission navigation.
- Three weapons: PAC-9 rifle, detailed SR-7 sniper (5 rounds, 4× scope), and pump shotgun (6 shells, eight pellets, wider .085 hip/.050 aimed spread, range falloff, interruptible shell reload). Keys 1/2/3 equip; X or touch SWAP cycles. Z/C crouches; Ctrl no longer crouches.
- Sniper reloads automatically after its last bolt cycle, including after switching away and back; empty reserve remains stable.
- 19 embedded recordings serve 18 effect names. Shotgun recording is CC-BY 3.0 with attribution in the game and audio credits; other recordings are CC0.
- Full Chromium regression passed for robot combat/audio, sniper, shotgun, all four missions and enemy caps, crouch keys, and mission selection on both maps. Swarm checks cover intro safety, aerial weapon hits, drone-only spawning, supplies, pause/retry/death, final-kill completion and restoring relay HUD. Crossdock route/collision checks and map switching passed. Desktop/mobile mission menus and shotgun preview inspected. Deploy visibility/raw-click checks at seven screen sizes and touch deployment passed. Preview server stopped after verification.

## Work log
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

## Gotchas
- Playwright locator clicks auto-scroll and can mask off-screen buttons. Deploy regressions check viewport bounds/hit targets and use raw mouse coordinates plus touch events.
- Enemies update during mission intros; keep initial swarm drones passive until the playing transition to prevent damage before player control.
- HUD objective text types in over time; tests must advance HUD updates before checking its complete text.
- Shared shell container stacks have seeded placement jitter; cross-map landmark comparisons allow 0.15m/radian tolerance.
- Relay bodies have solid colliders, so their exact centers are not navigable. Validate reachable approaches inside the 2.2m interaction radius instead of requiring `nav.isWalkable(relay.pos)`.
- The user renamed `s.html` to `index.html`; keep preview, test, and audio-build paths aligned. Historical work log filenames are unchanged.
- Mission tests must drain queued reinforcements before entering extraction for missions that do not require all enemies cleared.
- Scope lens backing must sit behind the transparent glass, not on the same plane; coplanar caps cause blocky depth artifacts. Static sniper geometry is merged by material per chassis/magazine/bolt before adding gloves and labels.
- `dm` wraps `PAC9_MK`, `SALT_SNIPER`, and `SALT_SHOTGUN`; player FOV/look scaling reads active weapon settings. New sounds must be registered before the embedded sample mapping runs.
- Most of `index.html` is a minified bundle with enormous lines; use targeted substring reads instead of unrestricted grep output. Soldier implementation is `SOLDIER_MK`, enemy factory `Em`, audio engine `u_`, sound registry `Go`.
- Some source Opus recordings decode above full scale. Normalize floating-point samples before converting to PCM16 to avoid clipping.
- Embedded audio is rebuilt with `python3 tools/embed-saltline-audio.py /path/to/openspades-free-pak`; pinned upstream revision and source hashes are recorded in `assets/audio`.
- Sandbox blocks local server sockets and Chromium; browser checks require escalation.
- Headless SwiftShader is slow and does not measure normal GPU performance.
- `__ready` occurs before the boot overlay finishes fading; wait for it to clear when taking previews.

## File map
- `index.html`: self-contained FPS; edit directly (no separate source/build chain found).
- `tests/check-saltline.cjs`: browser regression checks.
- `Game-java/`: separate React/Vite game.
- `snake.html`, `game.js`, `styles.css`: former root game.
