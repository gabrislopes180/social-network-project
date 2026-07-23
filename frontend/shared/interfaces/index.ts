export interface IResponse {
  success: boolean
  message?: string
}

export interface IServerError {
  success: boolean
  message: string
  detail?: string
}

export interface ShowErrorParams {
  err: unknown
  genericMessage: string
}
