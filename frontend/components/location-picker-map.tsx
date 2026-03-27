"use client"
import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

interface Props {
  lat: number | null
  lng: number | null
  onPick: (lat: number, lng: number) => void
}

export function LocationPickerMap({ lat, lng, onPick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let aborted = false

    const initMap = async () => {
      const L = await import("leaflet")
      if (aborted || !mapRef.current) return

      if ((mapRef.current as any)._leaflet_id) {
        (mapRef.current as any)._leaflet_id = null
      }

      const map = L.map(mapRef.current, {
        center: [53.3438, -6.2546],
        zoom: 15,
      })

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      ).addTo(map)

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng
        onPick(lat, lng)
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng])
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(map)
        }
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      aborted = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      if (mapRef.current) {
        (mapRef.current as any)._leaflet_id = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || lat == null || lng == null) return

    const updateMarker = async () => {
      const L = await import("leaflet")
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current)
      }
    }

    updateMarker()
  }, [lat, lng])

  return <div ref={mapRef} className="h-48 w-full rounded-lg" />
}