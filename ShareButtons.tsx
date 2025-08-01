"use client"

import { Button } from "@/components/ui/button"
import { Share2, MessageCircle } from "lucide-react"
import { toast } from "react-toastify"

interface ShareButtonsProps {
  referralCode: string
  userName: string
}

export default function ShareButtons({ referralCode, userName }: ShareButtonsProps) {
  const shareMessage = `🌟 Join me in making a difference! I'm fundraising with Fundify and would love your support. Use my referral code: ${referralCode} to donate and track the impact we're making together! 💜 #Fundify #MakeADifference`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    toast.success("Referral code copied to clipboard!")
  }

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`
    window.open(url, "_blank")
    copyToClipboard()
  }

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`
    window.open(url, "_blank")
    copyToClipboard()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button onClick={shareWhatsApp} className="bg-green-600 hover:bg-green-700 text-white flex-1">
        <MessageCircle className="h-4 w-4 mr-2" />
        Share on WhatsApp
      </Button>
      <Button onClick={shareTwitter} className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
        <Share2 className="h-4 w-4 mr-2" />
        Share on Twitter
      </Button>
    </div>
  )
}
