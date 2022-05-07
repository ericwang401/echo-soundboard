import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'
import './events'
const { autoUpdater } = require('electron-updater')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Echo Soundboard by Performave',
    ////titleBarStyle: "hidden",
    autoHideMenuBar: app.isPackaged ? true : false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`)
  } else {
    win.loadURL('http://localhost:3000/')

    try {
      require('electron-reloader')(module)
    } catch {}

    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify().then((res: any) => console.log(res))
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
})
