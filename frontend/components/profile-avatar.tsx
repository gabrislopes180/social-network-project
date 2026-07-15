import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarProfile() {
  return (
    <Avatar className="my-4">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      {/* <AvatarBadge className="bg-green-600 dark:bg-green-800" /> */}
    </Avatar>
  )
}
