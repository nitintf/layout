import { ActionType } from './actions'
import { AppConfig } from './types'

export const config: AppConfig = {
  windowsCommands: {
    half: [
      {
        label: 'Left Half',
        shortcut: 'Control+Option+Left',
        icon: 'third-left.png',
        action: ActionType.LeftHalf,
        enabled: true
      },
      {
        label: 'Right Half',
        shortcut: 'Control+Option+Right',
        icon: 'third-right.png',
        action: ActionType.RightHalf,
        enabled: true
      },
      {
        label: 'Top Half',
        shortcut: 'Control+Option+Up',
        icon: 'top-half.png',
        action: ActionType.TopHalf,
        enabled: true
      },
      {
        label: 'Bottom Half',
        shortcut: 'Control+Option+Down',
        icon: 'bottom-half.png',
        action: ActionType.BottomHalf,
        enabled: true
      },
      {
        label: 'Center Half',
        shortcut: 'Control+Option+C',
        icon: 'third-center.png',
        action: ActionType.CenterHalf,
        enabled: true
      }
    ],
    corner: [
      {
        label: 'Top Left',
        shortcut: 'Control+Option+1',
        icon: 'top-left.png',
        action: ActionType.TopLeft,
        enabled: true
      },
      {
        label: 'Top Right',
        shortcut: 'Control+Option+2',
        icon: 'top-right.png',
        action: ActionType.TopRight,
        enabled: true
      },
      {
        label: 'Bottom Left',
        shortcut: 'Control+Option+3',
        icon: 'bottom-left.png',
        action: ActionType.BottomLeft,
        enabled: true
      },
      {
        label: 'Bottom Right',
        shortcut: 'Control+Option+4',
        icon: 'bottom-right.png',
        action: ActionType.BottomRight,
        enabled: true
      }
    ],
    general: [
      {
        label: 'Maximize',
        shortcut: 'Control+Option+M',
        icon: 'maximize.png',
        action: ActionType.Maximize,
        enabled: true
      }
    ]
  },
  general: {
    checkForUpdates: false,
    gapSize: 0,
    hideMenuIcon: false,
    launchOnLogin: false,
    version: '0.0.1'
  }
}
