import { Command } from '@shared/types'
import { ColumnDef } from '../ui/Table'
import { Checkbox } from '../ui/CheckBox'
import { Hotkey } from '../ui/Hotkey'

export const commandsColumnDefs: ColumnDef<Command>[] = [
  {
    accessor: (row) => row.label,
    id: 'label',
    header: 'Label',
    minSize: 120,
    cell: (info) => <div className="text-xs font-semibold text-slate-100">{info.getValue()}</div>
  },
  {
    accessor: () => 'command',
    id: 'type',
    header: 'Type',
    minSize: 90,
    cell: () => <div className="text-xs font-semibold text-zinc-400">Command</div>
  },
  {
    accessor: (row) => row.shortcut,
    id: 'hotkey',
    header: 'Hotkey',
    minSize: 10,
    cell: (info) => <Hotkey hotkey={info.getValue() as string} />
  },
  {
    accessor: (row) => row.enabled,
    id: 'enabled',
    header: 'Enabled',
    minSize: 10,
    cell: (info) => <Checkbox checked={info.getValue() as boolean} />
  }
]
