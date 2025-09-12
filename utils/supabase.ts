import { createClient } from '@supabase/supabase-js'

const bucket_name = "landmark-bucket"
const url = process.env.SUPABASE_URL as string
const key = process.env.SUPABASE_KEY as string
// Create Supabase client
const supabase = createClient(url, key)

// Upload file using standard upload
export async function uploadFile(images: File) {
    const timeStamp = Date.now()
    const newName = `${timeStamp}-${images.name}`
    const { data, error } = await supabase.storage.from(bucket_name).upload(newName, images, { cacheControl: "3600" })
    if (!data) throw new Error('Failed to upload image')
    return supabase.storage.from(bucket_name).getPublicUrl(newName).data.publicUrl
}