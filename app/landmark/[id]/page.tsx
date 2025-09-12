import { fetchLandmarkDetail } from "@/actions/actions"
import Breadcrums from "@/components/home/landmark/Breadcrums"
import { LandmarkCardProps } from "@/utils/type"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton"
import { Suspense } from "react"
import { SkeletonDetail } from "@/components/home/landmark/LoadingCard"
import MapLandmark from "@/components/map/MapLandmark"
import ShareButton from "@/components/home/landmark/ShareButton"

export default async function LandmarkDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  //console.log(params)
  const landmark = await fetchLandmarkDetail({ id })
  if (!landmark) redirect("/")
  const { name, description, price, province, category, image, lat, lng } = landmark as LandmarkCardProps
  return (
    <section>
      {/* breadcrumb */}
      <Breadcrums name={name} />
      <Suspense fallback={<SkeletonDetail />}>
        <Card className="overflow-hidden p-0 shadow-lg rounded-md my-4">
          <div className="grid md:grid-cols-2">
            {/* image */}
            <div className="relative h-[300px] md:h-full w-full">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>

            {/* detail */}
            <CardContent className="flex flex-col justify-between p-6">
              <div>
                <CardHeader className="p-0 mb-4 flex justify-between">
                  <CardTitle className="text-3xl font-bold">{name}</CardTitle>
                  <div className="flex space-x-2">
                    <ShareButton landmarkId={id} name={name} />
                    <FavoriteToggleButton landmarkId={id} />
                  </div>
                </CardHeader>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary">{province}</Badge>
                  <Badge variant="outline">{category}</Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              <div className="flex items-center mt-6">
                <p className="text-xl font-semibold text-primary">
                  ค่าเข้าชม : {price ? `฿${price.toLocaleString()}` : "ฟรี"}
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </Suspense>
      <MapLandmark
        Location={{ lat, lng }}
        className="h-[300px] w-full rounded-md"
      />
    </section>
  )
}
// export default LandmarkDetail; // Already exported above as default function
