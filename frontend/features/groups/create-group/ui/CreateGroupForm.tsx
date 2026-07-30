"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateGroupButton from "./createGroupButton"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateGroup } from "../model/use-create-group"
import { Controller } from "react-hook-form"
import Link from "next/link"

export default function CreateGroupForm() {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    handleCreateGroup,
  } = useCreateGroup()
  return (
    <Dialog>
      <DialogTrigger>
        <CreateGroupButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Crie o seu próprio grupo
          <DialogDescription>
            Lembre-se que para criar um novo grupo, você deve estar apto de
            acordo com as devidas condições
          </DialogDescription>
          <Link href={"/"} className="text-xs text-foreground/70 underline">
            Condições
          </Link>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateGroup)}>
          <div className="my-4 flex flex-col">
            <label htmlFor="">Nome do grupo</label>
            <Input {...register("name")} />
            {errors.name && (
              <span className="text-xs text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="my-4 flex w-full flex-col">
            <label htmlFor="">Descrição</label>
            <Textarea {...register("description")} className="max-w-200" />
            {errors.description && (
              <span className="text-xs text-destructive">
                {errors.description?.message}
              </span>
            )}
          </div>

          <div className="my-4 flex flex-col space-y-3">
            <p>Permitir que membros do grupo postem</p>
            <article className="flex items-center gap-2">
              <Controller
                name="allowMembersToPost"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              {/* <span>{}</span> */}
            </article>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Gerando..." : "Criar Grupo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
