export interface Link {
  title: string
  route: string
  icon: string
  exact?: boolean
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
  email?: string
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
  user: string | User
  date: string
}

export interface ExtendedWaifu extends Waifu {
  imageFile: File[]
}

export interface Character {
  name: string
  quote: string
  image: string
  backdropPosition: { [key: string]: string }
  sliderImage: string
  dollImage: string
}
