import { auth } from '@clerk/nextjs/server'
import { SignInCardButton } from "../Form/SubmitButtons"
import { fetchFavoriteId } from "@/actions/actions"
import FavoriteToggleForm from "./FavoriteToggleForm"



const FavoriteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
  const { userId } = await auth()
  if (!userId) return <SignInCardButton />
  const favoriteID = await fetchFavoriteId({ landmarkId })
  return (
    <FavoriteToggleForm
      favoriteID={favoriteID}
      landmarkId={landmarkId}
    />
  )
}
export default FavoriteToggleButton