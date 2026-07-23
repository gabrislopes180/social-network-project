"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { GetUsersSearch } from "@/entities/users/api/get-user-search"
import UsersFoundList from "@/entities/users/ui/usersFoundList"
import { User } from "@/entities/session/model/types"
import { showError } from "@/shared/lib/get-server-error"
import { toast } from "sonner"

export default function SearchUser() {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!search.trim()) {
        setUsers([])
        return
      }

      try {
        const res = await GetUsersSearch(search)

        if (res.success) {
          setUsers(res.users)
        }
      } catch (error) {
        console.error(error)
        const err = showError({
          err: error,
          genericMessage: "Houve um erro ao buscar os usuários",
        })
        toast.error(err)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <div className="w-full px-4">
      <Input
        placeholder="Procurar usuário"
        className="text-sm placeholder:text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <UsersFoundList users={users} />
    </div>
  )
}
