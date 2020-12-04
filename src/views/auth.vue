<template>
  <div class="container">
    <template class="auth" v-if="showLogin">
      <Login />
      <h5>
        Dont have account yet?
        <span class="link" @click="showLogin = false">Sign up</span>
      </h5>
    </template>

    <template class="auth" v-else>
      <Register />
      <h5>
        Already registered?
        <span class="link" @click="showLogin = true">Login</span>
      </h5>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Login from '@/components/auth/login.vue'
import Register from '@/components/auth/register.vue'

export default defineComponent({
  name: 'Auth',
  components: {
    Login,
    Register,
  },
  setup() {
    const showLogin = ref(false)
    return { showLogin }
  },
})
</script>

<style scoped></style>
