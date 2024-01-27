import React from 'react'
import { Commands as CommandsI } from '@shared/types'
import { CommandsTable } from './CommandsTable'

interface Props {
  commands: CommandsI | undefined
}

export const Commands: React.FC<Props> = ({ commands }) => {
  if (!commands) return null

  return (
    <div className="mt-2">
      <CommandsTable commands={commands} />
    </div>
  )
}
