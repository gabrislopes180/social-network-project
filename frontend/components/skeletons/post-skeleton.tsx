import { Skeleton } from "../ui/skeleton"

export function PostSkeleton() {
  return (
    <Skeleton className="mt-24 flex h-120 w-85 flex-col items-center justify-center rounded-lg">
      <div className="w-75">
        <div className="mb-4 h-7 w-7 items-start self-start rounded-full bg-primary/10"></div>
        <div className="h-90 w-full rounded-lg bg-primary/10"></div>
        <div className="mt-4 mb-4 h-2 w-24 items-start self-start rounded-full bg-primary/10"></div>
      </div>
    </Skeleton>
  )
}
