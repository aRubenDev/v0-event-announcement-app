"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SendAnnouncementModalProps {
  groupId: string
  onClose: () => void
  onSendAnnouncement: (title: string, message: string, groupId: string) => void
}

export function SendAnnouncementModal({ groupId, onClose, onSendAnnouncement }: SendAnnouncementModalProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    if (!title.trim() || !message.trim()) return
    onSendAnnouncement(title, message, groupId)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-md max-w-md w-full p-8 space-y-6">
        <div>
          <h2 className="text-xl font-light text-foreground">Send Announcement</h2>
          <p className="text-sm text-muted-foreground mt-1">Create a new event notification</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-foreground mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event update"
              className="w-full px-4 py-2 text-sm bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement here..."
              rows={6}
              className="w-full px-4 py-2 text-sm bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 text-foreground border-border hover:bg-muted bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
