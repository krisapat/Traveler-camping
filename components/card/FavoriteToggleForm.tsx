'use client'
import { toggleFavoriteAction } from "@/actions/actions"
import FormContainer from "../Form/FormContainer"
import { usePathname } from "next/navigation"
import { CardSubmitButton } from "../Form/SubmitButtons"


const FavoriteToggleForm = ({ favoriteID, landmarkId }
  : { favoriteID: string | null, landmarkId: string }) => {
  const pathname = usePathname()
  const toggleAction = toggleFavoriteAction.bind(null, { 
    favoriteID, landmarkId, pathname ,
})
  return (
    <FormContainer
      action={toggleAction}
      successMessage="Successfully"
      failureMessage="Failed"
    >
      <CardSubmitButton isFavorite={favoriteID ? true : false}/>
    </FormContainer>
  )
}
export default FavoriteToggleForm