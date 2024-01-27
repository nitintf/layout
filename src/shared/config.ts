import { ActionType } from './actions'
import { AppConfig } from './types'

export const config: AppConfig = {
  commands: {
    half: [
      {
        label: 'Left Half',
        shortcut: 'Control+Option+Left',
        icon: 'icons/left-half.png',
        action: ActionType.LeftHalf,
        enabled: true
      },
      {
        label: 'Right Half',
        shortcut: 'Control+Option+Right',
        icon: 'icons/right-half.png',
        action: ActionType.RightHalf,
        enabled: true
      },
      {
        label: 'Top Half',
        shortcut: 'Control+Option+Up',
        icon: 'icons/top-half.png',
        action: ActionType.TopHalf,
        enabled: true
      },
      {
        label: 'Bottom Half',
        shortcut: 'Control+Option+Down',
        icon: 'icons/bottom-half.png',
        action: ActionType.BottomHalf,
        enabled: true
      },
      {
        label: 'Center Half',
        shortcut: 'Control+Option+C',
        icon: 'icons/center-half.png',
        action: ActionType.CenterHalf,
        enabled: true
      }
    ],
    corner: [
      {
        label: 'Top Left',
        shortcut: 'Control+Option+1',
        icon: 'icons/top-left.png',
        action: ActionType.TopLeft,
        enabled: true
      },
      {
        label: 'Top Right',
        shortcut: 'Control+Option+2',
        icon: 'icons/top-right.png',
        action: ActionType.TopRight,
        enabled: true
      },
      {
        label: 'Bottom Left',
        shortcut: 'Control+Option+3',
        icon: 'icons/bottom-left.png',
        action: ActionType.BottomLeft,
        enabled: true
      },
      {
        label: 'Bottom Right',
        shortcut: 'Control+Option+4',
        icon: 'icons/bottom-right.png',
        action: ActionType.BottomRight,
        enabled: true
      }
    ],
    general: [
      {
        label: 'Maximize',
        shortcut: 'Control+Option+M',
        icon: 'icons/maximize.png',
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
