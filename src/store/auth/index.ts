import AuthUser from 'types/auth/user'
import { userDoc } from 'utils/firebase'
import { getDoc } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { auth } from '../../utils/firebase'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    authInit: false,
    user: null as AuthUser | null,
    isLoading: false,
  }),
  actions: {
    async fetchUser() {
      this.isLoading = true
      try {
        const uid = auth.currentUser?.uid
        if (!uid) {
          this.user = null
          throw new Error('User not logged')
        }
        const data = (await getDoc(userDoc(uid))).data()
        if (!data) {
          throw new Error('Ooops, Cannot found User')
        }

        this.user = {
          uid,
          username: data.username,
          email: data.email,
          photoURl: data.photoURl,
        }
      } catch (e) {
        return `${e}`
      } finally {
        this.isLoading = false
        if (!this.authInit) {
          this.authInit = true
        }
      }
    },

    async logout() {
      await auth.signOut()
    },
  },
})
