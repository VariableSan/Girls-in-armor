import { RouterKeys } from "@/router/router-keys"
import { Waifu } from "@/types/common"
import { defineStore } from "pinia"
import swal from "sweetalert2"
import { useMainStore } from "."
import { useAxiosStore } from "./axios-store"

type ModeType = "waifu" | "moderate"

export const useWaifuStore = defineStore("waifu", () => {
  const mainStore = useMainStore()
  const axiosStore = useAxiosStore()
  const router = useRouter()

  /* ==================== refs START ==================== */
  const waifuList = ref<Waifu[]>([])
  const pagination = ref(1)
  const totalPages = ref(0)
  const mode = ref<ModeType>("waifu")
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
      mode.value = "waifu"
    } finally {
      mainStore.globalLoading = false
    }
  }

  const saveWaifu = async (character: Partial<Waifu>) => {
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
      mainStore.setMessage(message)
      if (routeLink) {
        return router.push({ name: routeLink })
      }
      getWaifuListFromServer()
    } finally {
      mainStore.globalLoading = false
    }
  }

  const getModerateListFromServer = async () => {
    mainStore.globalLoading = true
    try {
      const res = await axiosStore.post("/moderate/list", {
        page: pagination.value,
        limit: 12,
      })
      const moderates = res.data
      waifuList.value = moderates.docs
      totalPages.value = moderates.totalPages
      mode.value = "moderate"
    } finally {
      mainStore.globalLoading = false
    }
  }

  const rejectWaifu = async (id: string, routeLink?: RouterKeys) => {
    const userConfirm = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
      scrollbarPadding: false,
    })
    if (!userConfirm.value) {
      return
    }
    mainStore.globalLoading = true
    try {
      const res = await axiosStore.delete("/moderate/remove", {
        data: {
          id,
        },
      })
      const message = res.data
      mainStore.setMessage(message)
      if (routeLink) {
        return router.push({ name: routeLink })
      }
      getModerateListFromServer()
    } finally {
      mainStore.globalLoading = false
    }
  }

  const acceptWaifu = async (id: string, routeLink?: RouterKeys) => {
    const userConfirm = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
      scrollbarPadding: false,
    })
    if (!userConfirm.value) {
      return
    }

    mainStore.globalLoading = true
    try {
      const res = await axiosStore.post("/moderate/add", {
        id,
      })
      const message = res.data
      mainStore.setMessage(message)
      if (routeLink) {
        return router.push({ name: routeLink })
      }
      getModerateListFromServer()
    } finally {
      mainStore.globalLoading = false
    }
  }

  const clearWaifuData = () => {
    waifuList.value = []
    pagination.value = 1
    totalPages.value = 0
  }
  /* ==================== methods END ==================== */

  return {
    waifuList,
    pagination,
    totalPages,
    mode,

    removeWaifu,
    saveWaifu,
    getWaifuListFromServer,
    setWaifuList,
    setPagination,
    getModerateListFromServer,
    rejectWaifu,
    acceptWaifu,
    clearWaifuData,
  }
})
