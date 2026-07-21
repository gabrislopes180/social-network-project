"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useUpdateUser } from "./model/use-update-user"

export default function UpdateUser() {
  const { user, isLoading } = useSessionQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [usernameInput, setUsernameInput] = useState(user?.username)
  const [fullnameInput, setFullnameInput] = useState(user?.fullName)

  const handleStartEditing = () => {
    setFullnameInput(user?.fullName || "")
    setUsernameInput(user?.username || "")
    setIsEditing(true)
  }

  const { mutate, isPending, isSuccess } = useUpdateUser()

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false)
    }
  }, [isSuccess])

  if (!user || isLoading) return <p>Carregando...</p>

  return (
    <>
      <section className={`mb-4 flex w-full flex-col gap-2 border-b p-2`}>
        <label htmlFor="" className="text-sm font-semibold">
          Seu Nome completo
        </label>
        {isEditing ? (
          <Input
            value={fullnameInput}
            onChange={(e) => setFullnameInput(e.target.value)}
          />
        ) : (
          <p className="text-foreground/80">{user.fullName}</p>
        )}
      </section>
      <section className={`mb-4 flex w-full flex-col gap-2 border-b p-2`}>
        <label htmlFor="" className="text-sm font-semibold">
          Seu Nome de Usuário
        </label>
        {isEditing ? (
          <Input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        ) : (
          <p className="text-foreground/80">{user.username}</p>
        )}
      </section>
      <section
        className={`mb-4 flex w-full flex-col gap-2 border-b p-2 opacity-70`}
      >
        <label htmlFor="" className="text-sm font-semibold">
          Seu Email
        </label>
        <p className="text-foreground/80">joazinho@gmail.com</p>
      </section>
      {isEditing ? (
        <div className="flex self-start px-2">
          <Button>
            <X onClick={() => setIsEditing((prev) => !prev)} />
          </Button>
          <Button
            onClick={() =>
              mutate({
                fullName: fullnameInput!,
                username: usernameInput!,
              })
            }
            disabled={isPending}
          >
            {isPending ? "Aguarde..." : "Confirmar Edições"}
          </Button>
        </div>
      ) : (
        <Button onClick={handleStartEditing}>Deseja editar seus dados?</Button>
      )}
    </>
  )
}
