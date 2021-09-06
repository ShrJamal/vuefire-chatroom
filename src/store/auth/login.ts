import { defineStore } from 'pinia'
import { auth } from 'utils/firebase'
import { useAuthStore } from 'store/auth/index'
import { LoginForm } from 'types/auth/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { reactive, toRefs } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const state = reactive({
    error: '',
  })

  async function login({ email, password }: LoginForm) {
    const authStore = useAuthStore()
    authStore.isLoading = true
    state.error = ''
    try {
      const fUser = await signInWithEmailAndPassword(auth, email, password)
      const uid = fUser.user?.uid
      if (!uid) {
        throw new Error('Ooops uid is null')
      }
    } catch (e) {
      state.error = `${e}`
    }
    authStore.isLoading = false
  }
  return {
    ...toRefs(state),
    login,
  }
})
