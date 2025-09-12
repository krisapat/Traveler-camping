'use client'

import { toggleFavoriteAction } from "@/actions/actions"
import FormContainer from "../Form/FormContainer"
import { usePathname } from "next/navigation"
import { CardSubmitButton } from "../Form/SubmitButtons"

const FavoriteToggleForm = ({ isFavorite, landmarkId }
  : { isFavorite: boolean, landmarkId: string }) => {
  const pathname = usePathname()
  const toggleAction = toggleFavoriteAction.bind(null, {
    landmarkId,
    pathname,
  });

  return (
    <FormContainer
      action={toggleAction}
      successMessage="Successfully"
      failureMessage="Failed"
    >
      <CardSubmitButton isFavorite={isFavorite} />
    </FormContainer>
  )
}
export default FavoriteToggleForm
