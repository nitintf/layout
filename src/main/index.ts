import { app, shell, BrowserWindow, ipcMain, webContents } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import TrayBuilder from './lib/tray'
import { getAppConfig, resetAppConfig, updateAppConfig } from './lib'
import { AppConfig } from '@shared/types'

let mainWindow: BrowserWindow | null = null
let tray: TrayBuilder | null = null

async function createTray(createWindow: () => void) {
  const config = await getAppConfig()
  if (!tray) {
    tray = new TrayBuilder(createWindow, config)
    tray.buildTray()
  }
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'Flow',
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    },
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    modal: true,
    minimizable: false
  })

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  if (app.dock) {
    // Check if dock is available (only on macOS)
    app.dock.hide()
  }

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // add context actions
  ipcMain.handle('get-app-config', async () => getAppConfig())
  ipcMain.handle('update-app-config', async (_, config: AppConfig) => {
    // TODO: reload tray config after update
    updateAppConfig(config)
    if (tray) {
      tray.reloadTray(config)
    }
  })
  ipcMain.handle('reset-app-config', async () => resetAppConfig())

  createTray(createWindow)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
