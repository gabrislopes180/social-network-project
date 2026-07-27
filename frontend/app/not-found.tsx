import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center space-y-8 px-10 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Ops...</h1>
      <p>Parece que a página que você procurava não existe.</p>

      <Link href={"/feeds"}>
        <Button>Retornar</Button>
      </Link>
    </div>
  )
}
