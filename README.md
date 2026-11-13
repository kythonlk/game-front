# Saltline

Browser FPS with four maps, five weapons, three relay missions, three Drone Swarm levels, and three FPV drone missions.

Run from the repository root:

```sh
python3 -m http.server 8087 --bind 127.0.0.1
```

Open `http://127.0.0.1:8087/`. Serve the complete repository over HTTP; opening `index.html` directly as a local file does not support its module imports. No build step is required.

## Loading and performance

- `index.html` is the small page shell; `src/game.css` contains the interface styles.
- `src/engine.js` holds the shared Three.js engine, separately cacheable from gameplay changes.
- `src/runtime.js` contains shared game systems and the asset loader.
- `src/maps/` loads only the selected map: Berth 4, Dry Basin (`map=crossdock`), Frost Pier (`map=frostpier`), or Eagle’s Nest (`map=eaglesnest`).
- Frost Pier has a frozen canal, two bridges, radomes and a separate tank peninsula.
- Eagle’s Nest is a 200 m military valley. Foot deployments equip the SR-7 sniper. Walk up the three switchback stair flights in the southwest to reach the 12 m observation deck and Relay A; use the north gate for extraction. All existing operations and FPV missions remain selectable.
- `src/weapons/` loads weapon code when selected and constructs only the models used during the session.
- `src/modes/fpv.js` loads when an FPV mission is deployed.
- `src/audio/recordings.js` loads on the first deployment when audio is enabled. Licensed recordings ship locally; see `assets/audio/CREDITS.md`.

Automatic graphics use Medium on desktop and Low on integrated/software/mobile GPUs. Low disables bloom, ambient occlusion, reflections and volumetric effects; Medium disables reflections and multisampling. High and Ultra remain available in Settings.

## Controls

On foot: WASD move, mouse aim, left click fire, right click aim down sights, R reload, Z/C crouch, Space jump, Shift sprint, E interact, keys 1–5 select weapons, X cycles weapons.

FPV: WASD fly, mouse steer, Space ascend, Z/C descend, Shift boost, left click fire the rechargeable pulse projector, R recharge. Touch controls include UP and DOWN. Radar Run requires destroying every target and clearing radar contact.

## Verification

With the server running and Playwright installed, run these sequentially:

```sh
node tests/check-saltline.cjs
node tests/check-auto-shotgun.cjs
node tests/check-fpv.cjs
node tests/check-expansion.cjs
node tests/check-loading.cjs
node tests/check-maps.cjs
```

Set `PLAYWRIGHT_MODULE` to an installed Playwright package path if it is not available locally. Headless software rendering is slow and is not representative of hardware GPU frame rates.
