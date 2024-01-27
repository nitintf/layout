import { ActionType } from './actions'

export interface GeneralSettings {
  launchOnLogin: boolean
  hideMenuIcon: boolean
  checkForUpdates: boolean
  gapSize: number
  version: string
}

export interface Command {
  label: string
  shortcut: string
  action: ActionType
  icon: string
  enabled: boolean
}

export interface Commands {
  half: Command[]
  corner: Command[]
  general: Command[]
  third?: Command[]
  fourth?: Command[]
  display?: Command[]
  edge?: Command[]
}

export interface AppConfig {
  general: GeneralSettings
  commands: Commands
}
