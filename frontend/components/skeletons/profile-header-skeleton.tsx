import { Skeleton } from "../ui/skeleton"

export function HeaderSkeleton() {
  return (
    <section className="flex w-full flex-col items-center justify-center px-4">
      <Skeleton className="my-2 h-6 w-60 rounded" />
      <Skeleton className="my-2 h-2 w-30 rounded" />
      <Skeleton className="my-2 h-2 w-60 rounded" />
      <Skeleton className="my-2 h-2 w-45 rounded" />

      <section className="flex items-center justify-between gap-18">
        <Skeleton className="my-2 h-8 w-8 rounded-full" />
        <Skeleton className="my-2 h-8 w-8 rounded-full" />

        <Skeleton className="my-2 h-8 w-8 rounded-full" />
      </section>

      <footer className="mt-3 flex items-center gap-6">
        <Skeleton className="h-8 w-40 rounded-full" />
      </footer>
    </section>
  )
}
