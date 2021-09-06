import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth/index'
import { pinia } from '../store/index'
import ChatRoom from '@/views/chatroom.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ChatRoom,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () =>
        import(/* webpackChunkName: "Auth" */ '@/views/auth.vue'),
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
