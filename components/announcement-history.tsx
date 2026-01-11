"use client"

interface DeliveryStatus {
  email: string
  status: "delivered" | "pending"
}

interface Announcement {
  id: string
  groupId: string
  groupName: string
  title: string
  message: string
  sentAt: Date
  deliveryStatus: Record<string, "delivered" | "pending">
}

interface AnnouncementHistoryProps {
  announcements: Announcement[]
  selectedGroupId: string | null
}

export function AnnouncementHistory({ announcements, selectedGroupId }: AnnouncementHistoryProps) {
  const filtered = selectedGroupId ? announcements.filter((a) => a.groupId === selectedGroupId) : announcements

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-foreground">
        {selectedGroupId ? "Recent Announcements" : "All Announcements"}
      </h3>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8">
          {selectedGroupId ? "No announcements sent to this group yet" : "No announcements yet"}
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((announcement) => (
            <div key={announcement.id} className="border border-border rounded-md p-6 space-y-4">
              {/* Announcement Header */}
              <div>
                <h4 className="text-lg font-medium text-foreground">{announcement.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {announcement.groupName} •{" "}
                  {announcement.sentAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Message */}
              <p className="text-sm text-foreground leading-relaxed">{announcement.message}</p>

              {/* Delivery Status */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-foreground mb-3">Delivery Status</p>
                <div className="space-y-2">
                  {Object.entries(announcement.deliveryStatus).map(([email, status]) => (
                    <div key={email} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{email}</span>
                      <span
                        className={
                          status === "delivered"
                            ? "text-green-600 dark:text-green-400"
                            : "text-yellow-600 dark:text-yellow-400"
                        }
                      >
                        {status === "delivered" ? "✓ Delivered" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
