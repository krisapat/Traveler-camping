"use client"

import { SignOutButton } from "@clerk/nextjs"
import { Button } from "../../../ui/button"
import { toast } from "sonner"
import { LogOut } from "lucide-react"

const SignOutLinks = () => {
  const handleLogout = () => {
    toast("Logout", {
      description: "You have successfully logged out.",
    })
  }
  return (
    <SignOutButton redirectUrl="/">
      <Button
        className="w-full text-left"
        variant="outline"
        onClick={handleLogout}
      >
        Logout<LogOut />
      </Button>
    </SignOutButton>
  )
}
export default SignOutLinks

