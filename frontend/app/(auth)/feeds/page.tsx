import { ThemeSwitch } from "@/components/theme-switch"
import SearchUser from "@/features/users/search-users"

export default async function Page() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center p-6">
      <article className="absolute top-4 right-4">
        <ThemeSwitch />
      </article>

      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="text-2xl font-medium">Minha plataforma social!</h1>
          <h1 className="text-center tracking-tight text-primary">
            Feeds Page
          </h1>
        </div>
      </div>
      <SearchUser />
    </div>
  )
}
