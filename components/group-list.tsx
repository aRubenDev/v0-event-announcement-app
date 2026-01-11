"use client"

interface Group {
  id: string
  name: string
  members: string[]
}

interface GroupListProps {
  groups: Group[]
  selectedGroup: string | null
  onSelectGroup: (groupId: string) => void
}

export function GroupList({ groups, selectedGroup, onSelectGroup }: GroupListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Groups</h3>
      <div className="space-y-2">
        {groups.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No groups yet. Create one to get started.</p>
        ) : (
          groups.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                selectedGroup === group.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              <p className="font-medium text-sm">{group.name}</p>
              <p className="text-xs mt-1">
                {group.members.length} member
                {group.members.length !== 1 ? "s" : ""}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
