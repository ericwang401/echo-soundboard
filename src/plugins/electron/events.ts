import { ipcMain, dialog, app, shell, globalShortcut } from 'electron'
import * as path from 'path'
import * as mime from 'mime'
import * as fs from 'fs'

export interface soundTrackSettings {
  path: string
  keybinds: string[]
}

export interface File {
  name: string
  path: string
}

const fspromise = fs.promises

const listFiles = async (dir: string) => {
  let fileList: File[] = []

  await fspromise.readdir(dir).then((files) => {
    for (const file of files) {
      let filePath = path.join(dir, file)
      if (
        mime.getType(filePath) === 'audio/mpeg' ||
        mime.getType(filePath) === 'audio/wav' ||
        mime.getType(filePath) === 'audio/ogg'
      ) {
        fileList.push({ name: file, path: path.join(dir, file) })
      }
    }
  })

  return fileList
}

ipcMain.on('get-data-path', (event) => {
  event.returnValue = app.getPath('userData')
})

ipcMain.on('check-dir-exists', (event, directory) => {
  event.returnValue = fs.statSync(directory).isDirectory()
})

ipcMain.on('open-external-link', (event, link) => {
  shell.openExternal(link)
  event.returnValue = true
})

ipcMain.on('list-files', (event, directory) => {
  listFiles(directory)
    .then((files) => {
      event.returnValue = {
        dir: directory,
        files,
      }
    })
    .catch(() => {
      event.returnValue = []
    })
})

ipcMain.on('get-new-folder', (event) => {
  dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((folder) => {
      event.returnValue = folder
    })
    .catch((err) => {
      console.log(err)
    })
})

let registeredSoundBindings: soundTrackSettings[] = []

ipcMain.on('set-sound-keybind', (event, soundTrackSettings: soundTrackSettings) => {
  // detect if keybind is already registered
  const index = registeredSoundBindings.findIndex(
    (soundTrack) => soundTrack.path === soundTrackSettings.path
  )

  if (index !== -1) {
    globalShortcut.unregister(registeredSoundBindings[index].keybinds.join('+'))

    registeredSoundBindings = registeredSoundBindings.filter(
      (soundTrack, soundIndex) => soundIndex !== index
    )
  }

  if (soundTrackSettings.keybinds.length > 0) {
    registeredSoundBindings.push(soundTrackSettings)
    globalShortcut.register(soundTrackSettings.keybinds.join('+'), () => {
      event.reply('play-soundtrack', soundTrackSettings.path)
    })
  }

  event.returnValue = true
})

interface Keybind {
  name: string,
  keybinds: string[]
}

let registeredNormalBindings: Keybind[] = []

ipcMain.on('set-keybind', (event, keybind: Keybind) => {
  // detect if keybind is already registered in registeredNormalBindings
  const index = registeredNormalBindings.findIndex((registeredKeybind) => {
    return registeredKeybind.name === keybind.name
  })

  console.log('received keybind', {keybind})

  if (index !== -1) {
    globalShortcut.unregister(registeredNormalBindings[index].keybinds.join('+'))

    registeredNormalBindings = registeredNormalBindings.filter(
      (_, keyIndex) => keyIndex !== index
    )
  }

  if (keybind.keybinds.length > 0) {
    registeredNormalBindings.push(keybind)
    globalShortcut.register(keybind.keybinds.join('+'), () => {
      event.reply('trigger-keybind', keybind.name)
    })
  }

  event.returnValue = true
})

ipcMain.on('get-version', (event) => {
  event.returnValue = app.getVersion()
})