import { fetchFavorites } from "@/actions/actions"
import LoadingCard from "@/components/card/LoadingCard"
import BreadcrumbFav from "@/components/favorite/BreadcrumbFav"
import LandmarkList from "@/components/home/LandmarkList"
import { Suspense } from "react"

const favorite = async () => {
  const favorites = await fetchFavorites()
  return (
    <section className="space-y-4">
      <BreadcrumbFav />
      <h1 className="text-3xl">รายการที่ถูกใจ</h1>
      <Suspense fallback={<LoadingCard />}>
        <LandmarkList landmarks={favorites} />
      </Suspense>
    </section>
  )
}
export default favorite
