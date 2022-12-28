import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { RouterKeys } from "./router-keys"

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: RouterKeys.HOME_PAGE,
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "waifu",
        name: RouterKeys.WAIFU_INDEX,
        component: () => import("@/views/waifu/WaifuIndex.vue"),
        children: [
          {
            path: "",
            name: RouterKeys.WAIFU_PAGE,
            component: () => import("@/views/waifu/WaifuPage.vue"),
          },
          {
            path: ":id",
            name: RouterKeys.WAIFU_DETAIL,
            meta: {
              backToListRoute: "",
            },
            props: true,
            component: () => import("@/views/waifu/WaifuDetail.vue"),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
