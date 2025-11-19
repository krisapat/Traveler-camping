'use client'
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Share } from "lucide-react"
import {
    FacebookIcon,
    FacebookShareButton,

} from "react-share"
const ShareButton = ({ landmarkId, name }: { landmarkId: string, name: string }) => {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const shareLink = `${url}/landmark/${landmarkId}`
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="submit"
                    size="icon"
                    variant="outline"
                    className="dark:bg-black transition-colors duration-300 dark:hover:bg-gray-900"
                >
                    <Share />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-full">
                <FacebookShareButton  url={shareLink} name={name}>
                    <FacebookIcon className="h-8 w-8 rounded-md"/>
                </FacebookShareButton>
            </PopoverContent>
        </Popover>
    )
}
export default ShareButton