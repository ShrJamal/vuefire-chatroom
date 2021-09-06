import { defineStore } from 'pinia'
import { chatCol, chatDoc } from 'utils/firebase'
import { useAuthStore } from '../auth/index'
import { ChatMessage, chatMsgfromDoc } from 'types/chatroom/message'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { setDoc } from 'firebase/firestore'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    chats: Array<ChatMessage>(),
  }),
  getters: {
    user: () => useAuthStore().user,
  },
  actions: {
    chatsStream() {
      return onSnapshot(query(chatCol, orderBy('createdAt', 'desc')), {
        next: (snap) => {
          this.chats = snap.docs
            .map((d) => chatMsgfromDoc(d.data()))
            .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
        },
        error(err) {
          console.error(err)
        },
      })
    },
    async sendMessage(message: string) {
      if (!this.user || !message) return

      const msg: ChatMessage = {
        id: `${new Date().getTime()}-${this.user.username}`,
        username: this.user.username,
        content: message,
        createdAt: new Date(),
      }
      this.chats = [msg, ...this.chats]
      message = ''

      setDoc(chatDoc(msg.id), msg)
    },
  },
})
