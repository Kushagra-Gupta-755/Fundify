"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, CreditCard, Smartphone, Building2, Shield, CheckCircle, Users, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DonatePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const [selectedAmount, setSelectedAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    referralCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const campaigns = [
    {
      id: "education",
      title: "Education for Rural Children",
      description: "Providing quality education resources to underprivileged children in rural areas",
      raised: 245000,
      goal: 500000,
      donors: 1247,
      daysLeft: 23,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "water",
      title: "Clean Water Initiative",
      description: "Installing water purification systems in remote villages",
      raised: 180000,
      goal: 350000,
      donors: 892,
      daysLeft: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "healthcare",
      title: "Medical Aid for Elderly",
      description: "Providing healthcare support for senior citizens",
      raised: 95000,
      goal: 200000,
      donors: 456,
      daysLeft: 67,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "environment",
      title: "Tree Plantation Drive",
      description: "Planting trees to combat climate change and restore ecosystems",
      raised: 75000,
      goal: 150000,
      donors: 623,
      daysLeft: 30,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const predefinedAmounts = ["500", "1000", "2500", "5000", "10000"]

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedAmount && !customAmount) {
      newErrors.amount = "Please select or enter a donation amount"
    }

    if (customAmount && (isNaN(Number(customAmount)) || Number(customAmount) < 100)) {
      newErrors.amount = "Custom amount must be at least ₹100"
    }

    if (!selectedCampaign) {
      newErrors.campaign = "Please select a campaign to support"
    }

    if (!isAnonymous) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      })
      return
    }

    const donationAmount = selectedAmount || customAmount
    const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign)

    toast({
      title: "Donation Successful! 🎉",
      description: `Thank you for donating ₹${Number(donationAmount).toLocaleString()} to ${selectedCampaignData?.title}. Your contribution will make a real difference!`,
    })

    // Reset form
    setSelectedAmount("")
    setCustomAmount("")
    setSelectedCampaign("")
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      referralCode: "",
    })
    setIsAnonymous(false)
    setErrors({})
  }

  const getDonationAmount = () => {
    return selectedAmount || customAmount
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Transparency */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(/images/hands-background.png)`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50" />

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
            <Link
              href="/about"
              className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
            >
              About
            </Link>
            <Link href="/donate" className="text-purple-600 font-semibold px-4 py-2 rounded-full bg-purple-100">
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
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Make a Difference Today
            </h1>
            <p className="text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              Your donation can change lives. Choose a cause you care about and see the direct impact of your
              contribution.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Donation Form - Centered */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-3xl">
                    <Heart className="h-8 w-8 text-purple-600" />
                    <span className="text-purple-800">Donation Form</span>
                  </CardTitle>
                  <CardDescription className="text-lg text-purple-600">
                    Fill out the form below to make your donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Campaign Selection */}
                    <div>
                      <Label className="text-lg font-semibold text-purple-800 mb-4 block">
                        Select Campaign to Support *
                      </Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {campaigns.map((campaign) => (
                          <div
                            key={campaign.id}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                              selectedCampaign === campaign.id
                                ? "border-purple-500 bg-purple-50"
                                : "border-purple-200 bg-white hover:border-purple-300"
                            }`}
                            onClick={() => setSelectedCampaign(campaign.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-4 h-4 rounded-full border-2 border-purple-500 mt-1 flex items-center justify-center">
                                {selectedCampaign === campaign.id && (
                                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-purple-800 mb-1">{campaign.title}</h4>
                                <p className="text-sm text-purple-600 mb-2">{campaign.description}</p>
                                <div className="flex items-center justify-between text-xs text-purple-500">
                                  <span>₹{campaign.raised.toLocaleString()} raised</span>
                                  <span>{campaign.donors} donors</span>
                                </div>
                                <Progress value={(campaign.raised / campaign.goal) * 100} className="h-1 mt-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.campaign && <p className="text-red-500 text-sm mt-2">{errors.campaign}</p>}
                    </div>

                    {/* Amount Selection */}
                    <div>
                      <Label className="text-lg font-semibold text-purple-800 mb-4 block">Donation Amount *</Label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                        {predefinedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className={`rounded-xl py-3 ${
                              selectedAmount === amount
                                ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                                : "border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                            }`}
                            onClick={() => {
                              setSelectedAmount(amount)
                              setCustomAmount("")
                            }}
                          >
                            ₹{Number(amount).toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="customAmount" className="text-purple-800 mb-2 block">
                          Or enter custom amount
                        </Label>
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="Enter amount in ₹"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setSelectedAmount("")
                          }}
                          className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                        />
                      </div>
                      {errors.amount && <p className="text-red-500 text-sm mt-2">{errors.amount}</p>}
                    </div>

                    {/* Anonymous Donation */}
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={setIsAnonymous}
                        className="border-purple-300"
                      />
                      <Label htmlFor="anonymous" className="text-purple-800">
                        Make this donation anonymous
                      </Label>
                    </div>

                    {/* Personal Information */}
                    {!isAnonymous && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-purple-800">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-purple-800 mb-2 block">
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                              placeholder="Enter your full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-purple-800 mb-2 block">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                              placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-purple-800 mb-2 block">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    )}

                    {/* Optional Fields */}
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="referralCode" className="text-purple-800 mb-2 block">
                          Referral Code (Optional)
                        </Label>
                        <Input
                          id="referralCode"
                          value={formData.referralCode}
                          onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                          className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                          placeholder="Enter referral code if you have one"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-purple-800 mb-2 block">
                          Message (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                          placeholder="Leave a message of support..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label className="text-lg font-semibold text-purple-800 mb-4 block">Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3 p-4 border-2 border-purple-200 rounded-xl">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                              <CreditCard className="h-5 w-5 text-purple-600" />
                              <span>Credit/Debit Card</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border-2 border-purple-200 rounded-xl">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer">
                              <Smartphone className="h-5 w-5 text-purple-600" />
                              <span>UPI</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border-2 border-purple-200 rounded-xl">
                            <RadioGroupItem value="netbanking" id="netbanking" />
                            <Label htmlFor="netbanking" className="flex items-center space-x-2 cursor-pointer">
                              <Building2 className="h-5 w-5 text-purple-600" />
                              <span>Net Banking</span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Heart className="mr-3 h-5 w-5" />
                      Donate {getDonationAmount() ? `₹${Number(getDonationAmount()).toLocaleString()}` : ""}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Centered */}
            <div className="space-y-6">
              {/* Security Info */}
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Shield className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Secure Donation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-purple-700">SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-purple-700">PCI Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-purple-700">100% Secure</span>
                  </div>
                  <p className="text-sm text-purple-600 mt-4">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </CardContent>
              </Card>

              {/* Impact Info */}
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Target className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Your Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-800 mb-1">₹500</div>
                    <div className="text-sm text-purple-600">Can provide school supplies for 5 children</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-800 mb-1">₹1,000</div>
                    <div className="text-sm text-purple-600">Can fund clean water for a family for 6 months</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-800 mb-1">₹2,500</div>
                    <div className="text-sm text-purple-600">Can provide medical care for 10 elderly people</div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Donations */}
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Users className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Recent Donations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-purple-800">Priya S.</div>
                      <div className="text-xs text-purple-600">2 hours ago</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">₹2,500</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-purple-800">Anonymous</div>
                      <div className="text-xs text-purple-600">5 hours ago</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">₹5,000</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-purple-800">Rahul K.</div>
                      <div className="text-xs text-purple-600">1 day ago</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">₹1,500</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
