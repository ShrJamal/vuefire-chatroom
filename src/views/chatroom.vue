<template>
  <NavBar />
  <div class="container">
    <div class="chat-container" ref="chatContainer">
      <Message v-for="c in chats" :key="c.id" :msg="c" />
    </div>
    <ChatInput @send="sendMessage" />
  </div>
</template>

<script>
import { defineComponent, onUnmounted, ref, computed, onUpdated } from 'vue'
import NavBar from '@/components/navbar.vue'
import Message from '@/components/chat/message.vue'
import ChatInput from '@/components/chat/input.vue'
import { useChatStore } from '@/store/chat'

export default defineComponent({
  components: {
    NavBar,
    Message,
    ChatInput,
  },
  setup() {
    const chatContainer = ref()
    onUpdated(
      () => (chatContainer.value.scrollTop = chatContainer.value.scrollHeight)
    )
    onUnmounted(() => unSub())
    const store = useChatStore()
    const unSub = store.chatsStream()

    return {
      sendMessage: store.sendMessage,
      chats: computed(() => store.chats),
      chatContainer,
    }
  },
})
</script>

<style scoped>
.container {
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.chat-container {
  margin-left: 20px;
  overflow: auto;
  flex: 1;
}
</style>
