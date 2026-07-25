// DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Filter, X } from 'lucide-react'
import { useState, useMemo, lazy, Suspense } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  flexRender,
} from '@tanstack/react-table'
import { columns } from '../columns' // Import column definitions

// Lazy load filter components for code splitting
const FilterInput = lazy(() => import('./FilterInput'))
const StatusFilter = lazy(() => import('./StatusFilter'))
const DateFilter = lazy(() => import('./DateFilter'))

const invoices = [
  {
    id: 'INV-001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 250.00,
    status: 'Paid',
    date: '2024-01-15',
  },
  {
    id: 'INV-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: 150.00,
    status: 'Pending',
    date: '2024-01-14',
  },
  {
    id: 'INV-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    amount: 350.00,
    status: 'Paid',
    date: '2024-01-13',
  },
  {
    id: 'INV-004',
    customer: 'Alice Williams',
    email: 'alice@example.com',
    amount: 450.00,
    status: 'Overdue',
    date: '2024-01-12',
  },
]

export function DataTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const data = useMemo(() => invoices, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Clear all filters
  const clearFilters = () => {
    setColumnFilters([])
    setGlobalFilter('')
  }

  const hasFilters = columnFilters.length > 0 || globalFilter.length > 0

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <Suspense fallback={<div>Loading...</div>}>
            <FilterInput
            
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Searc all columns..."
            />
          </Suspense>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Suspense fallback={<div>Loading...</div>}>
            <StatusFilter
              column={table.getColumn('status')}
              options={['Paid', 'Pending', 'Overdue']}
            />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <DateFilter column={table.getColumn('date')} />
          </Suspense>

          {hasFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}