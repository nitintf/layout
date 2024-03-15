import { Command, WindowsCommands } from '@shared/types'
import React, { useMemo } from 'react'
import Table from '@renderer/components/Table'
import { windowsCommandsColumnDefs } from './columns'

interface WindowsCommandsTableProps {
  commands: WindowsCommands
}

export const WindowsCommandsTable: React.FC<WindowsCommandsTableProps> = ({ commands }) => {
  const data = Object.values(commands).reduce((acc, curr) => {
    return [...acc, ...curr]
  }, [])

  const columnsDefs = useMemo(() => windowsCommandsColumnDefs, [])

  return <Table<Command> data={data} columnDefs={columnsDefs} />
}
