"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useGroupsQuery } from "../model/use-groups-query"
import InfoCardSkeleton from "./skeletons/info-card-skeleton"
import { Users } from "lucide-react"

export default function GroupInfoCard({ groupId }: { groupId: string }) {
  const { group, loadingGroup, errorInGroup } = useGroupsQuery(groupId)

  if (loadingGroup) return <InfoCardSkeleton />

  if (errorInGroup || !group) {
    return <p>Deu ruim</p>
  }
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="relative rounded bg-foreground p-1.5 text-primary-foreground"
    >
      <article className="absolute top-7 right-9 flex items-center gap-2 text-sm">
        <Users size={18} />
        {group.members.length}
      </article>
      <AccordionItem value="shipping">
        <AccordionTrigger className="flex w-full items-center justify-between text-lg">
          <h1>{group.name}</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col items-start space-y-2">
          <span>{group.description || "Grupo sem descrição"}</span>
          <span className="flex flex-col text-xs text-muted-foreground">
            <p className="text-primary-foreground">Pontuação do grupo:</p>
            {group.xp} XP
          </span>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
