"use client"

import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"
import { Event, categoryColors } from "@/lib/events-data"
import { cn } from "@/lib/utils"

interface EventsListProps {
  events: Event[]
  selectedEvent: Event | null
  onEventSelect: (event: Event) => void
}

export function EventsList({ events, selectedEvent, onEventSelect }: EventsListProps) {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="space-y-3 p-4">
        {events.map((event) => {
          const categoryColor = categoryColors[event.category] || "#1A3A6E"
          const initial = event.organizer.charAt(0).toUpperCase()
          
          return (
            <button
              key={event.id}
              onClick={() => onEventSelect(event)}
              className={cn(
                "group w-full overflow-hidden rounded-xl bg-card text-left transition-all hover:ring-2",
                selectedEvent?.id === event.id ? "ring-2" : ""
              )}
              style={{
                borderColor: categoryColor,
                boxShadow: selectedEvent?.id === event.id ? `0 0 0 2px ${categoryColor}` : undefined,
              }}
            >
              <div className="flex gap-3 p-3">
                {/* Society Letter Logo */}
                <div 
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white"
                  style={{ backgroundColor: categoryColor }}
                >
                  {initial}
                </div>
                
                {/* Event thumbnail */}
                <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-1 flex-col justify-between py-0.5">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span 
                        className="rounded px-2 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {event.category}
                      </span>
                    </div>
                    <h4 className="line-clamp-1 text-sm font-semibold text-foreground">
                      {event.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{event.organizer}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" style={{ color: categoryColor }} />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" style={{ color: categoryColor }} />
                      {event.date}
                    </span>
                  </div>
                </div>
                
                {/* Attendees count */}
                <div className="flex flex-col items-center justify-center px-2">
                  <Users className="h-4 w-4 mb-1" style={{ color: categoryColor }} />
                  <span className="text-xs font-semibold" style={{ color: categoryColor }}>
                    {event.attendees > 999 ? `${(event.attendees / 1000).toFixed(1)}k` : event.attendees}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
