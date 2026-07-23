"use client"

import DeleteButton from "@/features/auth/delete/ui/DeleteButton"
import LogoutButton from "@/features/auth/logout/ui/logoutButton"
import { AlertTriangle, LogOut, Trash2 } from "lucide-react"

export default function DangerZone() {
  return (
    <div className="flex w-full flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-xl">
        <header className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Zona de Perigo
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tenha cuidado. As ações abaixo podem ter efeitos permanentes na sua
            conta e nos seus dados.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {/* Seção de Desconectar */}
          <section className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center md:p-6">
            <div className="flex flex-col gap-1">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <LogOut className="h-5 w-5 text-muted-foreground" />
                Desconectar da conta
              </h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Isso encerrará a sua sessão atual neste dispositivo. Você
                precisará fazer login novamente para acessar a plataforma.
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <LogoutButton />
            </div>
          </section>

          {/* Seção de Exclusão de Conta */}
          <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-5 shadow-sm sm:flex-row sm:items-center md:p-6">
            <div className="flex flex-col gap-1">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <Trash2 className="h-5 w-5" />
                Excluir sua conta
              </h2>
              <p className="max-w-md text-sm text-destructive/80">
                Excluir permanentemente sua conta, postagens, curtidas e todos
                os seus dados. Essa ação não pode ser desfeita.
              </p>
            </div>
            <DeleteButton />
          </section>
        </div>
      </div>
    </div>
  )
}
