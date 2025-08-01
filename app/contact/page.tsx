"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent Successfully! 📧",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    })
    setErrors({})
    setIsSubmitting(false)
  }

  const faqs = [
    {
      question: "How do I start fundraising on Fundify?",
      answer:
        "Simply create an account, complete your profile, and launch your first campaign. Our step-by-step guide will help you through the process.",
    },
    {
      question: "What percentage does Fundify take from donations?",
      answer:
        "We keep only 5% of donations to cover platform costs and payment processing. 95% goes directly to your cause.",
    },
    {
      question: "How long does it take to receive funds?",
      answer:
        "Funds are typically transferred to your account within 3-5 business days after the campaign ends or reaches its goal.",
    },
    {
      question: "Can I edit my campaign after it's published?",
      answer:
        "Yes, you can edit your campaign description, add updates, and modify goals. However, some changes may require approval.",
    },
    {
      question: "Is there a minimum or maximum fundraising goal?",
      answer:
        "The minimum goal is ₹10,000 and there's no maximum limit. We encourage setting realistic, achievable goals.",
    },
    {
      question: "How do I track my campaign's progress?",
      answer:
        "Your dashboard provides real-time analytics, donor information, and detailed progress tracking for all your campaigns.",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Transparency */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: `url(/images/customer-support.png)`,
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
            <Link
              href="/donate"
              className="text-purple-700 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-purple-100"
            >
              Donate
            </Link>
            <Link href="/contact" className="text-purple-600 font-semibold px-4 py-2 rounded-full bg-purple-100">
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
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              Have questions, suggestions, or need support? We're here to help you make the most of your fundraising
              journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
            {/* Contact Form - Centered */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-3xl">
                    <MessageSquare className="h-8 w-8 text-purple-600" />
                    <span className="text-purple-800">Send us a Message</span>
                  </CardTitle>
                  <CardDescription className="text-lg text-purple-600">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
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
                          placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-purple-800 mb-2 block">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Subject and Category */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="subject" className="text-purple-800 mb-2 block">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                          placeholder="Brief subject of your message"
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                      </div>
                      <div>
                        <Label className="text-purple-800 mb-2 block">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing & Payments</SelectItem>
                            <SelectItem value="campaign">Campaign Help</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message" className="text-purple-800 mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-white/80 border-purple-200 focus:border-purple-500 rounded-xl"
                        placeholder="Please describe your inquiry in detail..."
                        rows={6}
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information - Centered */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Phone className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-800">Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-xl">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-1">Email</h4>
                      <p className="text-purple-700">support@fundify.com</p>
                      <p className="text-purple-700">partnerships@fundify.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-3 rounded-xl">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-1">Phone</h4>
                      <p className="text-purple-700">+91 98765 43210</p>
                      <p className="text-purple-700">+91 87654 32109</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-1">Address</h4>
                      <p className="text-purple-700">
                        123 Innovation Hub
                        <br />
                        Tech Park, Bangalore
                        <br />
                        Karnataka 560001, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-600 to-violet-700 p-3 rounded-xl">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-1">Business Hours</h4>
                      <p className="text-purple-700">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Support */}
              <Card className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 shadow-2xl rounded-3xl card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <HelpCircle className="mr-2 h-6 w-6" />
                    Need Quick Help?
                  </h3>
                  <p className="text-purple-100 mb-4">
                    Check out our comprehensive help center for instant answers to common questions.
                  </p>
                  <Button size="sm" className="bg-white text-purple-600 hover:bg-purple-50 rounded-full">
                    Visit Help Center
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section - Centered */}
          <div>
            <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-lg shadow-2xl border-purple-200 rounded-3xl card-hover"
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800 flex items-start space-x-3">
                      <HelpCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-700 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
