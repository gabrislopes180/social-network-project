import FeedPosts from "@/widgets/feeds"
import MyPostsWidget from "@/widgets/myPosts"

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-6">
      <div className="flex w-full max-w-xl flex-col gap-6">
        <header className="flex flex-col items-center justify-center gap-1 border-b pt-4 pb-2">
          <h1 className="text-2xl font-bold tracking-tight">Para Você</h1>
          <p className="text-sm text-muted-foreground">
            Se ligue nos últimos posts feitos pela comunidade
          </p>
        </header>

        <main className="w-full">
          <FeedPosts />
        </main>
      </div>
    </div>
  )
}
