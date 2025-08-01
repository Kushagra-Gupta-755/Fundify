"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, ArrowLeft, Crown, Star } from "lucide-react"
import Image from "next/image"
import LeaderboardSearch from "../LeaderboardSearch"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const initialLeaderboardData = [
  { rank: 1, name: "Priya Sharma", referralCode: "priya2025", donations: 89750, isCurrentUser: false },
  { rank: 2, name: "Rahul Kumar", referralCode: "rahul2025", donations: 76230, isCurrentUser: false },
  { rank: 3, name: "Ananya Singh", referralCode: "ananya2025", donations: 68900, isCurrentUser: false },
  { rank: 4, name: "Kushagra", referralCode: "kushagra2025", donations: 45230, isCurrentUser: true },
  { rank: 5, name: "Vikram Patel", referralCode: "vikram2025", donations: 42100, isCurrentUser: false },
  { rank: 6, name: "Sneha Gupta", referralCode: "sneha2025", donations: 38750, isCurrentUser: false },
  { rank: 7, name: "Arjun Mehta", referralCode: "arjun2025", donations: 35600, isCurrentUser: false },
  { rank: 8, name: "Kavya Reddy", referralCode: "kavya2025", donations: 32400, isCurrentUser: false },
  { rank: 9, name: "Rohit Jain", referralCode: "rohit2025", donations: 29800, isCurrentUser: false },
  { rank: 10, name: "Isha Agarwal", referralCode: "isha2025", donations: 27500, isCurrentUser: false },
]

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData)
  const [filteredData, setFilteredData] = useState(initialLeaderboardData)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = ["rgba(138, 43, 226, 0.3)", "rgba(123, 104, 238, 0.3)", "rgba(106, 90, 205, 0.3)"]

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSearch = (query: string) => {
    const filtered = leaderboardData.filter(
      (intern) =>
        intern.name.toLowerCase().includes(query.toLowerCase()) ||
        intern.referralCode.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredData(filtered)
    toast.info(`Found ${filtered.length} results`)
  }

  const handleSort = (field: string, direction: "asc" | "desc") => {
    const sorted = [...filteredData].sort((a, b) => {
      let aValue, bValue
      if (field === "donations") {
        aValue = a.donations
        bValue = b.donations
      } else {
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
      }

      if (direction === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // Reassign ranks based on new order
    const rankedData = sorted.map((intern, index) => ({
      ...intern,
      rank: index + 1,
    }))

    setFilteredData(rankedData)
    toast.success(`Sorted by ${field} (${direction})`)
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">🏆 Champion</Badge>
      case 2:
        return <Badge className="bg-gradient-to-r from-gray-400 to-gray-600 text-white">🥈 Runner-up</Badge>
      case 3:
        return <Badge className="bg-gradient-to-r from-amber-600 to-amber-800 text-white">🥉 Third Place</Badge>
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
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div></div> {/* Empty space where logo was */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-purple-700 hover:text-purple-900 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-purple-700 hover:text-purple-900 transition-colors">
              About
            </Link>
            <Link href="/donate" className="text-purple-700 hover:text-purple-900 transition-colors">
              Donate
            </Link>
            <Link href="/contact" className="text-purple-700 hover:text-purple-900 transition-colors">
              Contact
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 pb-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🏆 Leaderboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating our top fundraising champions who are making a real difference in the world
            </p>
          </div>

          {/* Search and Filter */}
          <LeaderboardSearch onSearch={handleSearch} onSort={handleSort} />

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {filteredData.slice(0, 3).map((intern, index) => {
              const podiumOrder = [1, 0, 2] // Second, First, Third
              const actualIndex = podiumOrder[index]
              const podiumIntern = filteredData[actualIndex]
              if (!podiumIntern) return null

              return (
                <div key={podiumIntern.rank} className={`md:order-${index + 1} flex flex-col items-center`}>
                  <Card
                    className={`w-full shadow-lg card-hover ${
                      podiumIntern.rank === 1
                        ? "bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 shadow-xl transform scale-105"
                        : podiumIntern.rank === 2
                          ? "bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300"
                          : "bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400"
                    }`}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-2 relative">
                        <Image
                          src={`/placeholder.svg?height=${podiumIntern.rank === 1 ? 80 : 64}&width=${podiumIntern.rank === 1 ? 80 : 64}`}
                          alt={`${podiumIntern.name} profile picture`}
                          width={podiumIntern.rank === 1 ? 80 : 64}
                          height={podiumIntern.rank === 1 ? 80 : 64}
                          className={`rounded-full border-4 ${
                            podiumIntern.rank === 1
                              ? "border-yellow-400"
                              : podiumIntern.rank === 2
                                ? "border-gray-400"
                                : "border-amber-600"
                          }`}
                        />
                        {podiumIntern.rank === 1 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-1">
                            <Crown className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <CardTitle className={podiumIntern.rank === 1 ? "text-xl" : "text-lg"}>
                        {podiumIntern.name}
                      </CardTitle>
                      <CardDescription className="font-mono text-sm">{podiumIntern.referralCode}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div
                        className={`font-bold mb-2 ${
                          podiumIntern.rank === 1 ? "text-3xl text-yellow-700" : "text-2xl text-gray-700"
                        }`}
                      >
                        ₹{podiumIntern.donations.toLocaleString()}
                      </div>
                      {getRankBadge(podiumIntern.rank)}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Full Leaderboard Table */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                <span>Complete Rankings</span>
              </CardTitle>
              <CardDescription>All fundraising interns ranked by total donations raised</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredData.map((intern, index) => (
                  <div
                    key={`${intern.referralCode}-${index}`}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 card-hover ${
                      intern.isCurrentUser
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm">
                        {getRankIcon(intern.rank)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&query=professional headshot of young ${index % 2 === 0 ? "Indian woman" : "Indian man"} smiling`}
                          alt={`${intern.name} profile picture`}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-gray-300"
                        />
                        <div>
                          <h3 className={`font-semibold ${intern.isCurrentUser ? "text-blue-700" : "text-gray-800"}`}>
                            {intern.name}
                            {intern.isCurrentUser && <span className="ml-2 text-sm text-blue-600">(You)</span>}
                          </h3>
                          <p className="text-sm text-gray-600 font-mono">{intern.referralCode}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">₹{intern.donations.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Total Raised</div>
                      </div>
                      {getRankBadge(intern.rank)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl card-hover">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Climb the Rankings?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Share your referral code, engage with donors, and make a bigger impact to move up the leaderboard!
                </p>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg"
                  >
                    <Star className="mr-2 h-5 w-5" />
                    Back to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
