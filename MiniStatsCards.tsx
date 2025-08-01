"use client"

import { Users, TrendingUp, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MiniStatsCards() {
  const stats = [
    {
      title: "Total Donors",
      value: "50",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Top Donation",
      value: "₹2,000",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Referral Conversions",
      value: "5",
      icon: RefreshCw,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-purple-200 card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-purple-800">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-full`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
