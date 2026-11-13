import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-black">
            <div className="container px-4 py-8">
                <div className="text-center mb-12 space-y-4">
                    <Skeleton className="h-12 w-64 mx-auto" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 rounded-xl bg-gray-800" />
                    ))}
                </div>
            </div>
        </div>
    )
}
