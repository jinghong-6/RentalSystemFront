<template>
  <div>
    <h1>WebSocket Example</h1>
    <div v-if="message">{{ message }}</div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';



onMounted(() => {
  // WebSocket 连接会自动尝试建立连接
});
</script>

<style scoped></style>