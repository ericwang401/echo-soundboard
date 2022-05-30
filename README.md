<h1 align="center">Echo Soundboard by Performave</h1>
<p align="center"><img src="https://i.imgur.com/p2i6jSG.png" width="500" /></p>
<p align="center"><img src="https://i.imgur.com/llVcpLc.png" width="500" /></p>

A free, open-source soundboard made using ElectronJS + React.

Created by Eric Wang at <a href="https://performave.com" target="_blank">Performave</a>

If you use this software and enjoy it, please donate to me! https://www.patreon.com/performave
## Features

 * `Microphone injector`
 * `App config customization`
 * `Volume slider for sound tracks`
 * `Hotkeys`
 * `Search field for sound tracks`
 * `Microphone amplifier (uses decibels)`

## To be done

 * Themes (backgrounds)
 * View soundtracks by type (all soundtracks, soundtracks that are binded to keys)
 * Switch to Tauri from Electron for better performance????

## How to work on it in development

1. Clone/download the project
2. Run `npm i`
3. Run `npm run electron:dev`

Now everytime you edit, changes will show up. If you install a new package via npm, it is recommended to restart the `npm run electron:dev` command

## How to build

1. Clone/download the project
2. Run `npm i`
3. Run `npm run electron:build`

Output file is in `dist/`
