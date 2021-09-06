<script setup lang="ts">
import { onUnmounted, ref, onUpdated } from 'vue'
import NavBar from '@/navbar.vue'
import Message from '@/chat/message.vue'
import ChatInput from '@/chat/input.vue'
import { useChatStore } from 'store/chat'
import { storeToRefs } from 'pinia'

const chatContainer = ref()
onUpdated(
  () => (chatContainer.value.scrollTop = chatContainer.value.scrollHeight),
)
onUnmounted(() => unSub())
const store = useChatStore()
const { chats } = storeToRefs(store)
const unSub = store.chatsStream()
</script>

<template>
  <NavBar />
  <div class="container">
    <div class="chat-container" ref="chatContainer">
      <Message v-for="c in chats" :key="c.id" :msg="c" />
    </div>
    <ChatInput @send="store.sendMessage" />
  </div>
</template>

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
