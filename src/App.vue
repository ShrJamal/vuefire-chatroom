<script setup lang="ts">
import { onUnmounted } from 'vue'
import { auth } from 'utils/firebase'
import { useAuthStore } from 'store/auth/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useAuthStore()
const unSubscribe = auth.onAuthStateChanged(async () => {
  if (await store.fetchUser()) {
    router.push({ name: 'Auth' })
  } else {
    router.push('/')
  }
})
onUnmounted(() => unSubscribe())
</script>

<template>
  <h1 v-show="!store.authInit">Loading...</h1>
  <router-view v-show="store.authInit" />
</template>
