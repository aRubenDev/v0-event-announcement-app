"use client"

import { useState } from "react"

interface Announcement {
  id: string
  title: string
  message: string
  groupName: string
  sentAt: Date
}

export function MemberView() {
  // Demo announcements
  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Welcome to our event group",
      message: "You have been added to the event announcements group. All important updates will be sent here.",
      groupName: "Tech Conference 2025",
      sentAt: new Date(Date.now() - 86400000),
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-8 py-8">
          <div>
            <h1 className="text-3xl font-light text-foreground">Announcements</h1>
            <p className="text-sm text-muted-foreground mt-1">Event notifications</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="space-y-6">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No announcements yet</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="border border-border rounded-md p-6 space-y-3 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-foreground">{announcement.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {announcement.groupName} • {announcement.sentAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{announcement.message}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
