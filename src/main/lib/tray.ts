import { BrowserWindow, Menu, Tray, app, globalShortcut } from 'electron'
import AlignmentManager from './alignment'
import icon from '../../../resources/16x16.png?asset'
import { AppConfig, Command } from '@shared/types'

export default class TrayBuilder {
  createWindow: () => void
  private readonly alignmentManager: AlignmentManager
  private config: AppConfig
  private tray: Tray | null = null

  constructor(createWindow: () => void, config: AppConfig, alignmentManager: AlignmentManager) {
    this.createWindow = createWindow
    this.config = config
    this.alignmentManager = alignmentManager
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

    return menuItem
  }

  reloadTray(newConfig: AppConfig): void {
    this.config = newConfig
    if (this.config.general.hideMenuIcon) {
      this.tray?.destroy()
      this.tray = null
    } else {
      if (!this.tray) {
        this.buildTray()
      }
    }
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

  buildTray() {
    this.tray = new Tray(icon)
    this.setTrayMenu()
  }
}
