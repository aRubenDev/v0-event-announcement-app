"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LoginPageProps {
  onLogin: (role: "admin" | "member") => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")

  const handleAdminLogin = () => {
    if (email.includes("admin")) {
      onLogin("admin")
    }
  }

  const handleMemberLogin = () => {
    if (email) {
      onLogin("member")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-light tracking-tight text-foreground">Announcements</h1>
            <p className="text-sm text-muted-foreground">Event notification system</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-card border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />

            <div className="space-y-3">
              <Button
                onClick={handleAdminLogin}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Admin Login
              </Button>
              <Button
                onClick={handleMemberLogin}
                variant="outline"
                className="w-full text-foreground border-border hover:bg-muted bg-transparent"
              >
                Member Login
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground">
            Demo: Use 'admin' in email for admin access, any email for member access
          </p>
        </div>
      </div>
    </div>
  )
}
