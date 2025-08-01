"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Target, Zap } from "lucide-react"

export default function MiniStatsCards() {
  const stats = [
    {
      title: "This Week",
      value: "₹1,250",
      change: "+15%",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "New Supporters",
      value: "12",
      change: "+3",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Goal Progress",
      value: "42%",
      change: "+8%",
      icon: Target,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Streak",
      value: "12 days",
      change: "Active",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-600">{stat.title}</p>
                <p className="text-lg font-bold text-purple-800">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
