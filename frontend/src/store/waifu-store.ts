import { RouterKeys } from "@/router/router-keys"
import { Waifu } from "@/types/common"
import { defineStore } from "pinia"
import swal from "sweetalert2"
import { useMainStore } from "."
import { useAxiosStore } from "./axios-store"

export const useWaifuStore = defineStore("waifu", () => {
  const mainStore = useMainStore()
  const axiosStore = useAxiosStore()
  const router = useRouter()

  /* ==================== refs START ==================== */
  const waifuList = ref<Waifu[]>([])
  const pagination = ref(1)
  const totalPages = ref(0)
  /* ==================== refs END ==================== */

  /* ==================== methods START ==================== */
  const setWaifuList = (payload: Waifu[]) => {
    waifuList.value = payload
  }

  const setPagination = (payload: number) => {
    pagination.value = payload
  }

  const getWaifuListFromServer = async () => {
    mainStore.globalLoading = true
    try {
      const res = await axiosStore.post("/list", {
        page: pagination.value,
        limit: 12,
      })
      const waifus = res.data
      setWaifuList(waifus.docs)
      totalPages.value = waifus.totalPages
    } finally {
      mainStore.globalLoading = false
    }
  }
  const saveWaifu = async (character: Waifu) => {
    mainStore.globalLoading = true
    try {
      const res = await axiosStore.post("/add", character)
      const message = res.data
      mainStore.setMessage(message)
      router.push({ name: RouterKeys.WAIFU_PAGE })
    } finally {
      mainStore.globalLoading = false
    }
  }
  const removeWaifu = async (id: string, routeLink?: RouterKeys) => {
    const userConfirm = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      scrollbarPadding: false,
    })
    if (!userConfirm.value) {
      return
    }

    mainStore.globalLoading = true
    try {
      const res = await axiosStore.delete("/list/remove", {
        data: {
          id,
        },
      })
      const message = res.data

      getWaifuListFromServer()

      mainStore.setMessage(message)

      if (routeLink) {
        router.push({ name: routeLink })
      }
    } finally {
      mainStore.globalLoading = false
    }
  }
  /* ==================== methods END ==================== */

  return {
    waifuList,
    pagination,
    totalPages,

    removeWaifu,
    saveWaifu,
    getWaifuListFromServer,
    setWaifuList,
    setPagination,
  }
})
