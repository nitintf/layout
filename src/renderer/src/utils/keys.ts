const keyIcons = {
  // Modifier keys
  Control: { mac: '⌃', win: 'Ctrl' },
  Option: { mac: '⌥', win: 'Alt' },
  Command: { mac: '⌘', win: 'Win' },
  Cmd: { mac: '⌘', win: 'Win' },
  Meta: { mac: '⌘', win: 'Win' },
  Shift: { mac: '⇧', win: 'Shift' },
  Alt: { mac: '⌥', win: 'Alt' },
  Win: { mac: 'Cmd', win: 'Win' },
  // Arrow keys
  Right: '→',
  Left: '←',
  Up: '↑',
  Down: '↓',
  // Function keys
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
  F5: 'F5',
  F6: 'F6',
  F7: 'F7',
  F8: 'F8',
  F9: 'F9',
  F10: 'F10',
  F11: 'F11',
  F12: 'F12',
  // Other keys
  Enter: '↵',
  Backspace: '⌫',
  Delete: '⌦',
  Tab: '⇥',
  Escape: 'Esc',
  CapsLock: '⇪',
  Period: '.'
}

export const KEYS_PRIORITY = ['Control', 'Option', 'Shift', 'Command']

export function shortcutToIcons(shortcut: string, os = 'mac') {
  const keys = shortcut.split('+')

  const priorityKeys = keys.filter((key) => KEYS_PRIORITY.includes(key))
  const nonPriorityKeys = keys.filter((key) => !KEYS_PRIORITY.includes(key))
  priorityKeys.sort((a, b) => KEYS_PRIORITY.indexOf(a) - KEYS_PRIORITY.indexOf(b))

  const keysIcons = [...priorityKeys, ...nonPriorityKeys].map((key) => {
    const icon = keyIcons[key]
    return !icon ? key : typeof icon === 'object' ? icon[os] : icon
  })

  return keysIcons.join(' ')
}
