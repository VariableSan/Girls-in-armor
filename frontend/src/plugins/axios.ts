import AxiosInstance from "axios"
import { env } from "process"

export const axios = AxiosInstance.create({
  baseURL: env.BASE_URL,
})
