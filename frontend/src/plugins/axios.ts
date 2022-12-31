import AxiosInstance from "axios"
export const axios = AxiosInstance.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})
