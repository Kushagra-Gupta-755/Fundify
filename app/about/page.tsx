"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Target, Award, Globe, Lightbulb, Shield, TrendingUp, CheckCircle, Star } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
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

      const gradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient1.addColorStop(0, "rgba(196, 181, 253, 0.1)")
      gradient1.addColorStop(1, "rgba(147, 51, 234, 0.05)")

      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient2.addColorStop(0, "rgba(167, 139, 250, 0.08)")
      gradient2.addColorStop(1, "rgba(124, 58, 237, 0.03)")

      const gradient3 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient3.addColorStop(0, "rgba(139, 92, 246, 0.06)")
      gradient3.addColorStop(1, "rgba(109, 40, 217, 0.02)")

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

  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      description: "Passionate about social impact and technology innovation",
      avatar: 1,
    },
    {
      name: "Rahul Kumar",
      role: "CTO",
      description: "Building scalable platforms for positive change",
      avatar: 0,
    },
    {
      name: "Ananya Singh",
      role: "Head of Operations",
      description: "Ensuring smooth operations and user experience",
      avatar: 7,
    },
    {
      name: "Vikram Patel",
      role: "Marketing Director",
      description: "Spreading awareness about our mission worldwide",
      avatar: 5,
    },
  ]

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
            <Link href="/about" className="text-purple-600 font-semibold px-4 py-2 rounded-full bg-purple-100">
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

        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Hero Section - Centered */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              About Fundify
            </h1>
            <p className="text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              Empowering the next generation of changemakers through innovative fundraising technology and
              community-driven impact.
            </p>
          </div>

          {/* Mission & Vision - Centered */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-3xl">
                  <Target className="h-8 w-8 text-purple-600" />
                  <span className="text-purple-800">Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-purple-700 leading-relaxed">
                  To democratize fundraising by providing young changemakers with the tools, platform, and community
                  they need to create meaningful social impact. We believe every intern has the potential to drive
                  positive change in the world.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-3xl">
                  <Lightbulb className="h-8 w-8 text-purple-600" />
                  <span className="text-purple-800">Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-purple-700 leading-relaxed">
                  A world where passionate individuals can easily mobilize resources for causes they care about,
                  creating a global network of empowered fundraisers who collectively address society's most pressing
                  challenges.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Features - Centered */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Why Choose Fundify?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-800">Community Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700 text-center leading-relaxed">
                    Join a vibrant community of like-minded individuals working together to create positive change
                    through collaborative fundraising efforts.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-800">Real-Time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700 text-center leading-relaxed">
                    Track your impact with beautiful, real-time analytics and insights that help you understand and
                    optimize your fundraising performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-800">Secure & Transparent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700 text-center leading-relaxed">
                    Built with bank-level security and complete transparency, ensuring every donation reaches its
                    intended cause safely and efficiently.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section with Group Image - Centered */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Meet Our Team</h2>

            {/* Team Group Image */}
            <div className="text-center mb-12">
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <Image
                    src="/images/team-group.png"
                    alt="Our diverse and passionate team working together"
                    width={800}
                    height={400}
                    className="rounded-2xl mx-auto"
                  />
                  <p className="text-purple-700 mt-6 text-lg leading-relaxed">
                    Our diverse team of passionate individuals working together to create positive change through
                    innovative fundraising solutions.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Individual Team Members */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover"
                >
                  <CardHeader className="text-center">
                    <div
                      className="w-24 h-24 rounded-full border-4 border-purple-300 bg-cover bg-center mx-auto mb-4"
                      style={{
                        backgroundImage: `url(/images/avatars.png)`,
                        backgroundPosition: `${getAvatarPosition(member.avatar).x}px ${getAvatarPosition(member.avatar).y}px`,
                        backgroundSize: "600px 600px",
                      }}
                    />
                    <CardTitle className="text-xl text-purple-800">{member.name}</CardTitle>
                    <CardDescription className="text-purple-600 font-semibold">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-700 text-center text-sm leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section - Centered */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Transparency</h3>
                    <p className="text-purple-700">
                      We believe in complete openness about how funds are used and the impact they create.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-3 rounded-xl">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Empathy</h3>
                    <p className="text-purple-700">
                      Understanding and addressing the real needs of communities we serve.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Excellence</h3>
                    <p className="text-purple-700">
                      Striving for the highest standards in everything we do and deliver.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-600 to-violet-700 p-3 rounded-xl">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Global Impact</h3>
                    <p className="text-purple-700">
                      Creating positive change that transcends borders and transforms lives worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Community</h3>
                    <p className="text-purple-700">
                      Building strong, supportive networks that amplify individual efforts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-800 p-3 rounded-xl">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Innovation</h3>
                    <p className="text-purple-700">
                      Continuously improving our platform with cutting-edge technology and user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics - Centered */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 shadow-2xl rounded-3xl card-hover max-w-6xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-center mb-12">Our Impact So Far</h2>
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">₹2.5M+</div>
                    <div className="text-purple-100">Total Funds Raised</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">5,000+</div>
                    <div className="text-purple-100">Active Fundraisers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">150+</div>
                    <div className="text-purple-100">Campaigns Launched</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">25,000+</div>
                    <div className="text-purple-100">Lives Impacted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action - Centered */}
          <div className="text-center">
            <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-4xl font-bold text-purple-800 mb-6">Ready to Make a Difference?</h3>
                <p className="text-xl text-purple-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of passionate individuals who are already creating positive change through Fundify.
                  Start your fundraising journey today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/donate">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Heart className="mr-3 h-5 w-5" />
                      Start Donating
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Star className="mr-3 h-5 w-5" />
                      Join as Fundraiser
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
