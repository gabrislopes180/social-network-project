import { api, apiServer } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"
import { IGroup } from "../model/interfaces"

interface GetGroupPayload {
  groupId: string
  isFromServer: boolean
}

export const getGroup = async ({
  groupId,
  isFromServer,
}: GetGroupPayload): Promise<IGroup> => {
  const currentApi = isFromServer ? apiServer : api
  try {
    const res = await currentApi.get(`/groups/${groupId}`)
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
