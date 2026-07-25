// DateFilter.tsx
import { Input } from '@/components/ui/input'
import { Column } from '@tanstack/react-table'
import { useState } from 'react'

interface DateFilterProps {
  column: Column<any, any> | undefined
}

export default function DateFilter({ column }: DateFilterProps) {
  if (!column) return null

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleFilter = () => {
    if (fromDate && toDate) {
      column.setFilterValue({ from: fromDate, to: toDate })
    } else if (fromDate) {
      column.setFilterValue({ from: fromDate })
    } else if (toDate) {
      column.setFilterValue({ to: toDate })
    } else {
      column.setFilterValue(undefined)
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="date"
        value={fromDate}
        onChange={(e) => {
          setFromDate(e.target.value)
          handleFilter()
        }}
        className="w-[150px]"
        placeholder="From"
      />
      <span className="text-muted-foreground">to</span>
      <Input
        type="date"
        value={toDate}
        onChange={(e) => {
          setToDate(e.target.value)
          handleFilter()
        }}
        className="w-[150px]"
        placeholder="To"
      />
    </div>
  )
}