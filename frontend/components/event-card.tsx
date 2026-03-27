"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin, Users, X } from "lucide-react"
import { Event, categoryColors } from "@/lib/events-data"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  event: Event
  onClose: () => void
}

export function EventCard({ event, onClose }: EventCardProps) {
  const categoryColor = categoryColors[event.category] || "#1A3A6E"
  const initial = event.organizer.charAt(0).toUpperCase()

  return (
    <div className="absolute bottom-4 left-4 right-4 z-[1000] md:left-auto md:right-4 md:w-96">
      <div className="overflow-hidden rounded-xl bg-card shadow-2xl">
        <div className="relative h-40">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
          <div className="absolute bottom-2 left-2">
            <span 
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {event.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          {/* Organizer info with rounded square letter logo */}
          <div className="mb-3 flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {initial}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hosted by</p>
              <p className="text-sm font-semibold text-foreground">{event.organizer}</p>
            </div>
          </div>

          <h3 className="mb-2 text-lg font-bold text-foreground">{event.title}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{event.description}</p>

          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" style={{ color: categoryColor }} />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" style={{ color: categoryColor }} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" style={{ color: categoryColor }} />
                <span>{event.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" style={{ color: categoryColor }} />
              <span>{event.attendees.toLocaleString()} attending</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1 text-white hover:opacity-90"
              style={{ backgroundColor: categoryColor }}
            >
              Join Event
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
