"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SortAsc, SortDesc } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LeaderboardSearchProps {
  onSearch: (query: string) => void
  onSort: (field: string, direction: "asc" | "desc") => void
}

export default function LeaderboardSearch({ onSearch, onSort }: LeaderboardSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("donations")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleSort = (field: string) => {
    const newDirection = field === sortField && sortDirection === "desc" ? "asc" : "desc"
    setSortField(field)
    setSortDirection(newDirection)
    onSort(field, newDirection)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
        <Input
          placeholder="Search by name or referral code..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-white/80 border-purple-200 focus:border-purple-500"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white/80 border-purple-200 text-purple-700">
            {sortDirection === "desc" ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
            Sort by {sortField === "donations" ? "Amount" : "Name"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSort("donations")}>
            Sort by Amount {sortField === "donations" && (sortDirection === "desc" ? "↓" : "↑")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("name")}>
            Sort by Name {sortField === "name" && (sortDirection === "desc" ? "↓" : "↑")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
