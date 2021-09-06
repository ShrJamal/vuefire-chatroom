<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'send', value: string): void
}>()

const input = ref('')
function onSend() {
  emit('send', input.value)
  input.value = ''
}
</script>

<template>
  <form @keypress.enter.prevent="onSend">
    <textarea
      v-model="input"
      @submit="onSend"
      name="value"
      placeholder="Type Message..."
      rows="2"
    />
    <button @click.prevent="onSend">Send</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  padding: 8px 0 0 0;
}
textarea {
  display: inline;
  min-height: 20px;
  width: 100%;
  padding: 10px 5px;
  margin-right: 10px;
  border-radius: 10px;
  border-color: rgb(212, 208, 208);
}
</style>
