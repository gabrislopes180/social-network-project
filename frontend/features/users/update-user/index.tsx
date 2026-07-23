"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { X } from "lucide-react"
import { useEffect } from "react"
import { useUpdateUser } from "./model/use-update-user"
import { useValidateChanges } from "./model/use-validate-changes"
import CoverColorPicker from "../cover-color-picker"
import { Textarea } from "@/components/ui/textarea"

export default function UpdateUser() {
  const { user, isLoading } = useSessionQuery()

  const {
    isEditing,
    setIsEditing,
    usernameInput,
    setUsernameInput,
    fullnameInput,
    setFullnameInput,
    descriptionInput,
    setDesriptionInput,
    handleStartEditing,
    color1,
    handleColor1,
    color2,
    handleColor2,
  } = useValidateChanges(user!)

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
        <p className="text-foreground/80">{user.email}</p>
      </section>

      <section className={`mb-4 flex w-full flex-col gap-2 border-b p-2`}>
        <label htmlFor="" className="text-sm font-semibold">
          Sua Descrição
        </label>
        {isEditing ? (
          <Textarea
            value={descriptionInput}
            onChange={(e) => setDesriptionInput(e.target.value)}
          />
        ) : (
          <p className="text-foreground/80">
            {user.description || "Adicione uma descrição"}
          </p>
        )}
      </section>

      <CoverColorPicker
        color1={color1}
        handleColor1={handleColor1}
        color2={color2}
        handleColor2={handleColor2}
      />

      {isEditing ? (
        <div className="flex self-start p-2">
          <Button>
            <X onClick={() => setIsEditing((prev) => !prev)} />
          </Button>
          <Button
            onClick={() =>
              mutate({
                fullName: fullnameInput!,
                username: usernameInput!,
                description: descriptionInput!,
                preferences: {
                  color1,
                  color2,
                },
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
