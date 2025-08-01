"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Medal, Award, Crown, Star, BarChart3, Gift, Users2 } from "lucide-react"
import TestimonialsSection from "../TestimonialsSection"

const leaderboardData = [
  { rank: 1, name: "Kushagra Gupta", referralCode: "kushagra2025", donations: 89750, isCurrentUser: false, avatar: 1 },
  { rank: 2, name: "Rahul Kumar", referralCode: "rahul2025", donations: 76230, isCurrentUser: false, avatar: 0 },
  { rank: 3, name: "Ananya Singh", referralCode: "ananya2025", donations: 68900, isCurrentUser: false, avatar: 7 },
  { rank: 4, name: "Priya Sharma", referralCode: "priya2025", donations: 45230, isCurrentUser: true, avatar: 2 },
  { rank: 5, name: "Vikram Patel", referralCode: "vikram2025", donations: 42100, isCurrentUser: false, avatar: 5 },
  { rank: 6, name: "Sneha Gupta", referralCode: "sneha2025", donations: 38750, isCurrentUser: false, avatar: 1 },
  { rank: 7, name: "Arjun Mehta", referralCode: "arjun2025", donations: 35600, isCurrentUser: false, avatar: 3 },
  { rank: 8, name: "Kavya Reddy", referralCode: "kavya2025", donations: 32400, isCurrentUser: false, avatar: 7 },
  { rank: 9, name: "Rohit Jain", referralCode: "rohit2025", donations: 29800, isCurrentUser: false, avatar: 6 },
  { rank: 10, name: "Isha Agarwal", referralCode: "isha2025", donations: 27500, isCurrentUser: false, avatar: 1 },
]

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0

    function drawWaves() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient for waves
      const gradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient1.addColorStop(0, "rgba(196, 181, 253, 0.1)")
      gradient1.addColorStop(1, "rgba(147, 51, 234, 0.05)")

      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient2.addColorStop(0, "rgba(167, 139, 250, 0.08)")
      gradient2.addColorStop(1, "rgba(124, 58, 237, 0.03)")

      const gradient3 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient3.addColorStop(0, "rgba(139, 92, 246, 0.06)")
      gradient3.addColorStop(1, "rgba(109, 40, 217, 0.02)")

      // Draw multiple wave layers
      drawWave(ctx, canvas, time * 0.5, 0.8, gradient1, 0.3)
      drawWave(ctx, canvas, time * 0.3, 1.2, gradient2, 0.5)
      drawWave(ctx, canvas, time * 0.7, 0.6, gradient3, 0.7)

      time += 0.01
      requestAnimationFrame(drawWaves)
    }

    function drawWave(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number,
      amplitude: number,
      gradient: CanvasGradient,
      yOffset: number,
    ) {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          canvas.height * yOffset +
          Math.sin((x * 0.01 + time) * Math.PI) * amplitude * 20 +
          Math.sin((x * 0.02 + time * 1.5) * Math.PI) * amplitude * 15
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
    }

    drawWaves()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto backdrop-blur-sm bg-white/20 rounded-2xl mx-6 mt-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Fundify
              </span>
              <p className="text-xs text-purple-600 -mt-1">Fundraising Made Simple</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full px-6"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section - Centered */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <div className="animate-float relative">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent leading-tight mb-6">
                Fundify
              </h1>
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent mb-4">
                Empower Change Through Fundraising
              </p>
            </div>

            <p className="text-xl md:text-2xl text-purple-700 max-w-3xl mx-auto leading-relaxed">
              Join our community of passionate interns making a difference. Track your impact, earn rewards, and compete
              with fellow changemakers in the most beautiful fundraising platform.
            </p>
          </div>

          {/* Feature Cards - Centered */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-200 card-hover">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-4 rounded-2xl">
                  <BarChart3 className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-800 text-center">Track Progress</h3>
              <p className="text-purple-600 text-lg leading-relaxed text-center">
                Monitor your fundraising goals and see your impact in real-time with beautiful analytics and insights.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 border border-violet-200 card-hover">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-4 rounded-2xl">
                  <Gift className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-800 text-center">Earn Rewards</h3>
              <p className="text-purple-600 text-lg leading-relaxed text-center">
                Unlock beautiful badges and achievements as you reach milestones in your fundraising journey.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border border-indigo-200 card-hover">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl">
                  <Users2 className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-800 text-center">Community</h3>
              <p className="text-purple-600 text-lg leading-relaxed text-center">
                Connect with fellow interns and compete on the leaderboard to drive positive change together.
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Section - Centered */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Header - Centered */}
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              🏆 Leaderboard
            </h2>
            <p className="text-2xl text-purple-600 max-w-3xl mx-auto leading-relaxed">
              Celebrating our top fundraising champions who are making a real difference in the world
            </p>
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

          {/* View Full Leaderboard CTA - Centered */}
          <div className="text-center mb-16">
            <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover max-w-4xl mx-auto">
              <CardContent className="p-12">
                <Trophy className="h-16 w-16 text-purple-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-purple-800 mb-4">Want to See More?</h3>
                <p className="text-purple-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  View the complete leaderboard to see all fundraising champions and track your progress against other
                  interns.
                </p>
                <Link href="/leaderboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Trophy className="mr-3 h-5 w-5" />
                    View Full Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Section - Centered */}
          <div className="mt-16">
            <TestimonialsSection />
          </div>

          {/* Call to Action - Centered */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 shadow-2xl rounded-3xl card-hover max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-4xl font-bold mb-6">Ready to Climb the Rankings?</h3>
                <p className="text-purple-100 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
                  Share your referral code, engage with donors, and make a bigger impact to move up the leaderboard!
                </p>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Star className="mr-3 h-6 w-6" />
                  Start Fundraising
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
