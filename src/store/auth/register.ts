import type { RegisterForm } from 'types/auth/form'
import { auth, userDoc } from 'utils/firebase'
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from 'firebase/auth'
import { setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useAuthStore } from '.'
import { ref } from 'vue'

export const useRegisterStore = defineStore('register', () => {
  const error = ref('')
  async function register({ email, password, username }: RegisterForm) {
    const authStore = useAuthStore()
    authStore.isLoading = true
    error.value = ''
    try {
      if (!email || !password) throw new Error('Wrong Email or Password')
      const fUser = await createUserWithEmailAndPassword(auth, email, password)
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
      error.value = `${e}`
    }
    authStore.isLoading = false
  }
  return { error, register }
})
