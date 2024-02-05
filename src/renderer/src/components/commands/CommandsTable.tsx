import { Command, Commands } from '@shared/types'
import React, { useMemo } from 'react'
import Table from '../ui/Table'
import { commandsColumnDefs } from './columns'

interface CommandsTableProps {
  commands: Commands
}

export const CommandsTable: React.FC<CommandsTableProps> = ({ commands }) => {
  const data = Object.values(commands).reduce((acc, curr) => {
    return [...acc, ...curr]
  }, [])

  const columnsDefs = useMemo(() => commandsColumnDefs, [])

  return <Table<Command> data={data} columnDefs={columnsDefs} />
}