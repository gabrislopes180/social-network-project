import { GetUserByUsername } from "@/entities/users/api/get-user-by-username"
import UserFound from "@/entities/users/ui/userFound"
import UserPosts from "@/widgets/userPosts"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

export default async function User({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["user-found", username],
    queryFn: () =>
      GetUserByUsername({
        username: username,
        isFromClient: false,
      }),
  })

  return (
    <div className="flex w-full justify-center pb-20">
      <div className="flex min-h-screen w-full max-w-xl flex-col bg-background">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserFound name={username} />

          <div className="my-4 h-px w-full bg-border" />

          <div className="w-full px-1">
            <UserPosts name={username} />
          </div>
        </HydrationBoundary>
      </div>
    </div>
  )
}
