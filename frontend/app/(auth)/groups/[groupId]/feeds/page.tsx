import { getGroup } from "@/entities/group/api/get-group"
import GroupInfoCard from "@/entities/group/ui/info-card"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

export default async function FeedsByGroup({
  params,
}: {
  params: Promise<{ groupId: string }>
}) {
  const { groupId } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["group", groupId],
    queryFn: () =>
      getGroup({
        groupId,
        isFromServer: true,
      }),
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GroupInfoCard groupId={groupId} />
      </HydrationBoundary>
    </div>
  )
}
