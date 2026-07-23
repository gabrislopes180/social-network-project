import { MeRequest } from "@/entities/session/api/me"
import UpdateUser from "@/features/users/update-user"
import CoverColorPicker from "@/features/users/cover-color-picker"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

export default async function UserData() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["session"],
    queryFn: async () => MeRequest(),
  })
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UpdateUser />
      </HydrationBoundary>
    </div>
  )
}
