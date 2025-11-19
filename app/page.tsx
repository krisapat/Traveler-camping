import LandmarkContainer from "@/components/home/LandmarkContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Camping",
  description: "Favorite your camping",
};
const Page = async ({ searchParams }:{ searchParams: Promise<{ search?: string, category?: string }> }) => {
  const { search, category } = await searchParams
  return (
    <section>
      <LandmarkContainer search={search} category={category} />
    </section>
  )
}
export default Page