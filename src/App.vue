<template>
  <h1 v-show="!store.authInit">Loading...</h1>
  <router-view v-show="store.authInit" />
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import { auth } from 'utils/firebase'
import { useAuthStore } from 'store/auth/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    onUnmounted(() => unSubscribe())

    const router = useRouter()
    const store = useAuthStore()
    const unSubscribe = auth.onAuthStateChanged(async () => {
      if (await store.fetchUser()) {
        router.push({ name: 'Auth' })
      } else {
        router.push('/')
      }
    })
    return { store }
  },
})
</script>
