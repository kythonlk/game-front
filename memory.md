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
- Robot and recorded-audio changes are included in the task commit on `main`; user explicitly requested commit/push. See `git log` and `git status` for synchronization status.
- Humanoid robot has layered bevelled armor, articulated knees/ankles/arms, a visor and rifle; rigid parts batched per material/joint.
- 17 CC0 recordings embedded directly in `s.html`, serving 16 combat effect names. Four gunshot takes, recorded reload phases, shell drops and mechanical robot cues. Synthetic gunshot generator removed, generated shot tails and master distortion bypassed.
- Chromium regression passed with no runtime errors; 14 recorded-effect playback calls passed. PCM peak/endpoints and four distinct gunshot takes verified. Audio quality has not been auditioned through speakers. Preview server stopped after verification.

## Work log
### 2026-11-10 — codex — Humanoid robots and combat audio
- What: Rebuilt soldier geometry and walk articulation, synchronized mechanical footsteps, added aim cue and soldier showcase, rebuilt rifle synthesis and soldier effects, adjusted mix.
- Files: `s.html`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: JS syntax passed; browser regression passed: steps, shots, hits, death, retirement, 103 audio buffers loaded, five effects playable, zero runtime errors.

### 2026-11-10 — codex — Replace synthetic combat audio with recordings
- What: User rejected synthetic sounds and requested internet samples plus git push. Embedded CC0 firearm and mechanical recordings from OpenSpades Free Assets, retained provenance, removed synthetic shot layers and distortion.
- Files: `s.html`, `assets/audio/{CREDITS.md,manifest.json}`, `tools/embed-saltline-audio.py`, `tests/check-saltline.cjs`, `memory.md`.
- Verified: Browser regression passed, 14 recorded effects playable, 96 buffers loaded, zero runtime errors; 17 PCM clips passed peak/fade checks. `git fetch origin` showed main had no divergence before commit.

## Gotchas
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
