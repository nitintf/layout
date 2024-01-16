import { BrowserWindow, Menu, Tray, app, globalShortcut } from 'electron'
import AlignmentManager from './alignment'
import icon from '../../../resources/16x16.png?asset'
import { AppConfig, Command } from '@shared/types'
import { getAppConfig } from './config'
import { config as defaultConfig } from '@shared/config'

export default class TrayBuilder {
  createWindow: () => void
  alignmentManager: AlignmentManager
  config: AppConfig = defaultConfig

  constructor(createWindow: () => void) {
    this.createWindow = createWindow
    this.alignmentManager = new AlignmentManager()

    this.initConfig()
  }

  async initConfig() {
    this.config = await getAppConfig()
  }

  createOption(command: Command): Electron.MenuItemConstructorOptions | Electron.MenuItem {
    const menuItem = {
      label: command.label,
      click: () => {
        this.alignmentManager.align(command.action)
      },
      accelerator: command.shortcut
    }

    globalShortcut.register(command.shortcut, menuItem.click)

    return menuItem
  }

  buildTray(): Tray {
    const tray = new Tray(icon)
    const menuHalfOptions = this.config.commands.half.map(this.createOption.bind(this))

    const cornerMenuOptions = this.config.commands.corner.map(this.createOption.bind(this))

    const generalMenuOptions = this.config.commands.general.map(this.createOption.bind(this))

    const contextMenu = Menu.buildFromTemplate([
      ...menuHalfOptions,
      {
        type: 'separator'
      },
      ...cornerMenuOptions,
      {
        type: 'separator'
      },
      ...generalMenuOptions,
      {
        label: 'Preferences',
        click: () => {
          this.createWindow()
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Check for updates'
      },
      {
        label: 'About'
      },
      {
        label: 'Quit',
        click: () => {
          app.quit()
        }
      }
    ])

    tray.setContextMenu(contextMenu)
    return tray
  }
}
