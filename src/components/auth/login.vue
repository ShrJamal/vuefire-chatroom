<template>
  <form class="auth login" :action="onSubmit">
    <h1>Welcome</h1>
    <input type="email" required placeholder="Email" v-model="form.email" />
    <input
      type="password"
      required
      placeholder="Password"
      v-model="form.password"
    />
    <h4 class="error">{{ error }}</h4>

    <button @click.prevent="onSubmit">
      {{ isLoading ? 'Loading...' : 'Login' }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useLoginStore } from '@/store/auth/login.ts'
import { LoginForm } from '@/@types/auth'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  setup() {
    const loginStore = useLoginStore()
    const form = reactive<LoginForm>({
      email: '',
      password: '',
    })
    const isLoading = computed(() => useAuthStore().isLoading)
    function onSubmit(e: Event) {
      if (isLoading.value) return
      e.preventDefault()
      loginStore.login(form)
    }

    return {
      form,
      isLoading,
      error: computed(() => loginStore.error),
      onSubmit,
    }
  },
})
</script>
