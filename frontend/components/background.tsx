export default function Background({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-fade animate-once animate-duration-200 animate-ease-in-out fixed inset-0 z-60 flex h-dvh w-dvw items-center justify-center overscroll-contain bg-black/40 backdrop-blur-md">
      {children}
    </div>
  )
}
