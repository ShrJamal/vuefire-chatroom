import { defineStore } from 'pinia'
import { auth } from 'utils/firebase'
import { useAuthStore } from 'store/auth/index'
import { LoginForm } from '../..@types/auth/form'
import { signInWithEmailAndPassword } from 'firebase/auth'

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
        const fUser = await signInWithEmailAndPassword(auth, email, password)
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
