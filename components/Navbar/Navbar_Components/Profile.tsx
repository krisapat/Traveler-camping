import { AlignLeft } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import UserIcon from "./UserIcon"
import Link from "next/link"
import { Links } from "@/utils/links"
import SignOutLinks from "./SignOut/SignOutLinks"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

const Profile = async () => {
    const user = await currentUser()
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Button variant="outline" >
                        <AlignLeft />
                        <UserIcon />
                        <span className="sr-only">Toggle profile</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* ถ้า SignedOut (ยังไม่ SignIN) */}
                    <SignedOut >
                        <div className="flex flex-col gap-1">
                            <SignInButton mode="modal">
                                <Button className="w-full text-left text-[#ff2056] bg-outline 
                                                    transition-colors duration-300 hover:text-white hover:bg-[#ff2056]
                                                    border-2 border-primary">Login</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="w-full text-left" variant={"default"}>Register</Button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    {/* ถ้า SignedIn แล้วถึงจะแสดงเมนู */}
                    <SignedIn >
                        {Links.filter(item => {
                            if (item.requireAdmin && !user?.privateMetadata?.isAdmin) {
                                return false
                            }
                            return true
                        }).map((item, index) => (
                            <DropdownMenuItem key={index} asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator />
                        <SignOutLinks />
                    </SignedIn>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
export default Profile