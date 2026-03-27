"use client"

import { useState } from "react"
import { Search, List, Map, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/events-data"
import { cn } from "@/lib/utils"

interface MapHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  viewMode: "map" | "list"
  onViewModeChange: (mode: "map" | "list") => void
  totalEvents: number
}

export function MapHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  totalEvents,
}: MapHeaderProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="absolute left-0 right-0 top-0 z-[1000]">
      <div className="bg-[#1A3A6E] backdrop-blur-md">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-10 border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/60"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-white/60 hover:text-white" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-10 w-10 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white",
                showFilters && "bg-white text-[#1A3A6E]"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <div className="flex h-10 overflow-hidden rounded-lg border border-white/20 bg-white/10">
              <button
                onClick={() => onViewModeChange("map")}
                className={cn(
                  "flex items-center justify-center px-3 transition-colors",
                  viewMode === "map"
                    ? "bg-white text-[#1A3A6E]"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Map className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "flex items-center justify-center px-3 transition-colors",
                  viewMode === "list"
                    ? "bg-white text-[#1A3A6E]"
                    : "text-white/60 hover:text-white"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-white text-[#1A3A6E]"
                        : "bg-white/20 text-white hover:bg-white/30"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/20 bg-[#152E56] px-4 py-2">
          <span className="text-sm text-white/80">
            <span className="font-semibold text-white">{totalEvents}</span> events near you
          </span>
          <span className="text-xs text-white/60">Dublin, Ireland</span>
        </div>
      </div>
    </div>
  )
}
