import { shortcutToIcons } from '@renderer/utils/keys'
import { MdEdit } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { Command } from '@shared/types'
import React, { useEffect, useRef } from 'react'
import { Input } from './Input'

interface CommandItemProps {
  command: Command
}

export const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsEditing(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return (
    <div className="flex items-center justify-between" ref={ref}>
      <span className="text-xs font-medium text-slate-200">{command.label}</span>
      <div className="flex items-center gap-5">
        {isEditing ? (
          <Input placeholder="Record Shortcut" className="h-5 w-36 text-xs" disabled />
        ) : (
          <span className="text-xs font-medium text-slate-200">
            {shortcutToIcons(command.shortcut)}
          </span>
        )}

        <button
          onClick={handleEdit}
          className="bg-zinc-700/70 border-[1px] border-zinc-500/40 rounded-md w-5 h-5 flex items-center justify-center"
        >
          {isEditing ? <RxCross2 size={10} /> : <MdEdit size={10} />}
        </button>
      </div>
    </div>
  )
}
