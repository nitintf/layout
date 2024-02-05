const keyIcons = {
  // Modifier keys
  Control: { mac: '⌃', win: 'Ctrl' },
  Option: { mac: '⌥', win: 'Alt' },
  Command: { mac: '⌘', win: 'Win' },
  Meta: { mac: '⌘', win: 'Win' },
  Shift: { mac: '⇧', win: 'Shift' },
  Alt: { mac: 'Option', win: 'Alt' },
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
  CapsLock: '⇪'
}

export function shortcutToIcons(shortcut: string, os = 'mac') {
  return shortcut
    .split('+')
    .map((key) => {
      const icon = keyIcons[key]
      if (!icon) return key
      return typeof icon === 'object' ? icon[os] : icon
    })
    .join(' ')
}
