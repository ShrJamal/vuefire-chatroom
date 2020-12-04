<template>
  <NavBar />
  <div class="container">
    <h1>Welcome</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/navbar.vue'
export default defineComponent({
  components: {
    NavBar,
  },
})
</script>
