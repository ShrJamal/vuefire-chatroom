import { defineStore } from 'pinia'
import { chatCol, chatDoc } from 'utils/firebase'
import { useAuthStore } from '../auth/index'
import type { ChatMessage } from 'types/chatroom/message'
import { chatMsgfromDoc } from 'types/chatroom/message'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { setDoc } from 'firebase/firestore'
import { computed, reactive, toRefs } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const state = reactive({
    chats: Array<ChatMessage>(),
  })
  const user = computed(() => useAuthStore().user)

  function chatsStream() {
    return onSnapshot(query(chatCol, orderBy('createdAt', 'desc')), {
      next: (snap) => {
        state.chats = snap.docs
          .map((d) => chatMsgfromDoc(d.data()))
          .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
      },
      error(err) {
        console.error(err)
      },
    })
  }
  async function sendMessage(message: string) {
    if (!user || !message) return

    const msg: ChatMessage = {
      id: `${new Date().getTime()}-${user.value!.username}`,
      username: user.value!.username,
      content: message,
      createdAt: new Date(),
    }
    state.chats = [...state.chats, msg]
    message = ''

    setDoc(chatDoc(msg.id), msg)
  }
  return {
    ...toRefs(state),
    user,
    sendMessage,
    chatsStream,
  }
})
