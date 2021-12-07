<template>
  <div class="msg">
    <h6 class="date">{{ format(msg?.createdAt) }}</h6>
    <span class="username">{{ msg?.username }}: </span>
    <span class="content">{{ msg?.content }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from 'types/chatroom/message'
import { format } from 'timeago.js'

const { msg } = defineProps({
  msg: {
    type: Object as () => ChatMessage,
    required: true,
  },
})
</script>

<style scoped>
.msg {
  text-align: left;
}
.username {
  font-weight: bold;
  font-size: 14px;
}
.date {
  margin-top: 12px;
  margin-bottom: 0px;
}
</style>
