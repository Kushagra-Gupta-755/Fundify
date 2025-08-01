"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Trophy, Medal, Award, Crown, Search, Filter, Star, TrendingUp } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", referralCode: "priya2025", donations: 89750, isCurrentUser: false, avatar: 1 },
  { rank: 2, name: "Rahul Kumar", referralCode: "rahul2025", donations: 76230, isCurrentUser: false, avatar: 0 },
  { rank: 3, name: "Ananya Singh", referralCode: "ananya2025", donations: 68900, isCurrentUser: false, avatar: 7 },
  { rank: 4, name: "Kushagra", referralCode: "kushagra2025", donations: 45230, isCurrentUser: true, avatar: 2 },
  { rank: 5, name: "Vikram Patel", referralCode: "vikram2025", donations: 42100, isCurrentUser: false, avatar: 5 },
  { rank: 6, name: "Sneha Gupta", referralCode: "sneha2025", donations: 38750, isCurrentUser: false, avatar: 1 },
  { rank: 7, name: "Arjun Mehta", referralCode: "arjun2025", donations: 35600, isCurrentUser: false, avatar: 3 },
  { rank: 8, name: "Kavya Reddy", referralCode: "kavya2025", donations: 32400, isCurrentUser: false, avatar: 7 },
  { rank: 9, name: "Rohit Jain", referralCode: "rohit2025", donations: 29800, isCurrentUser: false, avatar: 6 },
  { rank: 10, name: "Isha Agarwal", referralCode: "isha2025", donations: 27500, isCurrentUser: false, avatar: 1 },
  { rank: 11, name: "Amit Verma", referralCode: "amit2025", donations: 25200, isCurrentUser: false, avatar: 4 },
  { rank: 12, name: "Neha Kapoor", referralCode: "neha2025", donations: 23800, isCurrentUser: false, avatar: 8 },
  { rank: 13, name: "Sanjay Gupta", referralCode: "sanjay2025", donations: 22100, isCurrentUser: false, avatar: 3 },
  { rank: 14, name: "Pooja Sharma", referralCode: "pooja2025", donations: 20500, isCurrentUser: false, avatar: 1 },
  { rank: 15, name: "Ravi Kumar", referralCode: "ravi2025", donations: 19200, isCurrentUser: false, avatar: 6 },
]

