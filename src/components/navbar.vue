<script setup lang="ts">
import { useAuthStore } from 'store/auth'

const authStore = useAuthStore()
const user = authStore.user!
const logout = authStore.logout
</script>

<template>
  <nav>
    <div class="info">
      <p>Hey There {{ user.username }}</p>
      <p class="email">Currently Logged in as {{ user.email }}</p>
    </div>
    <button @click="logout">Logout</button>
  </nav>
</template>

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
