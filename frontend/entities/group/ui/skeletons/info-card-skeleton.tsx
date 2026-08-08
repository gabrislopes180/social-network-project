import { Skeleton } from "@/components/ui/skeleton"

export default function InfoCardSkeleton() {
  return (
    <Skeleton className="flex h-20 w-90 items-center justify-between rounded-lg px-6">
      <Skeleton className="h-3 w-70 rounded-full bg-foreground/20" />
      <Skeleton className="h-6 w-6 rounded-full bg-foreground/20" />
    </Skeleton>
  )
}
