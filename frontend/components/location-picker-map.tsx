"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Props {
  lat: number | null
  lng: number | null
  onPick: (lat: number, lng: number) => void
}

export function LocationPickerMap({ lat, lng, onPick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [53.3438, -6.2546],
      zoom: 15,
    })

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    ).addTo(map)

    map.on("click", (e) => {
      const { lat, lng } = e.latlng
      onPick(lat, lng)

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(map)
      }
    })

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // update marker if props change
  useEffect(() => {
    if (!mapInstanceRef.current || lat == null || lng == null) return

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng])
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current)
    }
  }, [lat, lng])

  return <div ref={mapRef} className="h-48 w-full rounded-lg" />
}