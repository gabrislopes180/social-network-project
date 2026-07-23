import { Button } from "@/components/ui/button"
import { useDeleteMe } from "../model/use-delete-me"
import { SpinnerCustom } from "@/components/loading-spinner"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function DeleteButton() {
  const { mutate: handleDelete, isPending, isError } = useDeleteMe()
  const [aboutToDelete, setAboutToDelete] = useState(false)
  const [email, setEmail] = useState("")
  return (
    <div className="mt-2 w-full sm:mt-0">
      <Button
        variant="destructive"
        className="font-semibold whitespace-nowrap"
        onClick={() => setAboutToDelete(true)}
      >
        Excluir Conta{" "}
      </Button>
      {aboutToDelete && (
        <section className="mt-2 flex w-full animate-fade-down flex-col items-end space-y-3 animate-duration-200">
          <label
            htmlFor=""
            className="self-start text-xs font-medium text-foreground/70"
          >
            Confirme seu email para prosseguir com a exclusão
          </label>
          <Input
            className=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={() => handleDelete(email)}
            disabled={isPending || email.trim() === ""}
          >
            {isPending ? <SpinnerCustom variant="background" /> : "Confirmar"}
          </Button>
        </section>
      )}
    </div>
  )
}
