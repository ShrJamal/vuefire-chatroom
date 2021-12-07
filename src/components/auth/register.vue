<template>
  <Form
    class="auth register"
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ errors }"
  >
    <h1>Welcome</h1>
    <Field
      v-model="form.username"
      type="text"
      required
      placeholder="Display Name"
      as="input"
      rules="required|email"
      name="username"
    />
    <span class="error">{{ errors.username }}</span>

    <Field
      v-model="form.email"
      as="input"
      name="email"
      type="email"
      placeholder="Email"
    />
    <span class="error">{{ errors.email }}</span>

    <Field
      v-model="form.password"
      as="input"
      name="password"
      type="password"
      placeholder="Password"
    />
    <span class="error">{{ errors.password }}</span>

    <h4 class="error">{{ error }}</h4>

    <button>
      {{ isLoading ? 'Loading...' : 'Sign Up' }}
    </button>
  </Form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRegisterStore } from 'store/auth/register'
import { useAuthStore } from 'store/auth'
import type { RegisterForm } from 'types/auth/form'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { storeToRefs } from 'pinia'

const registerStore = useRegisterStore()
const form = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
})
const isLoading = computed(() => useAuthStore().isLoading)
function onSubmit() {
  if (isLoading.value) return
  registerStore.register(form)
}
const { error } = storeToRefs(registerStore)
const schema = {
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
}
</script>
