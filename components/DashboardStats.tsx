import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity 
} from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    icon: DollarSign,
    trend: 'up',
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Conversion Rate',
    value: '12.5%',
    change: '+4.3%',
    icon: TrendingUp,
    trend: 'up',
  },
  {
    title: 'Active Now',
    value: '573',
    change: '+201',
    icon: Activity,
    trend: 'up',
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}