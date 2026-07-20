import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const spinnerVariants = {
  primary: "text-primary",
  muted: "text-muted-foreground",
  background: "text-background",
  foreground: "text-foreground",
  destructive: "text-destructive",
  secondary: "text-secondary-foreground",
} as const

type SpinnerVariant = keyof typeof spinnerVariants

interface Props extends React.ComponentProps<"svg"> {
  variant?: SpinnerVariant
}

function Spinner({ className, variant = "primary", ...props }: Props) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn(`size-4 animate-spin`, spinnerVariants[variant], className)}
      {...props}
    />
  )
}

export function SpinnerCustom({
  variant = "primary",
}: {
  variant?: SpinnerVariant
}) {
  return (
    <div className="flex items-center gap-4">
      <Spinner variant={variant} />
    </div>
  )
}
