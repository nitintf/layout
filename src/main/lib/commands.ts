import { ActionType } from '@shared/actions'
import Alignment from './alignment'
import { AppConfig, Command } from '@shared/types'
import { globalShortcut } from 'electron'

export default class CommandsManager {
  private readonly alignment: Alignment
  private config: AppConfig
  private readonly ignoreList: string[] = []

  constructor(config: AppConfig, alignment: Alignment) {
    this.config = config
    this.alignment = alignment
  }

  execute(action: ActionType): void {
    this.alignment.align(action)
  }

  registerGlobalShortcuts(): void {
    Object.keys(this.config.commands).forEach((commandGroup) => {
      if (!this.ignoreList.includes(commandGroup)) {
        this.config.commands[commandGroup].forEach((command: Command) => {
          if (!command.shortcut || !command.enabled) return
          globalShortcut.register(command.shortcut, () => {
            this.execute(command.action)
          })
        })
      }
    })
  }

  unregisterGlobalShortcuts(): void {
    globalShortcut.unregisterAll()
  }

  reloadCommands(config: AppConfig): void {
    this.config = config
    this.unregisterGlobalShortcuts()
    this.registerGlobalShortcuts()
  }
}
