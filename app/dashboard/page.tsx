"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  TrendingUp,
  Users,
  Target,
  Share2,
  Calendar,
  DollarSign,
  BarChart3,
  Trophy,
  Star,
  LogOut,
} from "lucide-react"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!loggedIn) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  const userStats = {
    totalRaised: 45230,
    goal: 50000,
    donors: 127,
    campaigns: 3,
    rank: 4,
    referralCode: "kushagra2025",
  }

  const recentDonations = [
    { name: "Anonymous", amount: 2500, time: "2 hours ago" },
    { name: "Priya S.", amount: 1000, time: "5 hours ago" },
    { name: "Rahul K.", amount: 5000, time: "1 day ago" },
    { name: "Ananya M.", amount: 1500, time: "2 days ago" },
  ]

  const campaigns = [
    {
      title: "Education for All",
      raised: 25000,
      goal: 30000,
      donors: 85,
      status: "active",
    },
    {
      title: "Clean Water Initiative",
      raised: 15230,
      goal: 20000,
      donors: 42,
      status: "active",
    },
  ]

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto backdrop-blur-sm bg-white/20 rounded-2xl mx-6 mt-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-2 rounded-xl">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent"
            >
              Fundify
            </Link>
            <p className="text-xs text-purple-600 -mt-1">Fundraising Made Simple</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
          >
            About
          </Link>
          <Link
            href="/donate"
            className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
          >
            Donate
          </Link>
          <Link
            href="/contact"
            className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
          >
            Contact
          </Link>
          <Link
            href="/leaderboard"
            className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
          >
            Leaderboard
          </Link>
          <Link href="/dashboard" className="text-purple-600 font-semibold px-4 py-2 rounded-full bg-purple-100">
            Dashboard
          </Link>
          <Button
            onClick={handleLogout}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full px-6"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Header - Centered */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
            Track your fundraising progress and manage your campaigns
          </p>
        </div>

        {/* Stats Overview - Centered */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">₹{userStats.totalRaised.toLocaleString()}</div>
              <p className="text-xs text-purple-600">
                {((userStats.totalRaised / userStats.goal) * 100).toFixed(1)}% of goal
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Donors</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{userStats.donors}</div>
              <p className="text-xs text-purple-600">+12 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Campaigns</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{userStats.campaigns}</div>
              <p className="text-xs text-purple-600">2 active, 1 completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Leaderboard Rank</CardTitle>
              <Trophy className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">#{userStats.rank}</div>
              <p className="text-xs text-purple-600">Top 10% fundraiser</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-lg rounded-full p-1">
              <TabsTrigger value="overview" className="rounded-full">
                Overview
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="rounded-full">
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-full">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-full">
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Progress Card */}
                <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="h-6 w-6 text-purple-600" />
                      <span className="text-purple-800">Fundraising Progress</span>
                    </CardTitle>
                    <CardDescription className="text-purple-600">
                      Your journey towards the ₹{userStats.goal.toLocaleString()} goal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-purple-700">Progress</span>
                        <span className="text-purple-700">
                          ₹{userStats.totalRaised.toLocaleString()} / ₹{userStats.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(userStats.totalRaised / userStats.goal) * 100} className="h-3" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-800">
                          ₹{(userStats.goal - userStats.totalRaised).toLocaleString()}
                        </div>
                        <div className="text-sm text-purple-600">Remaining</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-800">
                          {Math.ceil((userStats.goal - userStats.totalRaised) / (userStats.totalRaised / 30))}
                        </div>
                        <div className="text-sm text-purple-600">Days to Goal</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Code Card */}
                <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Share2 className="h-6 w-6 text-purple-600" />
                      <span className="text-purple-800">Your Referral Code</span>
                    </CardTitle>
                    <CardDescription className="text-purple-600">
                      Share this code to earn referral bonuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl">
                      <div className="text-3xl font-bold font-mono text-purple-800 mb-2">{userStats.referralCode}</div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full"
                      >
                        Copy Code
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-purple-800">23</div>
                        <div className="text-sm text-purple-600">Referrals</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-purple-800">₹8,500</div>
                        <div className="text-sm text-purple-600">Bonus Earned</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Donations */}
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Heart className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Recent Donations</span>
                  </CardTitle>
                  <CardDescription className="text-purple-600">Latest contributions to your campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDonations.map((donation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                            <Heart className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-purple-800">{donation.name}</div>
                            <div className="text-sm text-purple-600">{donation.time}</div>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                          ₹{donation.amount.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {campaigns.map((campaign, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-800">{campaign.title}</CardTitle>
                      <CardDescription className="text-purple-600">
                        <Badge
                          className={`${
                            campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {campaign.status}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-purple-700">Progress</span>
                          <span className="text-purple-700">
                            ₹{campaign.raised.toLocaleString()} / ₹{campaign.goal.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600">{campaign.donors} donors</span>
                        <span className="text-purple-600">
                          {((campaign.raised / campaign.goal) * 100).toFixed(1)}% complete
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Fundraising Analytics</span>
                  </CardTitle>
                  <CardDescription className="text-purple-600">
                    Detailed insights into your fundraising performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                      <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-800">+15%</div>
                      <div className="text-sm text-purple-600">Growth This Month</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-800">₹356</div>
                      <div className="text-sm text-purple-600">Avg. Donation</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                      <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-800">45</div>
                      <div className="text-sm text-purple-600">Days Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Star className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Profile Settings</span>
                  </CardTitle>
                  <CardDescription className="text-purple-600">Manage your account and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-800">Account Information</h3>
                      <div className="space-y-2">
                        <div className="text-sm text-purple-600">Name: Kushagra</div>
                        <div className="text-sm text-purple-600">Email: kushagra@example.com</div>
                        <div className="text-sm text-purple-600">Member since: January 2025</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-800">Achievements</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                          🏆 Top 10 Fundraiser
                        </Badge>
                        <Badge className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
                          🎯 Goal Achiever
                        </Badge>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                          🌟 Community Leader
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions - Centered */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 shadow-2xl rounded-3xl card-hover max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold mb-6">Ready for More Impact?</h3>
              <p className="text-purple-100 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
                Take your fundraising to the next level with these quick actions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Target className="mr-3 h-5 w-5" />
                  Create Campaign
                </Button>
                <Link href="/leaderboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg rounded-full bg-transparent"
                  >
                    <Trophy className="mr-3 h-5 w-5" />
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