export default function LeaderboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
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

  const getAvatarPosition = (avatarIndex: number) => {
    const positions = [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 400, y: 0 },
      { x: 0, y: 200 },
      { x: 200, y: 200 },
      { x: 400, y: 200 },
      { x: 0, y: 400 },
      { x: 200, y: 400 },
      { x: 400, y: 400 },
    ]
    return positions[avatarIndex] || positions[0]
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-purple-500" />
      case 2:
        return <Medal className="h-6 w-6 text-purple-400" />
      case 3:
        return <Award className="h-6 w-6 text-purple-600" />
      default:
        return <span className="text-lg font-bold text-purple-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">🏆 Champion</Badge>
      case 2:
        return <Badge className="bg-gradient-to-r from-purple-300 to-purple-500 text-white">🥈 Runner-up</Badge>
      case 3:
        return <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">🥉 Third Place</Badge>
      default:
        return null
    }
  }

  const filteredData = leaderboardData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.referralCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <Link href="/leaderboard" className="text-purple-600 font-semibold px-4 py-2 rounded-full bg-purple-100">
            Leaderboard
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full px-6"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full px-6">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Header - Centered */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            🏆 Leaderboard
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
            Celebrating our fundraising champions who are making a real difference in the world
          </p>
        </div>

        {/* Search and Filter - Centered */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
              <Input
                placeholder="Search by name or referral code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-purple-200 focus:border-purple-500 rounded-full"
              />
            </div>
            <Button
              variant="outline"
              className="bg-white/80 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full px-6"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Top 3 Podium - Centered */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {/* Second Place */}
          <div className="md:order-1 flex flex-col items-center">
            <Card className="w-full bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 shadow-2xl rounded-3xl card-hover">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 relative">
                  <div
                    className="w-20 h-20 rounded-full border-4 border-purple-400 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(/images/avatars.png)`,
                      backgroundPosition: `${getAvatarPosition(leaderboardData[1].avatar).x}px ${getAvatarPosition(leaderboardData[1].avatar).y}px`,
                      backgroundSize: "600px 600px",
                    }}
                  />
                </div>
                <CardTitle className="text-2xl text-purple-800">{leaderboardData[1].name}</CardTitle>
                <CardDescription className="font-mono text-lg text-purple-600">
                  {leaderboardData[1].referralCode}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-4">
                  ₹{leaderboardData[1].donations.toLocaleString()}
                </div>
                <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-white text-lg px-4 py-2">
                  🥈 2nd Place
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* First Place */}
          <div className="md:order-2 flex flex-col items-center">
            <Card className="w-full bg-gradient-to-br from-purple-200 to-violet-200 border-2 border-purple-400 shadow-2xl rounded-3xl card-hover animate-pulse-glow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 relative">
                  <div
                    className="w-24 h-24 rounded-full border-4 border-purple-500 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(/images/avatars.png)`,
                      backgroundPosition: `${getAvatarPosition(leaderboardData[0].avatar).x}px ${getAvatarPosition(leaderboardData[0].avatar).y}px`,
                      backgroundSize: "600px 600px",
                    }}
                  />
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full p-2">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-purple-800">{leaderboardData[0].name}</CardTitle>
                <CardDescription className="font-mono text-xl text-purple-600">
                  {leaderboardData[0].referralCode}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-purple-700 mb-4">
                  ₹{leaderboardData[0].donations.toLocaleString()}
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xl px-6 py-3">
                  🏆 Champion
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Third Place */}
          <div className="md:order-3 flex flex-col items-center">
            <Card className="w-full bg-gradient-to-br from-violet-100 to-indigo-200 border-2 border-violet-400 shadow-2xl rounded-3xl card-hover">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 relative">
                  <div
                    className="w-20 h-20 rounded-full border-4 border-violet-600 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(/images/avatars.png)`,
                      backgroundPosition: `${getAvatarPosition(leaderboardData[2].avatar).x}px ${getAvatarPosition(leaderboardData[2].avatar).y}px`,
                      backgroundSize: "600px 600px",
                    }}
                  />
                </div>
                <CardTitle className="text-2xl text-purple-800">{leaderboardData[2].name}</CardTitle>
                <CardDescription className="font-mono text-lg text-purple-600">
                  {leaderboardData[2].referralCode}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-4">
                  ₹{leaderboardData[2].donations.toLocaleString()}
                </div>
                <Badge className="bg-gradient-to-r from-violet-600 to-indigo-800 text-white text-lg px-4 py-2">
                  🥉 3rd Place
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Leaderboard - Centered */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-3xl">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <span className="text-purple-800">Complete Rankings</span>
              </CardTitle>
              <CardDescription className="text-lg text-purple-600">
                See where you stand among all fundraisers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                      user.isCurrentUser
                        ? "bg-gradient-to-r from-purple-100 to-violet-100 border-2 border-purple-300 shadow-lg"
                        : "bg-purple-50 hover:bg-purple-100"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">{getRankIcon(user.rank)}</div>
                      <div
                        className="w-12 h-12 rounded-full border-2 border-purple-300 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(/images/avatars.png)`,
                          backgroundPosition: `${getAvatarPosition(user.avatar).x}px ${getAvatarPosition(user.avatar).y}px`,
                          backgroundSize: "600px 600px",
                        }}
                      />
                      <div>
                        <h3 className="font-bold text-purple-800 text-lg">
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                              You
                            </Badge>
                          )}
                        </h3>
                        <p className="text-purple-600 font-mono">{user.referralCode}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-700">₹{user.donations.toLocaleString()}</div>
                      {getRankBadge(user.rank)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section - Centered */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 shadow-2xl rounded-3xl card-hover">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-center mb-12">Leaderboard Stats</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">₹{leaderboardData[0].donations.toLocaleString()}</div>
                  <div className="text-purple-100">Top Fundraiser</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{leaderboardData.length}</div>
                  <div className="text-purple-100">Active Fundraisers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">
                    ₹{leaderboardData.reduce((sum, user) => sum + user.donations, 0).toLocaleString()}
                  </div>
                  <div className="text-purple-100">Total Raised</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action - Centered */}
        <div className="text-center mt-16">
          <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover max-w-4xl mx-auto">
            <CardContent className="p-12">
              <Trophy className="h-16 w-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-purple-800 mb-6">Want to Climb Higher?</h3>
              <p className="text-purple-600 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
                Share your referral code, engage with donors, and make a bigger impact to move up the leaderboard!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Star className="mr-3 h-5 w-5" />
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Heart className="mr-3 h-5 w-5" />
                    Make Donation
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
