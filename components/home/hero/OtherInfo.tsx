import { LandmarkCardProps } from "@/utils/type"
import { MapPin, Tag } from "lucide-react"
const OtherInfo = ({ landmark }: { landmark: LandmarkCardProps }) => {
    const { name, description, province, category } = landmark
    return (
        <div className="text-white p-6 space-y-2">
            <h3 className="text-5xl font-semibold">
                {name}
            </h3>
            <p className="text-sm truncate opacity-90">{description}</p>
            <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin size={16} className="text-pink-300" />
                    <span>{province}</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                    <Tag size={16} className="text-emerald-300" />
                    <span>{category}</span>
                </div>
            </div>
        </div>
    )
}
export default OtherInfo