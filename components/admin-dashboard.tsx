"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateGroupModal } from "@/components/create-group-modal"
import { SendAnnouncementModal } from "@/components/send-announcement-modal"
import { GroupList } from "@/components/group-list"
import { AnnouncementHistory } from "@/components/announcement-history"

interface Group {
  id: string
  name: string
  members: string[]
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

export function AdminDashboard() {
  const [groups, setGroups] = useState<Group[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showSendAnnouncement, setShowSendAnnouncement] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const handleCreateGroup = (name: string, members: string[]) => {
    const newGroup: Group = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      members,
    }
    setGroups([...groups, newGroup])
    setShowCreateGroup(false)
  }

  const handleSendAnnouncement = (title: string, message: string, groupId: string) => {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return

    const deliveryStatus: Record<string, "delivered" | "pending"> = {}
    group.members.forEach((member) => {
      deliveryStatus[member] = "delivered"
    })

    const announcement: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      groupId,
      groupName: group.name,
      title,
      message,
      sentAt: new Date(),
      deliveryStatus,
    }

    setAnnouncements([announcement, ...announcements])
    setShowSendAnnouncement(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-foreground">Announcements</h1>
              <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateGroup(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Group
              </Button>
              <Button
                onClick={() => setShowSendAnnouncement(true)}
                disabled={!selectedGroup}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Send Announcement
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <GroupList groups={groups} selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            <AnnouncementHistory announcements={announcements} selectedGroupId={selectedGroup} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} onCreateGroup={handleCreateGroup} />
      )}

      {showSendAnnouncement && selectedGroup && (
        <SendAnnouncementModal
          groupId={selectedGroup}
          onClose={() => setShowSendAnnouncement(false)}
          onSendAnnouncement={handleSendAnnouncement}
        />
      )}
    </div>
  )
}
