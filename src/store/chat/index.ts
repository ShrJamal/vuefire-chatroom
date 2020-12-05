import { defineStore } from 'pinia'
import { chatCol } from '../../utils/firebase'
import { useAuthStore } from '../auth/index'
import { ChatMessage, chatMsgfromDoc } from '@/@types/chatroom/message'

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
      return chatCol.orderBy('createdAt', 'desc').onSnapshot((snap) => {
        console.log('--snap', snap)
        this.chats = snap.docs
          .map((d) => chatMsgfromDoc(d.data()))
          .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
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
      // this.chats = [msg, ...this.chats]
      message = ''

      chatCol.doc(msg.id).set(msg)
    },
  },
})
