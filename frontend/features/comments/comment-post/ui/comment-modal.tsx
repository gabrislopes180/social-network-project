"use client"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { ArrowUp } from "lucide-react"

export function CommentsModal() {
  return (
    <div className="relative">
      <Input placeholder="Adicione um comentário" className="border-none" />
      <Button
        variant={"default"}
        size={"icon-sm"}
        className="absolute top-0.5 right-1"
      >
        <ArrowUp />
      </Button>
    </div>
  )
}
