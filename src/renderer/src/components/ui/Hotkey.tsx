import { shortcutToIcons } from '@renderer/utils/keys'
import React from 'react'

interface HotkeyProps {
  hotkey: string
}

export const Hotkey: React.FC<HotkeyProps> = ({ hotkey }) => {
  return (
    <div className="cursor-pointer">
      <p className="text-xs text-gray-400">{shortcutToIcons(hotkey)}</p>
    </div>
  )
}
