"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import { useGroupsQuery } from "@/entities/group/model/use-groups-query"
import { GroupsList } from "@/entities/group/ui/groups-list"

export default function GroupsWidget() {
  const { groups, isLoading, isError, error } = useGroupsQuery()

  console.log(groups)

  if (isLoading)
    return (
      <div className="my-10">
        <SpinnerCustom />
      </div>
    )

  if (isError || !groups) {
    return (
      error && (
        <span className="my-10 text-xs text-destructive">
          {error.message || "Houve um erro ao carregar os grupos"}
        </span>
      )
    )
  }
  return <GroupsList groups={groups} />
}
