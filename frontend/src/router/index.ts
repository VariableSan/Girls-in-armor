import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user-store"
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
            meta: {
              toDetailRoute: RouterKeys.WAIFU_DETAIL,
            },
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
          {
            path: "add",
            name: RouterKeys.WAIFU_ADDING,
            component: () =>
              import(
                /* webpackChunkName: "waifu-page" */ "@/views/waifu/WaifuAdding.vue"
              ),
            beforeEnter(to, from, next) {
              const userStore = useUserStore()
              if (userStore.isAuth) {
                return next()
              }
              next({ name: RouterKeys.LOGIN_PAGE })
            },
          },
        ],
      },
      {
        path: "/moderate",
        name: RouterKeys.MODERATE_INDEX,
        component: () =>
          import(
            /* webpackChunkName: "moderate-page" */ "@/views/waifu/WaifuIndex.vue"
          ),
        meta: {
          moderateMode: true,
        },
        children: [
          {
            path: "",
            name: RouterKeys.MODERATE_PAGE,
            meta: {
              toDetailRoute: RouterKeys.MODERATE_DETAIL,
            },
            component: () =>
              import(
                /* webpackChunkName: "moderate-page" */ "@/views/waifu/WaifuPage.vue"
              ),
          },
          {
            path: ":id",
            meta: {
              backToListRoute: RouterKeys.MODERATE_PAGE,
              moderateMode: true,
            },
            name: RouterKeys.MODERATE_DETAIL,
            props: true,
            component: import(
              /* webpackChunkName: "moderate-page" */ "@/views/waifu/WaifuDetail.vue"
            ),
          },
        ],
        beforeEnter(to, from, next) {
          const userStore = useUserStore()
          const mainStore = useMainStore()
          if (userStore.user?.permission) {
            next()
          } else {
            next({ name: RouterKeys.WAIFU_PAGE })
            mainStore.setMessage({
              text: "You don't have permission",
              color: "warning",
            })
          }
        },
      },
    ],
  },
  {
    path: "/auth",
    component: import(
      /* webpackChunkName: "minimalistic-layout" */ "@/layouts/LoginLayout.vue"
    ),
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
    redirect: {
      name: RouterKeys.LOGIN_PAGE,
    },
    children: [
      {
        path: "login",
        name: RouterKeys.LOGIN_PAGE,
        component: () =>
          import(/* webpackChunkName: "login-page" */ "@/views/LoginPage.vue"),
      },
      {
        path: "register",
        name: RouterKeys.REGISTER_PAGE,
        component: () =>
          import(
            /* webpackChunkName: "register-page" */ "@/views/RegisterPage.vue"
          ),
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
