"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface LeaderboardSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function LeaderboardSearch({ searchTerm, onSearchChange }: LeaderboardSearchProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
        <Input
          type="text"
          placeholder="Search by name or referral code..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/80 border-purple-200 focus:border-purple-500"
        />
      </div>
    </div>
  )
}
