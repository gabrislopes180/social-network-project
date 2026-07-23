import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function AvatarProfile({ 
  className, 
  wrapperClassName 
}: { 
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={cn("relative z-10 flex justify-center", wrapperClassName)}>
      <Avatar className={cn("w-10 h-10 shadow-sm", className)}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
