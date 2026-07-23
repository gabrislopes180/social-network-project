import { AuthForm } from "@/widgets/auth/ui"
import { GuestGuard } from "@/features/auth/guest-guard"

export default function Authentication() {
  return (
    <GuestGuard>
      <div className="mx-5 my-10 flex flex-col items-center justify-center space-y-10">
        <AuthForm />
      </div>
    </GuestGuard>
  )
}
