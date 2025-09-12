"use server"

import { imageSchema, LandmarkSchema, profileSchema, validateWithZod } from "@/utils/schema"
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import db from "@/utils/db"
import { redirect } from "next/navigation"
import { uploadFile } from "@/utils/supabase"
import { revalidatePath } from "next/cache"
import { cache } from "react"

// helper function to get authenticated user
const getAuthUser = cache(async () => {
  const user = await currentUser()
  if (!user) throw new Error("User not authenticated")
  if (!user.privateMetadata.hasProfile) redirect("/profile/create")
  return user
})

// validation schema
export type FormState = { message: string, success?: boolean }
const renderError = (error: unknown): FormState => {
  return {
    message: error instanceof Error ? error.message : "An unknown error occurred",
    success: false,
  }
}

export const createProfileAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not authenticated")
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = validateWithZod(profileSchema, rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        profileImage: user.imageUrl || "",
        ...validatedData,
      }
    })

    const client = await clerkClient()
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true }
    })
  } catch (errors) {
    return renderError(errors)
  }
  redirect("/")
}

export const createLandmarkAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData.entries())
    const file = formData.get("image") as File | null
    const validatedFile = validateWithZod(imageSchema, { image: file })
    const validatedData = validateWithZod(LandmarkSchema, rawData)
    const fullPath = await uploadFile(validatedFile.image)
    await db.landmark.create({
      data: {
        ...validatedData,
        image: fullPath,
        profileId: user.id
      }
    })
    return { message: "Landmark created successfully", success: true }
  } catch (errors) {
    return renderError(errors)
  }
}

export const fetchLandmarks = cache(async ({ search = "", category }: { search?: string, category?: string }) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { province: { contains: search, mode: "insensitive" } },
      ]
    },
    orderBy: { createdAt: "desc" },
  })
  return landmarks
})

export const fetchIsFavorite = async ({ landmarkId }: { landmarkId: string }) => {
  const user = await getAuthUser()
  const favorite = await db.favorite.findFirst({
    where: { landmarkId, profileId: user.id },
    select: { id: true },
  })

  return !!favorite // แปลงเป็น boolean
}

export const fetchFavorites = async () => {
  const user = await getAuthUser()
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        }
      }
    }
  })
  return favorites.map((favorite) => favorite.landmark)
}

export const toggleFavoriteAction = async (
  { landmarkId, pathname }: { landmarkId: string; pathname: string },
  _prevState: FormState,
  _formData: FormData
): Promise<FormState> => {
  try {
    const user = await getAuthUser()

    // ลบ favorite ที่มีอยู่ (ถ้ามี)
    const deleted = await db.favorite.deleteMany({
      where: { profileId: user.id, landmarkId }
    })

    if (deleted.count > 0) {
      revalidatePath(pathname)
      return { message: "Remove favorite", success: true }
    }

    // ถ้าไม่มี → สร้างใหม่
    await db.favorite.create({
      data: { profileId: user.id, landmarkId }
    })

    revalidatePath(pathname)
    return { message: "Add favorite", success: true }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchLandmarkDetail = cache(async ({ id }: { id: string }) => {
  return db.landmark.findFirst({
    where: { id },
    include: { profile: true },
  })
})