"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-08-05T23:59:59").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-6 rounded-2xl shadow-xl">
      <div className="flex items-center justify-center mb-4">
        <Clock className="h-6 w-6 mr-2" />
        <h3 className="text-xl font-bold">Campaign Deadline</h3>
      </div>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-sm opacity-80">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm opacity-80">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm opacity-80">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm opacity-80">Seconds</div>
        </div>
      </div>
    </div>
  )
}
