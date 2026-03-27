"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { events as allEvents, Event } from "@/lib/events-data"
import { EventCard } from "@/components/event-card"
import { EventsList } from "@/components/events-list"
import { MapHeader } from "@/components/map-header"

// Dynamically import the map component to avoid SSR issues with Leaflet
const EventMap = dynamic(
  () => import("@/components/event-map").then((mod) => mod.EventMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
)

export default function EventsMapPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleEventSelect = (event: Event | null) => {
    setSelectedEvent(event)
    if (event && viewMode === "list") {
      setViewMode("map")
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <MapHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalEvents={filteredEvents.length}
      />

      {viewMode === "map" ? (
        <div className="h-full pt-[120px]">
          <EventMap
            events={filteredEvents}
            onEventSelect={handleEventSelect}
            selectedEvent={selectedEvent}
          />
        </div>
      ) : (
        <div className="h-full pt-[120px]">
          <EventsList
            events={filteredEvents}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
          />
        </div>
      )}

      {selectedEvent && viewMode === "map" && (
        <EventCard
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </main>
  )
}
