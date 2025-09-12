'use client'
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs";
import { Heart, LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonsProps = {
  type: "submit"
  size?: "sm" | "lg" | "default" | "icon" | null | undefined
  text: string;
  className?: string
}

const SubmitButtons = (props: SubmitButtonsProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type={props.type} size={props.size} className={props.className} disabled={pending}>
      {
        pending ? <div>
          <LoaderCircle className="animate-spin inline-block mr-2" />
          <span>Loading...</span>
        </div>
          : props.text
      }
    </Button>
  )
}
export default SubmitButtons

export const SignInCardButton = () => {
  return (
    <SignInButton mode="modal">
      <Button size={"icon"} variant={"outline"} className="dark:bg-black text-primary transition-colors hover:text-primary dark:hover:bg-gray-900">
        <Heart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const {pending} = useFormStatus()
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="dark:bg-black text-primary transition-colors hover:text-primary  dark:hover:bg-gray-900"
    >
      {
        pending
        ? <LoaderCircle className="animate-spin" />
        : isFavorite ? < Heart fill="red" /> : < Heart />

      }
    </Button>
  )
}