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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserFound name={username} />
      <UserPosts name={username} />
    </HydrationBoundary>
  )
}
