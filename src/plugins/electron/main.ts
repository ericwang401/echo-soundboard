import { app, ipcMain, BrowserWindow } from 'electron'
import * as path from 'path'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'
import './events'
const { autoUpdater } = require('electron-updater')
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

function createWindow() {
  const splashScreen = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: false,
    resizable: false,
    show: app.isPackaged ? true : false,
    frame: false,
    alwaysOnTop: false,
    icon: './public/logo.ico',
  })

  if (app.isPackaged) {
    splashScreen.loadURL(`file://${__dirname}/../splash-screen.html`)
  } else {
    splashScreen.loadURL('http://localhost:3000/splash-screen.html')
  }
  splashScreen.center()

  setTimeout(() => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'Echo Soundboard by Performave',
      icon: './public/logo.ico',
      show: app.isPackaged ? false : true,
      autoHideMenuBar: app.isPackaged ? true : false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    })

    ipcMain.on('set-loading-done', (event) => {
      splashScreen.close()
      win.show()

      event.returnValue = true
    })

    if (app.isPackaged) {
      win.loadURL(`file://${__dirname}/../index.html`)
    } else {
      win.loadURL('http://localhost:3000/')

      try {
        require('electron-reloader')(module)
      } catch {}

      win.webContents.openDevTools()
    }
  }, app.isPackaged ? 2000 : 0)
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
