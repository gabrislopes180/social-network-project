"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateGroupButton from "./createGroupButton"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function CreateGroupForm() {
  const [allow, setAllow] = useState(false)
  return (
    <Dialog>
      <DialogTrigger>
        <CreateGroupButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar seu grupo, bora</DialogHeader>

        <label htmlFor="">Nome do grupo</label>
        <Input />
        <label htmlFor="">Descrição</label>
        <Textarea />
        <p>Permitir que membros do grupo postem</p>
        <Switch onClick={() => setAllow((prev) => !prev)} />
        <span>{!allow ? "Não" : "Sim"}</span>
        <DialogFooter>
          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
