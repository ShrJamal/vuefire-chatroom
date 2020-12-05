import { defineStore } from 'pinia'
import { auth } from '@/utils/firebase'
import { useAuthStore } from '@/store/auth/index'
import { LoginForm } from '../../@types/auth/form'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    error: '',
  }),
  actions: {
    async login({ email, password }: LoginForm) {
      const authStore = useAuthStore()
      authStore.isLoading = true
      this.error = ''
      try {
        const fUser = await auth.signInWithEmailAndPassword(email, password)
        const uid = fUser.user?.uid
        if (!uid) {
          throw new Error('Ooops uid is null')
        }
      } catch (e) {
        this.error = `${e}`
      }
      authStore.isLoading = false
    },
  },
})
