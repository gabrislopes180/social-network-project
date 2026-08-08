export const formatDate = (date: string) => {
  const dataObj = new Date(date)

  return dataObj.toLocaleDateString("pt-BR", { timeZone: "UTC" })
}
