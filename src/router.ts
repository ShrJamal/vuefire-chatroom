import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from 'store/auth/index'
import { pinia } from 'store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ChatRoom',
      component: () => import('~/pages/chatroom.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('~/pages/auth.vue'),
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
