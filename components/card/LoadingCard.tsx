import { Skeleton } from "../ui/skeleton"

const LoadingCard = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )
}

export default LoadingCard
export const SkeletonCard = () => {
    return (
        <div>
            <Skeleton className="rounded-md h-95 p-0 shadow-md" />
        </div>
    )
}
