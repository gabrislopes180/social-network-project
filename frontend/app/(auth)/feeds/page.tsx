import MyPostsWidget from "@/widgets/myPosts"

export default function Page() {
  return (
    <div className="relative flex w-full flex-col items-center p-4 md:p-6 bg-background min-h-screen">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <header className="flex flex-col gap-1 items-center justify-center pt-4 pb-2 border-b">
          <h1 className="text-2xl font-bold tracking-tight">For You</h1>
          <p className="text-sm text-muted-foreground">Catch up on the latest posts</p>
        </header>

        <main className="w-full">
          <MyPostsWidget variant="feed" />
        </main>
      </div>
    </div>
  )
}
