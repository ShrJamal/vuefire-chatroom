<template>
  <div class="msg">
    <h6 class="date">{{ format(msg?.createdAt) }}</h6>
    <span class="username">{{ msg?.username }}: </span>
    <span class="content">{{ msg?.content }}</span>
  </div>
</template>

<script lang="ts">
import { ChatMessage } from '@/@types/chatroom/message'
import { defineComponent } from 'vue'
import { format } from 'timeago.js'
export default defineComponent({
  props: {
    msg: {
      type: Object as () => ChatMessage,
      required: true,
    },
  },
  setup() {
    return { format }
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
