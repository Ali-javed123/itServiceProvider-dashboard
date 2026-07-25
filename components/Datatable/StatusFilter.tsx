// StatusFilter.tsx
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Filter } from 'lucide-react'
import { Column } from '@tanstack/react-table'

interface StatusFilterProps {
  column: Column<any, any> | undefined
  options: string[]
}

export default function StatusFilter({ column, options }: StatusFilterProps) {
  if (!column) return null

  const filterValue = column.getFilterValue() as string[] | undefined

  return (
    <DropdownMenu>
    <DropdownMenuTrigger
  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
>
  <Filter className="h-4 w-4" />
  <span>Status</span>

  {filterValue && filterValue.length > 0 && (
    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
      {filterValue.length}
    </span>
  )}
</DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={filterValue?.includes(option) ?? false}
            onCheckedChange={(checked) => {
              const newFilterValue = checked
                ? [...(filterValue || []), option]
                : (filterValue || []).filter((v) => v !== option)
              column.setFilterValue(
                newFilterValue.length ? newFilterValue : undefined
              )
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}