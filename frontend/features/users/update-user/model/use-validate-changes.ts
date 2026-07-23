import { User } from "@/entities/session/model/types"
import { useEffect, useState } from "react"

export const useValidateChanges = (user: User) => {
  const [isEditing, setIsEditing] = useState(false)
  const [usernameInput, setUsernameInput] = useState(user?.username)
  const [fullnameInput, setFullnameInput] = useState(user?.fullName)
  const [descriptionInput, setDesriptionInput] = useState(user?.description)

  const [color1, setColor1] = useState("")
  const [color2, setColor2] = useState("")

  useEffect(() => {
    const setColors = () => {
      setColor1(user?.preferences.color1)
      setColor2(user?.preferences.color2)
    }
    setColors()
  }, [user])

  const handleColor1 = (c: string) => {
    setColor1(c)
    window.dispatchEvent(new Event("coverColorChanged"))
  }

  const handleColor2 = (c: string) => {
    setColor2(c)
    window.dispatchEvent(new Event("coverColorChanged"))
  }

  const handleStartEditing = () => {
    setFullnameInput(user?.fullName || "")
    setUsernameInput(user?.username || "")
    setIsEditing(true)
  }

  return {
    isEditing,
    setIsEditing,
    usernameInput,
    setUsernameInput,
    fullnameInput,
    setFullnameInput,
    descriptionInput,
    setDesriptionInput,
    handleStartEditing,
    color1,
    handleColor1,
    color2,
    handleColor2,
  }
}
