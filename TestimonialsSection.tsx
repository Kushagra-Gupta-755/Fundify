"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Top Fundraiser",
    content:
      "Fundify has transformed how I approach fundraising. The platform is intuitive and the community support is incredible!",
    image: "professional Indian woman smiling confidently",
    amount: "₹89,750 raised",
  },
  {
    name: "Rahul Kumar",
    role: "Community Leader",
    content:
      "Being part of Fundify has been life-changing. I've not only raised funds but also built meaningful connections with donors.",
    image: "young Indian man in business casual smiling",
    amount: "₹76,230 raised",
  },
  {
    name: "Ananya Singh",
    role: "Impact Creator",
    content:
      "The tools and analytics provided by Fundify help me track my progress and optimize my campaigns effectively.",
    image: "professional young woman with friendly smile",
    amount: "₹68,900 raised",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-8 rounded-3xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">What Our Interns Say</h2>
        <p className="text-purple-600">Hear from our successful fundraising champions</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-purple-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTestimonial}
                className="text-purple-600 hover:text-purple-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Quote className="h-8 w-8 text-purple-400" />
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTestimonial}
                className="text-purple-600 hover:text-purple-800"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Image
                  src={`/placeholder.svg?height=80&width=80&query=${testimonials[currentIndex].image}`}
                  alt={testimonials[currentIndex].name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto border-4 border-purple-200"
                />
              </div>
              <blockquote className="text-lg text-purple-700 mb-6 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div>
                <h4 className="font-bold text-purple-800">{testimonials[currentIndex].name}</h4>
                <p className="text-purple-600">{testimonials[currentIndex].role}</p>
                <p className="text-sm text-green-600 font-semibold mt-1">{testimonials[currentIndex].amount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-purple-600" : "bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
