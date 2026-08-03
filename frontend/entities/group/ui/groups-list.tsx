import { ShieldCheck, Users } from "lucide-react"
import { IGroup } from "../model/interfaces"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GroupsList({ groups }: { groups: IGroup[] }) {
  if (groups.length < 1) {
    return (
      <p className="my-8 text-center text-xs text-muted-foreground">
        Você ainda não criou ou faz parte de nenhum grupo.
      </p>
    )
  }
  return (
    <div className="my-6 flex flex-col items-center justify-center">
      {groups.length > 0 && (
        <h1 className="text-lg font-semibold tracking-tight">
          Dê uma olhada em seus grupos:
        </h1>
      )}

      <ul className="my-6 w-full">
        {groups.map((group) => (
          <li
            key={group._id}
            className="flex min-h-10 w-full items-center justify-between rounded-lg bg-foreground p-2.5 text-primary-foreground"
          >
            <div className="flex flex-col">
              <span>{group.name}</span>
              <span className="my-1 flex items-center gap-1 text-xs font-light">
                <Users size={14} />: {group.members.length}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              {group.meLeader && (
                <section className="flex items-center">
                  <ShieldCheck size={14} />

                  <p className="text-[10px]">Você é o lider</p>
                </section>
              )}
              <Link href={`/groups/feeds/${group._id}`}>
                <Button
                  size={"xs"}
                  variant={"outline"}
                  className="text-foreground"
                >
                  Entrar
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
