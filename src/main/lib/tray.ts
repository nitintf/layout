import { BrowserWindow, Menu, Tray, app, globalShortcut } from 'electron'
import AlignmentManager from './alignment'
import icon from '../../../resources/16x16.png?asset'
import { AppConfig, Command } from '@shared/types'

export default class TrayBuilder {
  createWindow: () => void
  alignmentManager: AlignmentManager
  config: AppConfig
  tray: Tray | null = null

  constructor(createWindow: () => void, config: AppConfig) {
    this.createWindow = createWindow
    this.alignmentManager = new AlignmentManager()
    this.config = config
  }

  createOption(command: Command): Electron.MenuItemConstructorOptions | Electron.MenuItem {
    const menuItem: Electron.MenuItemConstructorOptions | Electron.MenuItem = {
      label: command.label,
      click: () => {
        this.alignmentManager.align(command.action)
      },
      accelerator: command.shortcut,
      enabled: command.enabled
    }

    if (command.enabled) {
      globalShortcut.register(command.shortcut, () => this.alignmentManager.align(command.action))
    }

    return menuItem
  }

  removeAllShortcuts(): void {
    this.config.commands.half.forEach((command) => {
      globalShortcut.unregister(command.shortcut)
    })

    this.config.commands.corner.forEach((command) => {
      globalShortcut.unregister(command.shortcut)
    })

    this.config.commands.general.forEach((command) => {
      globalShortcut.unregister(command.shortcut)
    })
  }

  reloadTray(newConfig: AppConfig): void {
    this.removeAllShortcuts()
    this.config = newConfig
    this.setTrayMenu()
  }

  setTrayMenu(): void {
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
        type: 'separator'
      },
      {
        label: 'Preferences',
        click: () => {
          const window = BrowserWindow.getAllWindows()[0]
          if (window) {
            window.center()
            window.focus()
            return
          }
          this.createWindow()
        }
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

    this.tray?.setContextMenu(contextMenu)
  }

  buildTray(): Tray {
    const tray = new Tray(icon)
    this.tray = tray
    this.setTrayMenu()
    return tray
  }
}
