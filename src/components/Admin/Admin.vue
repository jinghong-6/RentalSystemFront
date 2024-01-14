<template>
  <div class="container">
    <Header></Header>
    <div class="container2">
      <SidebarLandlord></SidebarLandlord>
      <div class="admin">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import Header from './Header.vue';
import SidebarLandlord from './SidebarAdmin.vue';
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.container2 {
  width: 100%;
  height: calc(100vh - 100px);
  /* height: 100%; */
  display: flex;
  flex-direction: row;
  /* overflow: hidden; */
}

.admin {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>