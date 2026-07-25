// columns.tsx
import { createColumnHelper } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

type Invoice = {
  id: string
  customer: string
  email: string
  amount: number
  status: string
  date: string
}

const columnHelper = createColumnHelper<Invoice>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'Invoice',
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    // Enable filtering on this column
    enableColumnFilter: true,
  }),
  columnHelper.accessor('customer', {
    header: 'Customer',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => `$${info.getValue().toFixed(2)}`,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue()
      return (
        <Badge
          variant={
            status === 'Paid'
              ? 'default'
              : status === 'Pending'
              ? 'secondary'
              : 'destructive'
          }
        >
          {status}
        </Badge>
      )
    },
    // Enable filtering on status column
    enableColumnFilter: true,
    // Custom filter function for array of statuses
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      const status = row.getValue(columnId) as string
      return filterValue.includes(status)
    },
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    enableColumnFilter: true,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
    enableColumnFilter: false, // Disable filtering for actions column
  }),
]