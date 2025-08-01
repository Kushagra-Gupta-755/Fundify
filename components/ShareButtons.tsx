"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, MessageCircle, Mail } from "lucide-react"

interface ShareButtonsProps {
  referralCode: string
  userName: string
}

export default function ShareButtons({ referralCode, userName }: ShareButtonsProps) {
  const shareText = `Join me in making a difference! Use my referral code ${referralCode} to support amazing causes on Fundify. Together we can create positive change! 🌟`
  const shareUrl = `https://fundify.org?ref=${referralCode}`

  const handleShare = (platform: string) => {
    let url = ""

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
        break
      case "email":
        url = `mailto:?subject=${encodeURIComponent("Join me on Fundify!")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`
        break
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => handleShare("facebook")}
        variant="secondary"
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white border-0"
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button
        onClick={() => handleShare("twitter")}
        variant="secondary"
        size="sm"
        className="bg-sky-500 hover:bg-sky-600 text-white border-0"
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button
        onClick={() => handleShare("whatsapp")}
        variant="secondary"
        size="sm"
        className="bg-green-600 hover:bg-green-700 text-white border-0"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
      <Button
        onClick={() => handleShare("email")}
        variant="secondary"
        size="sm"
        className="bg-gray-600 hover:bg-gray-700 text-white border-0"
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
    </div>
  )
}
