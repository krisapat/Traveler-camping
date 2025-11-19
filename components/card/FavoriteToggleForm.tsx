'use client'

import { useState } from "react"
import { FormState, toggleFavoriteAction } from "@/actions/actions"
import FormContainer from "../Form/FormContainer"
import { usePathname } from "next/navigation"
import { CardSubmitButton } from "../Form/SubmitButtons"

const FavoriteToggleForm = ({ isFavorite, landmarkId }: { isFavorite: boolean, landmarkId: string }) => {
  const pathname = usePathname()
  const [favoriteState, setFavoriteState] = useState(isFavorite)
  const [isLocked, setIsLocked] = useState(false)

  const toggleAction = async (prevState: FormState, _formData: FormData): Promise<FormState> => {
    if (isLocked) return prevState

    setIsLocked(true)
    setFavoriteState(prev => !prev) // Optimistic UI

    try {
      const result = await toggleFavoriteAction({ landmarkId, pathname }, prevState, _formData)
      if (!result.success) setFavoriteState(prev => !prev) // rollback
      return result
    } catch {
      setFavoriteState(prev => !prev) // rollback
      return prevState
    } finally {
      setIsLocked(false)
    }
  }

  return (
    <FormContainer
      action={toggleAction}
      successMessage="Successfully"
      failureMessage="Failed"
    >
      <CardSubmitButton isFavorite={favoriteState} disabled={isLocked} />
    </FormContainer>
  )
}

export default FavoriteToggleForm
