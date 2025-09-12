import { z } from "zod"
// Define a schema for user profile data
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required 2" }),
  lastName: z.string().min(2, { message: "Last name is required 2" }),
  userName: z.string().min(2, { message: "Username is required 2" }),
})

export const validateWithZod = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((err) => err.message).join(", ")
    throw new Error(errors)
  }
  return result.data
}

// Define a schema for image file validation

export const LandmarkSchema = z.object({
  name: z.string().min(2, { message: "Landmark name is required 2" }).max(30, { message: "Landmark name should be less than 30 characters" }),
  category: z.string().min(2, { message: "Category is required 2" }).max(30, { message: "Category should be less than 30 characters" }),
  description: z.string().min(2, { message: "Description is required 2" }).max(500, { message: "Description should be less than 500 characters" }),
  price: z.coerce.number().int().min(0, { message: "Price must be a positive number" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
})

const validateImage = z
  .instanceof(File)
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "File size should be less than 2MB"
  })

export const imageSchema = z.object({
  image: validateImage,
})

