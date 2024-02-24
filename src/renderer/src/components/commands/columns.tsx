import { Command } from '@shared/types'
import { ColumnDef } from '../ui/Table'
import { Checkbox } from '../ui/CheckBox'
import { Hotkey } from '../ui/Hotkey'
import { useAppConfig } from '@renderer/hooks/useAppConfig'
import { cn } from '@renderer/utils'
import { renderCommandIcon } from './icons'

export const commandsColumnDefs: ColumnDef<Command>[] = [
  {
    accessor: (row) => row.label,
    id: 'label',
    header: 'Label',
    minSize: 120,
    cell: (info) => {
      const isDisabled = !info.row.original.enabled
      return (
        <div
          className={cn('text-xs font-semibold text-slate-100 flex gap-2 items-center', {
            'text-opacity-30': isDisabled
          })}
        >
          {renderCommandIcon(info.row.original.action, isDisabled)}
          {info.getValue()}
        </div>
      )
    }
  },
  {
    accessor: () => 'command',
    id: 'type',
    header: 'Type',
    minSize: 90,
    cell: (info) => {
      const isDisabled = !info.row.original.enabled
      return (
        <div
          className={cn('text-xs font-semibold text-zinc-400', {
            'text-opacity-50': isDisabled
          })}
        >
          Window
        </div>
      )
    }
  },
  {
    accessor: (row) => row.shortcut,
    id: 'hotkey',
    header: 'Hotkey',
    minSize: 10,
    cell: (info) => {
      const isDisabled = !info.row.original.enabled

      return (
        <Hotkey
          action={info.row.original.action}
          hotkey={info.getValue() as string}
          className={cn({
            'text-opacity-50': isDisabled
          })}
        />
      )
    }
  },
  {
    accessor: (row) => row.enabled,
    id: 'enabled',
    header: 'Enabled',
    minSize: 10,
    cell: (info) => {
      const { updateCommandsConfig } = useAppConfig()

      return (
        <Checkbox
          checked={info.getValue() as boolean}
          onCheckedChange={(checked) => {
            updateCommandsConfig(info.row.original.action, 'enabled', checked)
          }}
        />
      )
    }
  }
]
