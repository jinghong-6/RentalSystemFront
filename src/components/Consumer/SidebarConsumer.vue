<template>
    <div class="sidebarIndex">
        <RouterLink to="/consumer">
            <div class="sidebarIndex-item" @click="PageSwitching(page1)" ref="page1">个人中心</div>
        </RouterLink>
        <RouterLink to="/consumer/Alert">
            <div class="sidebarIndex-item" @click="PageSwitching(page2)" ref="page2">我的通知</div>
        </RouterLink>
        <RouterLink to="/consumer/Collection">
            <div class="sidebarIndex-item" @click="PageSwitching(page3)" ref="page3">我的收藏</div>
        </RouterLink>
        <RouterLink to="/consumer/Orders">
            <div class="sidebarIndex-item" @click="PageSwitching(page4)" ref="page4">我的订单</div>
        </RouterLink>
        <RouterLink to="/consumer/Comment">
            <div class="sidebarIndex-item" @click="PageSwitching(page5)" ref="page5">我的评价</div>
        </RouterLink>
        <div class="sidebarIndex-item" @click="PageSwitching(page6); logout()" ref="page6">退出登录</div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/router';
import useStore from '@/utils/userInfo';
import useStore2 from '@/utils/landInfo';

let userInfoStore = useStore()
let landInfoStore = useStore2()

let page1 = ref()
let page2 = ref()
let page3 = ref()
let page4 = ref()
let page5 = ref()
let page6 = ref()

onMounted(() => {
    page1.value.style.color = "rgb(255, 109, 146)"
    page1.value.style.backgroundColor = "rgb(217, 237, 250)"
})

const PageSwitching = (selectedPage) => {
    [page1, page2, page3, page4, page5, page6].forEach((page) => {
        if (page.value === selectedPage) {
            page.value.style.color = "rgb(255, 109, 146)"
            page.value.style.backgroundColor = "rgb(217, 237, 250)"
        } else {
            page.value.style.color = "rgb(243, 39, 90)"
            page.value.style.backgroundColor = "rgb(245, 251, 255)"
        }
    });
};

function logout() {
    localStorage.setItem('TE', '');
    localStorage.setItem('UT', '');
    localStorage.setItem('AT', '');
    localStorage.setItem('RT', '');
    userInfoStore.$reset();
    userInfoStore.loginFlag = '0'
    landInfoStore.$reset();
    landInfoStore.loginFlag = '0'
    router.push('/');
}
</script>

<style scoped>
.sidebarIndex {
    width: 100px;
    min-width: 100px;
    height: 100%;
    background-color: rgb(245, 251, 255);
    z-index: 11;
    display: flex;
    flex-direction: column;
}

.sidebarIndex-item {
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

.sidebarIndex-item:hover {
    color: rgb(255, 109, 146);
    background-color: rgb(217, 237, 250);
    cursor: pointer;
}
</style>