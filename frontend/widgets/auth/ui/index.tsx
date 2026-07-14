"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHandleLogin } from "@/features/auth/login/use-handle-login"
import { useHandleSignUp } from "@/features/auth/sign-up/use-handle-sign-up"

export function AuthForm() {
  const [currentForm, setCurrentForm] = useState<"login" | "signUp">("login")
  const login = useHandleLogin()
  const signUp = useHandleSignUp()

  return (
    <Card className="w-full max-w-sm">
      {currentForm === "login" && (
        <form onSubmit={login.onSubmit}>
          <CardHeader>
            <CardTitle>Inicie uma sessao</CardTitle>
            <CardDescription>
              Entre com seu email para acessar sua conta
            </CardDescription>
            <CardAction>
              <Button
                type="button"
                variant="link"
                onClick={() => setCurrentForm("signUp")}
              >
                Cadastrar
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="mt-10 grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  {...login.form.register("email")}
                  required
                />
                {login.form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {login.form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...login.form.register("password")}
                  required
                />
                {login.form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {login.form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {login.error && (
              <p className="mt-4 text-sm text-destructive">{login.error}</p>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={login.isSubmitting}
            >
              {login.isSubmitting ? "Entrando..." : "Login"}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      )}

      {currentForm === "signUp" && (
        <form onSubmit={signUp.onSubmit}>
          <CardHeader>
            <CardTitle>Cadastrar conta</CardTitle>
            <CardDescription>
              Insira os dados para criar sua conta
            </CardDescription>
            <CardAction>
              <Button
                type="button"
                variant="link"
                onClick={() => setCurrentForm("login")}
              >
                Login
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  {...signUp.form.register("email")}
                  required
                />
                {signUp.form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {signUp.form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="full-name">Nome Completo</Label>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="Seu Nome Completo"
                  {...signUp.form.register("fullName")}
                  required
                />
                {signUp.form.formState.errors.fullName && (
                  <p className="text-sm text-destructive">
                    {signUp.form.formState.errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-name">Username</Label>
                <Input
                  id="user-name"
                  type="text"
                  placeholder="Seu Username"
                  {...signUp.form.register("username")}
                  required
                />
                {signUp.form.formState.errors.username && (
                  <p className="text-sm text-destructive">
                    {signUp.form.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...signUp.form.register("password")}
                  required
                />
                {signUp.form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {signUp.form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {signUp.error && (
              <p className="mt-4 text-sm text-destructive">{signUp.error}</p>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={signUp.isSubmitting}
            >
              {signUp.isSubmitting ? "Validando..." : "Cadastrar"}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}
