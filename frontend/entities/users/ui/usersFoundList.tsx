import { Button } from "@/components/ui/button"
import { User } from "@/entities/session/model/types"
import Link from "next/link"

type Props = {
  users: User[]
}
export default function UsersFoundList({ users }: Props) {
  return (
    <div className="mt-2 w-full">
      {users.map((user) => (
        <div key={user._id} className="mb-1 rounded-lg border px-2 py-0.5">
          <div className="flex w-full items-center justify-between">
            <span className="text-xs">{user.username}</span>

            <Link href={`/user/${user.username}`} className="ml-2">
              <Button size="xs">Olhar</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
