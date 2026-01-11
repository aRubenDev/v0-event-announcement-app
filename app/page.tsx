"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { AdminDashboard } from "@/components/admin-dashboard"
import { MemberView } from "@/components/member-view"

type UserRole = "admin" | "member" | null

export default function Home() {
  const [role, setRole] = useState<UserRole>(null)

  if (!role) {
    return <LoginPage onLogin={(userRole) => setRole(userRole)} />
  }

  return role === "admin" ? <AdminDashboard /> : <MemberView />
}
