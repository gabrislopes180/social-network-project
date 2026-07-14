import { ThemeSwitch } from "@/components/theme-switch"

export default function Header() {
  return (
    <header className="flex h-12 w-full items-center justify-between rounded-full border border-border px-4">
      <h1>T.I News</h1>
      <ThemeSwitch />
    </header>
  )
}
