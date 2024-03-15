import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import TrayBuilder from './lib/tray'
import { getAppConfig, resetAppConfig, updateAppConfig } from './lib'
import { AppConfig } from '@shared/types'
import Alignment from './lib/alignment'
import CommandsManager from './lib/commands'

class App {
  private alignment: Alignment | null = null
  private commandsManager: CommandsManager | null = null
  private tray: TrayBuilder | null = null

  private mainWindow: BrowserWindow | null = null
  private config: AppConfig | null = null

  createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      center: true,
      title: 'Layout',
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

    this.mainWindow.on('ready-to-show', () => {
      if (!this.mainWindow) {
        throw new Error('"mainWindow" is not defined')
      }
      this.mainWindow.show()
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  async init() {
    this.config = await getAppConfig()
    this.alignment = new Alignment(this.config)

    this.tray = new TrayBuilder(this.createWindow, this.config, this.alignment)
    if (!this.config.general.hideMenuIcon) {
      this.tray.buildTray()
    }

    this.commandsManager = new CommandsManager(this.config, this.alignment)
    this.commandsManager.registerGlobalShortcuts()
  }

  registerIpcHandlers() {
    ipcMain.handle('get-app-config', async () => getAppConfig())
    ipcMain.handle('update-app-config', async (_, config: AppConfig) => {
      updateAppConfig(config)

      // reolad things that need to be reloaded after config change
      this.config = config
      this.tray?.reloadTray(config)
      this.commandsManager?.reloadCommands(config)
      this.alignment?.reloadConfig(config)

      // Set the app to launch at login if specified in the config
      if (config.general.launchOnLogin) {
        app.setLoginItemSettings({
          openAtLogin: true
        })
      } else {
        app.setLoginItemSettings({
          openAtLogin: false
        })
      }
    })
    ipcMain.handle('reset-app-config', async () => resetAppConfig())
  }

  async start() {
    app.whenReady().then(() => {
      // if (app.dock) {
      //   // Check if dock is available (only on macOS)
      //   app.dock.hide()
      // }

      // Set app user model id for windows
      electronApp.setAppUserModelId('com.electron')

      // Default open or close DevTools by F12 in development
      // and ignore CommandOrControl + R in production.
      // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })

      // register ipc handlers
      this.registerIpcHandlers()

      // initialize the app
      this.init()

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) this.createWindow()
      })

      // Quit when all windows are closed, except on macOS. There, it's common
      // for applications and their menu bar to stay active until the user quits
      // explicitly with Cmd + Q.
      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })
    })
  }
}

const appInstance = new App()
appInstance.start()
