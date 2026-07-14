"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { GetUsersSearch } from "@/entities/users/api/get-user-search"
import UsersFoundList from "@/entities/users/ui/usersFoundList"
import { User } from "@/entities/session/model/types"

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
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <div className="md:w-100">
      <Input
        placeholder="Procurar usuário"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <UsersFoundList users={users} />
    </div>
  )
}
