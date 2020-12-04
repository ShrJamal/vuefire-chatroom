<template>
  <router-view v-show="store.authInit" />
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import { auth } from '@/utils/firebase'
import type { Unsubscribe } from '@/utils/firebase.ts'
import { useAuthStore } from '@/store/auth/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    let unSubscribe: Unsubscribe
    onUnmounted(() => unSubscribe())

    const router = useRouter()
    const store = useAuthStore()
    unSubscribe = auth.onAuthStateChanged(async () => {
      console.log('----onAuthStateChanged ')
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
