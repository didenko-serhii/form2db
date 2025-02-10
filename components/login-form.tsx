// components/login-form.tsx
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

export function LoginForm({ user, onSuccess, className, ...props }) {
  const [email, setEmail] = useState(user ? user.email : "")
  const [password, setPassword] = useState(user ? user.password : "")

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      setPassword(user.password)
    } else {
      setEmail("")
      setPassword("")
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user && user.id) {
      await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
    } else {
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
    }
    if (onSuccess) onSuccess()
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{user ? "Update user" : "Login to your account"}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {user ? "Update user details" : "Enter your email below to login to your account"}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">
          {user ? "Update" : "Login"}
        </Button>
      </div>
    </form>
  )
}