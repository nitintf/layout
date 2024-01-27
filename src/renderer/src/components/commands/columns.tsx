import { Command } from '@shared/types'
import { ColumnDef } from '../ui/Table'
import { shortcutToIcons } from '@renderer/utils/keys'
import { Checkbox } from '../ui/CheckBox'

export const commandsColumnDefs: ColumnDef<Command>[] = [
  {
    accessor: (row) => row.label,
    id: 'label',
    header: 'Label',
    size: 40,
    cell: (info) => <div className="text-xs font-semibold text-slate-100">{info.getValue()}</div>
  },
  {
    accessor: () => 'command',
    id: 'type',
    header: 'Type',
    size: 20,
    cell: () => <div className="text-xs font-semibold text-zinc-400">Command</div>
  },
  {
    accessor: (row) => row.shortcut,
    id: 'hotkey',
    header: 'Hotkey',
    size: 20,
    cell: (info) => <>{shortcutToIcons(info.getValue() as string)}</>
  },
  {
    accessor: (row) => row.enabled,
    id: 'enabled',
    header: 'Enabled',
    size: 20,
    cell: (info) => <Checkbox checked={info.getValue() as boolean} />
  }
]
