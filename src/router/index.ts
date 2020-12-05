import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth/index'
import { pinia } from '../store/index'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "Home" */ '../views/chatroom.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () =>
        import(/* webpackChunkName: "Auth" */ '../views/auth.vue'),
    },
  ],
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore(pinia)

  if (to.name !== 'Auth' && !authStore.user) next({ name: 'Auth' })
  else if (to.name === 'Auth' && authStore.user) next('/')
  else next()
})

export default router
