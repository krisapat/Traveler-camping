import { fetchLandmarks } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/type";
import Hero from "./hero/Hero";
import { Suspense } from "react";
import LoadingCard from "../card/LoadingCard";
import CategoriesList from "./CategoriesList";
import LoadingHero from "./hero/LoadingHero";
import Search from "./Search";
import BreadcrumbHome from "./BreadcrumbHome";


const LandmarkContainer = async ({ search, category }: { search?: string, category?: string }) => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({ search, category });
  const landmarksSwiper: LandmarkCardProps[] = landmarks.slice(0, 10);
  return (
    <div className="space-y-4">
      <BreadcrumbHome />
      <div className="sticky bg-white/30 dark:bg-black/60 backdrop-blur-md max-w-md mx-auto w-full rounded-md top-18 z-50">
        <Search />
      </div>
      <Suspense fallback={<LoadingHero />}>
        <Hero landmark={landmarksSwiper} />
      </Suspense>
      <CategoriesList search={search} category={category} />
      <Suspense fallback={<LoadingCard />}>
        <LandmarkList landmarks={landmarks} />
      </Suspense>
    </div>
  )
}
export default LandmarkContainer