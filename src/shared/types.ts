import { ActionType } from './actions'

export interface GeneralSettings {
  name: string
  version: string
  description: string
}

export interface Command {
  label: string
  shortcut: string
  action: ActionType
  icon: string
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
