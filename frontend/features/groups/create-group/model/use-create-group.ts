import { useMutation } from "@tanstack/react-query"
import { CreateGroup } from "../../../../entities/group/api/create-group"
import { CreatedGroupResponse, GroupPayload } from "./interfaces"
import { IServerError } from "@/shared/interfaces"
import { toast } from "sonner"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const useCreateGroup = () => {
  const { mutate: create, isPending } = useMutation<
    CreatedGroupResponse,
    IServerError,
    GroupPayload
  >({
    mutationFn: (req) => CreateGroup(req),
    onSuccess: (res) => {
      toast.success(res.message)
    },
    onError: (err) => {
      toast.error("Ops!", {
        description: err.message,
      })
    },
  })

  //
  const groupSchema = z.object({
    name: z.string().min(1, "Insira um nome para seu grupo"),
    description: z.string().min(1, "Insira a descrição do seu grupo"),
    allowMembersToPost: z.boolean(),
  })

  type GroupFormSchema = z.infer<typeof groupSchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormSchema>({
    resolver: zodResolver(groupSchema),
  })

  const handleCreateGroup = async (req: GroupFormSchema) => {
    create(req)
  }

  return {
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    handleCreateGroup,
  }
}
