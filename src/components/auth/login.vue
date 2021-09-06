<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useLoginStore } from 'store/auth/login'
import { useAuthStore } from 'store/auth'
import { Field, Form } from 'vee-validate'
import { LoginForm } from 'types/auth/form'
import * as yup from 'yup'

const loginStore = useLoginStore()
const form = reactive<LoginForm>({ email: '', password: '' })

const isLoading = computed(() => useAuthStore().isLoading)
function onSubmit() {
  if (isLoading.value) return
  loginStore.login(form)
}

const error = computed(() => loginStore.error)
const schema = {
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
}
</script>

<template>
  <Form
    class="auth login"
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ errors }"
  >
    <h1>Welcome</h1>
    <Field
      v-model="form.email"
      as="input"
      rules="required|email"
      name="email"
      type="email"
      placeholder="Email"
    />
    <span class="error">{{ errors.email }}</span>

    <Field
      v-model="form.password"
      as="input"
      rules="required|min:7"
      name="password"
      type="password"
      placeholder="Password"
    />
    <span class="error">{{ errors.password }}</span>

    <h4 class="error">{{ error }}</h4>

    <button>
      {{ isLoading ? 'Loading...' : 'Login' }}
    </button>
    <!-- <pre>{{ vv }}</pre> -->
  </Form>
</template>
