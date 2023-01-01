import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { RouterKeys } from "./router-keys"

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: () =>
      import(
        /* webpackChunkName: "default-layout" */ "@/layouts/DefaultLayout.vue"
      ),
    meta: {
      title: "Girls in armor",
    },
    children: [
      {
        path: "",
        name: RouterKeys.HOME_PAGE,
        component: () =>
          import(/* webpackChunkName: "home-page" */ "@/views/HomePage.vue"),
      },
      {
        path: "waifu",
        name: RouterKeys.WAIFU_INDEX,
        component: () =>
          import(
            /* webpackChunkName: "waifu-page" */ "@/views/waifu/WaifuIndex.vue"
          ),
        children: [
          {
            path: "",
            name: RouterKeys.WAIFU_PAGE,
            component: () =>
              import(
                /* webpackChunkName: "waifu-page" */ "@/views/waifu/WaifuPage.vue"
              ),
          },
          {
            path: ":id",
            name: RouterKeys.WAIFU_DETAIL,
            meta: {
              backToListRoute: RouterKeys.WAIFU_PAGE,
            },
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "waifu-page" */ "@/views/waifu/WaifuDetail.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: import(
      /* webpackChunkName: "minimalistic-layout" */ "@/layouts/LoginLayout.vue"
    ),
    children: [
      {
        path: "",
        name: RouterKeys.LOGIN_PAGE,
        component: () =>
          import(/* webpackChunkName: "login-page" */ "@/views/LoginPage.vue"),
        beforeEnter(to, from, next) {
          const userStore = useUserStore()
          const mainStore = useMainStore()
          if (!userStore.isAuth) {
            return next()
          }
          mainStore.setMessage({
            text: "You are already registered in the system",
            color: "info",
          })
          next({ name: RouterKeys.HOME_PAGE })
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: RouterKeys.ERROR_PAGE,
    component: () =>
      import(/* webpackChunkName: "error-page" */ "@/views/ErrorPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }
  next()
})

export default router
