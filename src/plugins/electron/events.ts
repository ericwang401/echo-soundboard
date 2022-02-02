import { ipcMain, dialog } from 'electron'
import * as path from 'path'
import * as mime from 'mime'
import * as fs from 'fs'

interface File {
  name: string;
  path: string;
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
        fileList.push({name: file, path: path.join(dir, file)})
      }
    }
  })

  return fileList
}

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('list-files', (event, directory) => {
  listFiles(directory).then((files) => {
    event.returnValue = {
      dir: directory,
      files
    }
  })
})

ipcMain.on('get-new-folder', (event, directory) => {
  dialog.showOpenDialog({properties: ['openDirectory']})
    .then((folder) => {
      event.returnValue = folder
    }).catch(err => {
      console.log(err)
    })
})