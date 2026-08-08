import { AvatarProfile } from "@/components/profile-avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IGroup } from "@/entities/group/model/interfaces"
import { AlertTriangleIcon } from "lucide-react"

interface MemberUserListProps {
  group: IGroup
  //   isUpdatingLeader: boolean
}

export function MemberUserList({
  group,
  //   isUpdatingLeader,
}: MemberUserListProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs underline">Membros</button>
      </DialogTrigger>
      <DialogContent className="flex max-h-120 flex-col overflow-y-auto">
        <DialogClose />
        <DialogTitle className="text-center">Membros desse grupo</DialogTitle>
        {!group.allowMembersToPost && (
          <DialogDescription className="flex flex-col items-center rounded bg-destructive/10 p-2 text-center text-xs text-destructive">
            <AlertTriangleIcon />O líder do grupos optou por não permitir que
            membros postem.
          </DialogDescription>
        )}
        {group.members.length < 1 ? (
          <p className="text-center text-foreground/70">
            Esse grupo ainda não possui usuários
          </p>
        ) : (
          <ul className="flex w-full flex-col items-start">
            {group.members.map((user) => (
              <div
                key={user._id}
                className="mb-5 flex w-full items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <AvatarProfile className="h-7 w-7" />
                  <span
                    onClick={() =>
                      (window.location.href = `/user/${user.username}`)
                    }
                  >
                    {user.username}
                  </span>
                  {user.username === group.leader.username && (
                    <p className="mx-3 rounded bg-blue-700/20 p-1 text-xs text-blue-700">
                      Líder
                    </p>
                  )}
                </div>

                {group.meLeader && group.leader.username !== user.username && (
                  <Button
                    variant={"destructive"}
                    size={"xs"}
                    className="flex items-end justify-end"
                  >
                    Expulsar
                  </Button>
                )}
              </div>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}
