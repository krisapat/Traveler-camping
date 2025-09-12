import { auth } from '@clerk/nextjs/server'
import { SignInCardButton } from "../Form/SubmitButtons"
import { fetchIsFavorite } from "@/actions/actions"
import FavoriteToggleForm from "./FavoriteToggleForm"

const FavoriteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
  const { userId } = await auth()
  if (!userId) return <SignInCardButton />

  const isFavorite = await fetchIsFavorite({ landmarkId })

  return (
    <FavoriteToggleForm
      isFavorite={isFavorite}
      landmarkId={landmarkId}
    />
  )
}
export default FavoriteToggleButton
