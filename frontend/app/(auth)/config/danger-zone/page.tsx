"use client"

import { Button } from "@/components/ui/button"
import LogoutButton from "@/features/auth/logout/ui/logoutButton"
import { AlertTriangle, LogOut, Trash2 } from "lucide-react"

export default function DangerZone() {
  return (
    <div className="flex w-full flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <AlertTriangle className="text-destructive w-8 h-8" />
            Zona de Perigo
          </h1>
          <p className="text-muted-foreground mt-2">
            Tenha cuidado. As ações abaixo podem ter efeitos permanentes na sua conta e nos seus dados.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {/* Seção de Desconectar */}
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 md:p-6 border rounded-xl bg-card shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <LogOut className="w-5 h-5 text-muted-foreground" />
                Desconectar da conta
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Isso encerrará a sua sessão atual neste dispositivo. Você precisará fazer login novamente para acessar a plataforma.
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <LogoutButton />
            </div>
          </section>

          {/* Seção de Exclusão de Conta */}
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 md:p-6 border border-destructive/20 bg-destructive/5 rounded-xl shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Excluir sua conta
              </h2>
              <p className="text-sm text-destructive/80 max-w-md">
                Excluir permanentemente sua conta, postagens, curtidas e todos os seus dados. Essa ação não pode ser desfeita.
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <Button variant="destructive" className="whitespace-nowrap font-semibold">
                Excluir Conta
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
