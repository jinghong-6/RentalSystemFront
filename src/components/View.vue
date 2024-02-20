<template>
    <div class="container">
        <Header></Header>
        <div class="container2">
            <RouterView></RouterView>
        </div>
    </div>
</template>
  
<script setup>
import Header from './Header.vue';

</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.container2{
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: row;
}
</style>