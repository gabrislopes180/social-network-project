import { Skeleton } from "@/components/ui/skeleton"

export default function CommentsSkeleton() {
  return (
    <section className="flex min-h-70 w-full flex-col items-start px-8">
      {Array.from({ length: 5 }, (_, index) => (
        <div className="mb-7 flex items-center gap-2" key={index}>
          <Skeleton className="h-7 w-7 rounded-full" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-2 w-15 rounded" />
            <Skeleton className="h-2 w-30 rounded" />
          </div>
        </div>
      ))}
    </section>
  )
}
