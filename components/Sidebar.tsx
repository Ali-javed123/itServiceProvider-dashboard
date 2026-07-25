'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  Mail,
  ChevronLeft,
  ChevronRight,
  LogOut,
  
  ChartBarStacked
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '../app/dashboard/hooks/useSidebar'
import { Button } from '@/components/ui/button'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: BarChart3, label: 'Service', href: '/services' },
  { icon: ChartBarStacked, label: 'Catgory Service', href: '/service-category' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Mail, label: 'Messages', href: '/messages' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <aside
  className={cn(
    "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background transition-all duration-300",
    isCollapsed ? "w-16" : "w-64"
  )}
>
  {/* Logo */}
  <div className="flex h-16 items-center justify-between border-b px-4">
    {!isCollapsed && (
      <span className="text-xl font-bold">
        Dashboard
      </span>
    )}

    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  </div>

  {/* Navigation */}
  <nav className="flex-1 overflow-y-auto p-2">
    {menuItems.map((item) => {
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "mb-1 flex items-center rounded-lg px-3 py-2 transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted",
            isCollapsed && "justify-center"
          )}
        >
          <item.icon className="h-5 w-5 shrink-0" />

          {!isCollapsed && (
            <span className="ml-3">{item.label}</span>
          )}
        </Link>
      );
    })}
  </nav>

  {/* Footer */}
  <div className="border-t p-3">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        isCollapsed && "justify-center"
      )}
    >
      <LogOut className="h-5 w-5" />

      {!isCollapsed && (
        <span className="ml-2">Logout</span>
      )}
    </Button>
  </div>
</aside>
  )
}