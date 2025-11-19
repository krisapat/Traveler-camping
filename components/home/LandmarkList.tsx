import { LandmarkCardProps } from "@/utils/type"
import LandmarkCard from "../card/LandmarkCard"

const LandmarkList = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
    return (
        <section className="
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-4
        ">
            {
                landmarks.map((landmark) => {
                    return <LandmarkCard key={landmark.id} landmark={landmark} />
                })
            }
        </section>
    )
}
export default LandmarkList