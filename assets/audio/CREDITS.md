# Saltline recorded sound effects

The embedded combat samples in `src/audio/recordings.js` use **CC0 1.0** recordings plus the **CC-BY 3.0** shotgun shot from
[OpenSpades Free Assets](https://github.com/DeathByDenim/openspades-free-pak),
revision `1e6b28721a2e5e51f84a572d101079bf186c66d5`.
The pack's [per-file credits](https://github.com/DeathByDenim/openspades-free-pak/blob/1e6b28721a2e5e51f84a572d101079bf186c66d5/License/Credits-pak001-Free.md)
identify the following sources and creators:

| Embedded clips | Original source | Creator |
| --- | --- | --- |
| shotgun | [Shotgun shoot & reload](https://opengameart.org/content/shotgun-shoot-reload), “10 Guage Shotgun”, via FireLocal.opus | Mike Koenig (Soundbible), **CC-BY 3.0** |
| sniper | [The Free Firearm Sound Library](https://opengameart.org/content/the-free-firearm-sound-library), B_16P | Ben Jaszczak et al. |
| shot1–4, enemy1–4 | [The Free Firearm Sound Library](https://opengameart.org/content/the-free-firearm-sound-library), AK-47/C_28P | Ben Jaszczak et al. |
| magout, magin, bolt | [Handgun reload sound effect](https://opengameart.org/content/handgun-reload-sound-effect) | zer0_sol |
| dry, shell1, shell2 | [100 CC0 metal and wood SFX](https://opengameart.org/content/100-cc0-metal-and-wood-sfx) | rubberduck |
| clank | [33 metal clang sounds: cast iron pans](https://opengameart.org/content/33-metal-clang-sounds-cast-iron-pans) | bart |
| mechanism | [Equipment Clicks III](https://opengameart.org/content/equipment-clicks-iii) | LFA |
| gear | [Gun reload sounds](https://opengameart.org/content/gun-reload-sounds) | SpringySpringo |

Shotgun attribution: “10 Guage Shotgun” by Mike Koenig (Soundbible), sourced from the linked OpenGameArt pack via OpenSpades Free Assets. Licensed under [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/). Modified by downmixing, trimming, normalizing, and adding edge fades for this game.

Other listed samples: [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).
No attribution is required by CC0; provenance is retained here for maintenance.
Only the listed files were used; other upstream assets are not included.

Changes: selected and trimmed individual shots and reload phases; downmixed to
mono at 32 kHz; normalized floating-point samples before PCM16 conversion;
added short edge fades. Mechanical recordings are reused for robot footsteps,
activation, armor impacts, and collapse. Four takes alternate for player and
enemy gunfire. The original synthetic shot tails and master waveshaper are
bypassed to retain the recorded attack and decay.

`manifest.json` records source paths, SHA-256 hashes, and edit boundaries.
The audio is embedded as base64 PCM in `src/audio/recordings.js`, so playing the game needs no
third-party audio requests. Serve the complete game over HTTP to load its modules.
Rebuild with `python3 tools/embed-saltline-audio.py /path/to/openspades-free-pak`.

The Glock 17 game sidearm reuses the embedded CC0 `shot2` recording with a lower gain and slightly raised playback pitch. It is a game sound treatment, not a recording of a Glock 17.
