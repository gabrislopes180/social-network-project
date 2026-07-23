import { CircleAlert, LockKeyhole, User } from "lucide-react"
import Link from "next/link"

export default function Config() {
  const data = [
    {
      id: 1,
      title: "Dados da sua conta",
      icon: User,
      href: "/config/data",
    },
    {
      id: 2,
      title: "Senha & Segurança",
      icon: LockKeyhole,
      href: "/config/password",
    },
    {
      id: 3,
      title: "Zona de Perigo",
      icon: CircleAlert,
      href: "/config/danger-zone",
    },
  ]
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      {data.map((d) => (
        <section
          key={d.id}
          className={`mb-4 flex w-full items-center-safe gap-2 border-b p-2 ${d.id === 3 && "text-destructive"}`}
        >
          <d.icon size={20} />
          <Link href={d.href}>
            <p className={`${d.id === 3 && "text-destructive/70"}`}>
              {d.title}
            </p>
          </Link>
        </section>
      ))}
    </div>
  )
}
