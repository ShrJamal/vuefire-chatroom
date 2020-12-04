<template>
  <form class="auth register" :action="onSubmit">
    <h1>Welcome</h1>
    <input
      type="text"
      required
      placeholder="Display Name"
      v-model="form.username"
    />
    <input type="email" required placeholder="Email" v-model="form.email" />
    <input
      type="password"
      required
      placeholder="Password"
      v-model="form.password"
    />
    <h4 class="error">{{ error }}</h4>
    <button @click="onSubmit">
      {{ isLoading ? 'Loading...' : 'Sign Up' }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRegisterStore } from '@/store/auth/register'
import { useAuthStore } from '@/store/auth'
import { RegisterForm } from '@/@types/auth'

export default defineComponent({
  setup() {
    const registerStore = useRegisterStore()
    const form = reactive<RegisterForm>({
      username: '',
      email: '',
      password: '',
    })
    const isLoading = computed(() => useAuthStore().isLoading)
    function onSubmit(e: Event) {
      e.preventDefault()
      registerStore.register(form)
    }
    return {
      form,
      isLoading,
      error: computed(() => registerStore.error),
      onSubmit,
    }
  },
})
</script>

<style></style>
