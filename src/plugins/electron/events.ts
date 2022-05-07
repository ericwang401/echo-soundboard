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

let registeredBindings: soundTrackSettings[] = []

ipcMain.on('set-keybind', (event, soundTrackSettings: soundTrackSettings) => {
  // detect if keybind is already registered
  const index = registeredBindings.findIndex(
    (soundTrack) => soundTrack.path === soundTrackSettings.path
  )

  if (index !== -1) {
    globalShortcut.unregister(registeredBindings[index].keybinds.join('+'))

    registeredBindings = registeredBindings.filter(
      (soundTrack, soundIndex) => soundIndex !== index
    )
  }

  if (soundTrackSettings.keybinds.length > 0) {
    registeredBindings.push(soundTrackSettings)
    globalShortcut.register(soundTrackSettings.keybinds.join('+'), () => {
      event.reply('play-soundtrack', soundTrackSettings.path)
    })
  }

  event.returnValue = true
})

ipcMain.on('get-version', (event) => {
  event.returnValue = app.getVersion()
})