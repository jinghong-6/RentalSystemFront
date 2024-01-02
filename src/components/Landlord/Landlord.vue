<template>
    <SidebarLandlord></SidebarLandlord>
    <div class="landlord">
        <RouterView></RouterView>
    </div>
</template>
  
<script setup>
import SidebarLandlord from './SidebarLandlord.vue';

</script>

<style scoped>
.landlord{
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>