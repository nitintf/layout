import React from 'react'
import { WindowsCommands } from '@shared/types'
import { WindowsCommandsTable } from './components/Table'

interface Props {
  windowsCommands: WindowsCommands | undefined
}

export const WindowsManager: React.FC<Props> = ({ windowsCommands }) => {
  if (!windowsCommands) return null

  return (
    <div className="mt-2">
      <WindowsCommandsTable commands={windowsCommands} />
    </div>
  )
}
