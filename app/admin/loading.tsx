import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container py-8 space-y-8">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
            </div>
            <Skeleton className="h-[500px] rounded-xl" />
        </div>
    )
}
