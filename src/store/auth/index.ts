import type AuthUser from 'types/auth/user'
import { userDoc } from 'utils/firebase'
import { getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { auth } from '../../utils/firebase'
import { reactive, toRefs } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    authInit: false,
    user: null as AuthUser | null,
    isLoading: false,
  })
  async function fetchUser() {
    state.isLoading = true
    try {
      const uid = auth.currentUser?.uid
      if (!uid) {
        state.user = null
        throw new Error('User not logged')
      }
      const data = (await getDoc(userDoc(uid))).data()
      if (!data) {
        throw new Error('Ooops, Cannot found User')
      }

      state.user = {
        uid,
        username: data.username,
        email: data.email,
        photoURl: data.photoURl,
      }
    } catch (e) {
      return `${e}`
    } finally {
      state.isLoading = false
      if (!state.authInit) {
        state.authInit = true
      }
    }
  }

  async function logout() {
    await auth.signOut()
  }

  return {
    ...toRefs(state),
    fetchUser,
    logout,
  }
})
