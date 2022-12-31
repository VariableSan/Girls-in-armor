export interface Link {
  title: string
  route: string
  icon: string
  permission: string[]
}

export interface User {
  _id: string
  permission: boolean
  login: string
  email: string
}

export interface UserForm {
  login: string
  password: string
}

export interface SnackbarMessage {
  text: string
  color: "warning" | "success" | "info" | "error"
}

export interface Waifu {
  _id: string
  imgUrl: string
  name: string
  description: string
  user: string
}
