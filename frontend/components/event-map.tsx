"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Event, categoryColors } from "@/lib/events-data"

interface EventMapProps {
  events: Event[]
  onEventSelect: (event: Event | null) => void
  selectedEvent: Event | null
}

export function EventMap({ events, onEventSelect, selectedEvent }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [40.7128, -74.006],
      zoom: 12,
      zoomControl: false,
    })

    // Vibrant colorful map tile layer (Carto Voyager)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map)

    // Add zoom controls to bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    // Add markers for each event
    events.forEach((event) => {
      const isSelected = selectedEvent?.id === event.id
      const markerSize = isSelected ? 60 : 52
      const categoryColor = categoryColors[event.category] || "#607D8B"

      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="marker-wrapper" style="position: relative;">
            <div class="marker-container" style="
              width: ${markerSize}px;
              height: ${markerSize}px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 3px ${categoryColor};
              cursor: pointer;
              transition: all 0.2s ease;
              overflow: hidden;
              ${isSelected ? `transform: scale(1.15); box-shadow: 0 8px 30px rgba(0,0,0,0.35), 0 0 0 4px ${categoryColor};` : ""}
            ">
              <img 
                src="${event.logo}" 
                alt="${event.organizer}"
                style="
                  width: ${markerSize - 12}px;
                  height: ${markerSize - 12}px;
                  border-radius: 50%;
                  object-fit: cover;
                "
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <div style="
                display: none;
                width: ${markerSize - 12}px;
                height: ${markerSize - 12}px;
                border-radius: 50%;
                background: ${categoryColor};
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                font-size: 16px;
              ">${event.organizer.charAt(0)}</div>
            </div>
            <div class="marker-pulse" style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: ${markerSize + 20}px;
              height: ${markerSize + 20}px;
              background: ${categoryColor};
              border-radius: 50%;
              opacity: 0.2;
              z-index: -1;
              ${isSelected ? "animation: pulse 1.5s ease-out infinite;" : ""}
            "></div>
          </div>
        `,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2],
      })

      const marker = L.marker([event.lat, event.lng], { icon })
        .addTo(map)
        .on("click", () => {
          onEventSelect(event)
        })
        .on("mouseover", () => {
          setHoveredEvent(event)
        })
        .on("mouseout", () => {
          setHoveredEvent(null)
        })

      // Add tooltip for hover
      const tooltipContent = `
        <div style="
          background: white;
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          min-width: 220px;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <img 
              src="${event.logo}" 
              alt="${event.organizer}"
              style="width: 32px; height: 32px; border-radius: 8px; object-fit: cover;"
              onerror="this.style.display='none'"
            />
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #1a1a2e;">${event.title}</div>
              <div style="font-size: 11px; color: ${categoryColor}; font-weight: 500;">${event.organizer}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span style="font-size: 12px; color: #666;">${event.location}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span style="font-size: 12px; color: #666;">${event.date} at ${event.time}</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="
              background: ${categoryColor}20;
              color: ${categoryColor};
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
            ">${event.category}</span>
            <span style="font-size: 12px; color: #666;">
              <strong style="color: #1a1a2e;">${event.attendees}</strong> attending
            </span>
          </div>
        </div>
      `

      marker.bindTooltip(tooltipContent, {
        direction: "top",
        offset: [0, -30],
        opacity: 1,
        className: "custom-tooltip",
      })

      markersRef.current.set(event.id, marker)
    })
  }, [events, selectedEvent, onEventSelect])

  // Pan to selected event
  useEffect(() => {
    if (selectedEvent && mapInstanceRef.current) {
      mapInstanceRef.current.panTo([selectedEvent.lat, selectedEvent.lng], {
        animate: true,
        duration: 0.5,
      })
    }
  }, [selectedEvent])

  return (
    <>
      <style jsx global>{`
        .custom-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-tooltip .leaflet-tooltip-content {
          margin: 0;
        }
        .leaflet-tooltip-top:before {
          display: none !important;
        }
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        .custom-marker:hover .marker-container {
          transform: scale(1.1);
        }
      `}</style>
      <div ref={mapRef} className="h-full w-full" />
    </>
  )
}
