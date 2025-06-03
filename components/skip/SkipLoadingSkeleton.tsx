import { Skeleton } from "@/components/ui/skeleton"

export function SkipLoadingSkeleton() {
  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-16 h-12 rounded-lg" />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-7 w-16 ml-auto" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 