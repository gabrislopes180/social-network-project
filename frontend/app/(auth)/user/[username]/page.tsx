import { MeRequestServer } from "@/entities/session/api/me-server"
import { GetUserByUsername } from "@/entities/users/api/get-user-by-username"
import UserPosts from "@/widgets/userPosts"
import UserProfile from "@/widgets/UserProfileWidget"
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

  const user = await MeRequestServer()

  const isFromMe = user.username === username

  return (
    <div className="flex w-full justify-center pb-20">
      <div className="flex min-h-screen w-full max-w-xl flex-col bg-background">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserProfile username={username} isFromMe={isFromMe} />

          <div className="my-4 h-px w-full bg-border" />

          <div className="w-full px-1">
            <UserPosts name={username} isFromMe={isFromMe} />
          </div>
        </HydrationBoundary>
      </div>
    </div>
  )
}
