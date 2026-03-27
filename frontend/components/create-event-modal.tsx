"use client"

import { useState } from "react"
import { X, Upload, Calendar, Clock, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/events-data"
import { LocationPickerMap } from "./location-picker-map"

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  societyName: string
}

export function CreateEventModal({ isOpen, onClose, societyName }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
  title: "",
  description: "",
  location: "",
  date: "",
  time: "",
  category: "Music",
  image: null as File | null,
  lat: null as number | null,
  lng: null as number | null,
})
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        title: formData.title,
        location: formData.location,
        category: formData.category,

        organizer: societyName,
        date: formData.date,
        time: formData.time,

        attendees: 0,
        image: imagePreview, // base64 for now

        description: formData.description,
        link: "",
        logo: "",

        lat: formData.lat,
        lng: formData.lng,
      }

      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to create event")
      }

      const createdEvent = await res.json()
      console.log("Event created:", createdEvent)

      // optional UX improvement: close modal
      onClose()

      // optional: reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        category: "Music",
        image: null,
        lat: null,
        lng: null,
      })
      setImagePreview(null)

      // optional: refresh page/data
      window.location.reload()
    } catch (err) {
      console.error("Create event failed:", err)
    }
  }

  const filteredCategories = categories.filter(c => c !== "All")
  const societyInitial = societyName.charAt(0).toUpperCase()

  return (
    <div className="fixed inset-0 z-[1002] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-t-2xl bg-card sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Trinity Blue */}
        <div className="flex items-center justify-between bg-[#1A3A6E] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-bold text-white">
              {societyInitial}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Create Event</h2>
              <p className="text-sm text-white/70">{societyName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Event Image
            </label>
            <div 
              className="relative flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors overflow-hidden"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-8 w-8" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Event Title
            </label>
            <Input
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-11"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px] w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFormData({ ...formData, category })}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    formData.category === category
                      ? "bg-[#1A3A6E] text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter venue location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-11 pl-10"
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-11 pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="h-11 pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <LocationPickerMap
            lat={formData.lat}
            lng={formData.lng}
            onPick={(lat, lng) =>
              setFormData((prev) => ({
                ...prev,
                lat,
                lng,
              }))
            }
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-[#1A3A6E] text-white hover:bg-[#1A3A6E]/90 font-semibold"
            >
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
