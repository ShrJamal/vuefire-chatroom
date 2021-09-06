<template>
  <nav>
    <div class="info">
      <p>Hey There {{ user.username }}</p>
      <p class="email">Currently Logged in as {{ user.email }}</p>
    </div>
    <button @click="logout">Logout</button>
  </nav>
</template>

<script lang="ts">
import { useAuthStore } from 'store/auth'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    return { user: authStore.user!, logout: authStore.logout }
  },
})
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  align-content: space-between;
  background-color: white;
  margin: 0;
  padding: 10px;
}
.info {
  flex: 1;
}

.email {
  color: rgb(136, 134, 134);
  font-size: 14px;
}
</style>
