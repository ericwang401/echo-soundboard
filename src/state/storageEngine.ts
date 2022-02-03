import storage from 'electron-json-storage'
import { ipcRenderer } from 'electron'

let dataPath = ipcRenderer.sendSync('get-data-path')
let userSpecifiedDirectory = localStorage.getItem('app-config-dir')

if (userSpecifiedDirectory && ipcRenderer.sendSync('check-dir-exists', userSpecifiedDirectory)) {
  storage.setDataPath(userSpecifiedDirectory)
} else {
  storage.setDataPath(dataPath)
}

const storageEngine = {
  getItem(key: any): any {
    return storage.getSync(key)
  },

  setItem(key: any, data: any): void {
    storage.set(key, data, function (error) {
      if (error) throw error
    })
  },

  removeItem(key: any): void {
    storage.remove(key, function (error) {
      if (error) throw error
    })
  },
}

export default storageEngine
