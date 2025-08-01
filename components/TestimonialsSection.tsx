"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Arjun Patel",
      role: "Top Fundraiser",
      content:
        "Fundify has transformed how I approach fundraising. The platform is intuitive and the community support is incredible!",
      rating: 5,
      image: "young Indian man in professional attire smiling confidently",
    },
    {
      name: "Meera Singh",
      role: "Community Leader",
      content:
        "I've raised over ₹50,000 through Fundify. The tracking tools and leaderboard keep me motivated every day.",
      rating: 5,
      image: "professional Indian woman with warm smile in business casual",
    },
    {
      name: "Rohit Kumar",
      role: "Social Impact Intern",
      content:
        "The referral system is brilliant! It's amazing to see how my network has grown and the impact we're creating together.",
      rating: 5,
      image: "enthusiastic young Indian man with glasses and friendly expression",
    },
  ]

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-purple-800 mb-12">What Our Champions Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-purple-200"
          >
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-purple-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center justify-center space-x-3">
                <Image
                  src={`/placeholder.svg?height=48&width=48&query=${testimonial.image}`}
                  alt={`${testimonial.name} testimonial`}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-purple-300"
                />
                <div>
                  <p className="font-semibold text-purple-800">{testimonial.name}</p>
                  <p className="text-sm text-purple-600">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
