import { Input } from '@renderer/components/Input'
import { cn } from '@renderer/utils'
import {
  useReactTable,
  createColumnHelper,
  CellContext,
  getCoreRowModel,
  flexRender,
  ColumnDef as TableColumnDef,
  getFilteredRowModel
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

export type ColumnDef<T extends object> = {
  accessor: (row: T) => string | boolean | number
  id: string
  cell: (info: CellContext<T, string | boolean | number>) => JSX.Element
  header: (() => JSX.Element) | string
  minSize: number
}

type TableProps<T extends object> = {
  data: T[]
  columnDefs: ColumnDef<T>[]
}

export default function Table<T extends object>({ columnDefs, data }: TableProps<T>) {
  const columnHelper = createColumnHelper<T>()
  const [filters, setFilters] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: TableColumnDef<T, any>[] = useMemo(
    () =>
      columnDefs.map((def) =>
        columnHelper.accessor(def.accessor, {
          id: def.id,
          cell: def.cell,
          header: def.header,
          size: def.minSize
        })
      ),
    [columnDefs, columnHelper]
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filters
    },
    onGlobalFilterChange: setFilters
  })

  return (
    <div>
      <Input
        placeholder="Search..."
        className="w-1/3 ml-2 mb-2"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />
      <table className="w-full px-6">
        <thead className="border-t border-b border-zinc-500/40 bg-zinc-600/20">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={cn('relative text-xs text-gray-300/80 py-2 px-3 text-left', {
                    'pl-6': index === 0
                  })}
                  style={{ width: header.column.getSize() }}
                >
                  {index !== 0 ? (
                    <div className="w-px h-5 bg-zinc-500/40 absolute left-0 top-1.5" />
                  ) : null}
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIdx) => (
            <tr
              key={row.id}
              className={cn({
                'bg-zinc-500/20 rounded-sm': rowIdx % 2 !== 0
              })}
              tabIndex={0}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  className={cn('pl-3 py-1.5', {
                    'pl-6': index === 0
                  })}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
