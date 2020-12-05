<template>
  <form @keypress.enter.prevent="onSend">
    <textarea
      v-model="value"
      @submit="onSend"
      name="value"
      placeholder="Type Message..."
      rows="2"
    />
    <button @click.prevent="onSend">Send</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    value: '',
  }),
  emits: ['send'],
  methods: {
    onSend(e: Event) {
      e.preventDefault()
      this.$emit('send', this.value)
      this.value = ''
    },
  },
})
</script>

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
