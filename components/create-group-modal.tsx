"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CreateGroupModalProps {
  onClose: () => void
  onCreateGroup: (name: string, members: string[]) => void
}

export function CreateGroupModal({ onClose, onCreateGroup }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("")
  const [membersText, setMembersText] = useState("")

  const handleSubmit = () => {
    if (!groupName.trim()) return

    const members = membersText
      .split("\n")
      .map((email) => email.trim())
      .filter((email) => email && email.includes("@"))

    if (members.length === 0) return

    onCreateGroup(groupName, members)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-md max-w-md w-full p-8 space-y-6">
        <div>
          <h2 className="text-xl font-light text-foreground">Create Group</h2>
          <p className="text-sm text-muted-foreground mt-1">Add a new announcement group</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-foreground mb-2">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Tech Conference 2025"
              className="w-full px-4 py-2 text-sm bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Members (one email per line)</label>
            <textarea
              value={membersText}
              onChange={(e) => setMembersText(e.target.value)}
              placeholder="alice@example.com&#10;bob@example.com"
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
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
