<script lang="ts" setup>
import { RouterKeys } from "@/router/router-keys"
import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user"

const userStore = useUserStore()
const mainStore = useMainStore()
const router = useRouter()

onMounted(() => {
  userStore.logout()
  mainStore.setMessage({
    text: "You are successfully logged out",
    color: "success",
  })
  router.push({
    name: RouterKeys.HOME_PAGE,
  })
})
</script>
