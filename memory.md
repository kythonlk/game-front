# Project Memory — game-front

> Shared work log + context for all AI agents (opencode · codex · agy).
> **New chat? Read this whole file first. Update it after every task.**

## Project snapshot
- Browser game collection at `/var/home/kythonlk/ai/game-front`.
- `s.html` is a standalone Saltline FPS containing bundled Three.js, game code, and procedural audio. `Game-java` is a separate React/Vite project.

## Commands that matter
- Preview: `python3 -m http.server 8087 --bind 127.0.0.1`.
- Regression (server required): `PLAYWRIGHT_MODULE=/var/home/kythonlk/ext/erp/FocusX/focusx-perf/node_modules/playwright node tests/check-saltline.cjs` (or omit env if playwright is installed locally).
- Test parses inline JS, boots robot showcase and gameplay in Chromium, exercises soldier movement/shooting/damage/death/pool retirement, and checks audio playback and runtime errors.
- Robot preview: `/s.html?show=enemies&eshow=soldier&efreeze=1`.

## Current state (update me)
- Robot and recorded-audio baseline is committed/pushed as `0d47254`. Sniper additions are included in the subsequent task commit on `main`; user requested push. See `git log` for the commit ID.
- Humanoid robot has layered bevelled armor, articulated knees/ankles/arms, a visor and rifle; rigid parts batched per material/joint.
- 18 CC0 recordings embedded directly in `s.html`, serving 17 combat effect names. Four gunshot takes, recorded reload phases, shell drops and mechanical robot cues. Synthetic gunshot generator removed, generated shot tails and master distortion bypassed.
- Added SR-7 sniper: keys 1/2 or X to swap; touch SWAP; five rounds + 30 reserve, 110 damage, 550 range, 1.25s bolt cycle, 2.8s reload, 4× scope (22° FOV), recorded shot.
- Browser regression passed for combat, 15 recorded sounds, sniper firing/cooldown/reload/switching/scope. Visual hip and scope previews inspected. Preview server stopped after verification.

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

## Gotchas
- `dm` now wraps `PAC9_MK` and `SALT_SNIPER`; player FOV/look scaling reads active weapon settings. New sounds must be registered before the embedded sample mapping runs.
- Most of `s.html` is a minified bundle with enormous lines; use targeted substring reads instead of unrestricted grep output. Soldier implementation is `SOLDIER_MK`, enemy factory `Em`, audio engine `u_`, sound registry `Go`.
- Some source Opus recordings decode above full scale. Normalize floating-point samples before converting to PCM16 to avoid clipping.
- Embedded audio is rebuilt with `python3 tools/embed-saltline-audio.py /path/to/openspades-free-pak`; pinned upstream revision and source hashes are recorded in `assets/audio`.
- Sandbox blocks local server sockets and Chromium; browser checks require escalation.
- Headless SwiftShader is slow and does not measure normal GPU performance.
- `__ready` occurs before the boot overlay finishes fading; wait for it to clear when taking previews.

## File map
- `s.html`: self-contained FPS; edit directly (no separate source/build chain found).
- `tests/check-saltline.cjs`: browser regression checks.
- `Game-java/`: separate React/Vite game.
- `index.html`, `game.js`, `styles.css`: separate root game.
