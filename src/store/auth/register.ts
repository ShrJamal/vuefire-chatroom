import { RegisterForm } from 'types/auth/form'
import { auth, userDoc } from 'utils/firebase'
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from 'firebase/auth'
import { setDoc } from 'firebase/firestore/lite'
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
        const fUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        const uid = fUser.user?.uid
        if (!uid) {
          throw new Error('Ooops uid is null')
        }
        updateCurrentUser(auth, { ...fUser.user, displayName: username })
        setDoc(userDoc(uid), {
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
