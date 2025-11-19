type NavLink = {
    label: string
    href: string
    requireAdmin?: boolean
}

export const Links: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Favorites", href: "/favorites" },
    { label: "Create Landmark", href: "/camp/create" , requireAdmin: true },
]