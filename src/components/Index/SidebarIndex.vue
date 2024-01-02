<template>
    <div class="sidebarIndex">
        <RouterLink to="/">
            <div class="sidebarIndex-item" @click="PageSwitching(page1)" ref="page1">首页</div>
        </RouterLink>
        <RouterLink to="/index/house">
            <div class="sidebarIndex-item" @click="PageSwitching(page2)" ref="page2">民宿中心</div>
        </RouterLink>
        <RouterLink to="/index/contact">
            <div class="sidebarIndex-item" @click="PageSwitching(page3)" ref="page3">联系我们</div>
        </RouterLink>
    </div>
</template>
  
<script setup>
import { ref,onMounted } from 'vue';

let page1 = ref()
let page2 = ref()
let page3 = ref()

onMounted(()=>{
    page1.value.style.color = "rgb(255, 109, 146)"
    page1.value.style.backgroundColor = "rgb(217, 237, 250)"
})

const PageSwitching = (selectedPage) => {
      [page1, page2, page3].forEach((page) => {
        if (page.value === selectedPage) {
            page.value.style.color = "rgb(255, 109, 146)"
            page.value.style.backgroundColor = "rgb(217, 237, 250)"
        } else {
            page.value.style.color = "rgb(243, 39, 90)"
            page.value.style.backgroundColor = "rgb(245, 251, 255)"
        }
      });
    };
</script>

<style scoped>
.sidebarIndex {
    width: 100px;
    min-width: 100px;
    height: 100vh;
    background-color: rgb(245, 251, 255);
    /* z-index: 10; */
    display: flex;
    flex-direction: column;
    /* position: fixed; */
    /* margin-top: 100px; */
}

.sidebarIndex-item{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 18px;
    color: rgb(243, 39, 90);
    /* border-bottom: 1px solid rgb(189, 201, 252); */
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.sidebarIndex-item:hover{
    color: rgb(255, 109, 146);
    background-color: rgb(217, 237, 250);
    cursor: pointer;
}
</style>