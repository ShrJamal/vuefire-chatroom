import { RegisterForm } from '@/@types/auth/form'
import { auth, db } from '@/utils/firebase'
import { defineStore } from 'pinia'
import { useAuthStore } from '.'

export const useRegisterStore = defineStore({
  id: 'register',
  state: () => ({
    error: '',
  }),
  actions: {
    async register({ email, password, username }: RegisterForm) {
      const authStore = useAuthStore()
      authStore.isLoading = true
      this.error = ''
      try {
        if (!email || !password) throw new Error('Wrong Email or Password')
        const fUser = await auth.createUserWithEmailAndPassword(email, password)
        const uid = fUser.user?.uid
        if (!uid) {
          throw new Error('Ooops uid is null')
        }
        fUser.user?.updateProfile({
          displayName: username,
        })
        await db.doc(`users/${uid}`).set({
          uid,
          username,
          email,
        })
      } catch (e) {
        this.error = `${e}`
      }
      authStore.isLoading = false
    },
  },
})
