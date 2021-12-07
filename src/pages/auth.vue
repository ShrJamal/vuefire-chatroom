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

<script setup lang="ts">
import { ref } from 'vue'
import Login from '@/auth/login.vue'
import Register from '@/auth/register.vue'

const showLogin = ref(false)
</script>
