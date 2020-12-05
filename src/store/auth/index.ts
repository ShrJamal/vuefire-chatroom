import AuthUser from '@/@types/auth/user'
import { db } from '@/utils/firebase'
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
        const userDoc = (await db.doc(`users/${uid}`).get()).data()
        if (!userDoc) {
          throw new Error('Ooops, Cannot found User')
        }

        this.user = {
          uid,
          username: userDoc.username,
          email: userDoc.email,
          photoURl: userDoc.photoURl,
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
      console.log('----Logout')
      await auth.signOut()
    },
  },
})
