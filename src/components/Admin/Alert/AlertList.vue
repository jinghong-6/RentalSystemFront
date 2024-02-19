<template>
    <div class="alertList">
        <div class="alertList-title">我的通知</div>
        <div class="alertList-list">
            <div class="alertList-list-item" @click="toAlert(alert.id)" v-for="alert in AlertList">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-value">{{ alert.content }}</div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text" v-if="alert.user_type == '1'">用户 · {{alert.userName}}</div>
                        <div class="alertList-list-item-left-info-text" v-if="alert.user_type == '2'">房东 · {{alert.userName}}</div>
                        <div class="alertList-list-item-left-info-time">{{alert.create_time}}</div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag" v-if="alert.alert_status == 1">已读</div>
                    <div class="alertList-list-item-right-flag2" v-if="alert.alert_status == 0">未读</div>
                </div>
            </div>
            <div class="alertList-null" v-if="showFlag">
                当前暂无通知
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import router from '@/router/router';
import { getAdminAlert } from '@/api/Admin';
import useStore from '@/utils/userInfo';

let userInfoStore = useStore()
let AlertList = ref()
let showFlag = ref(!false)
let pollingInterval;

onMounted(() => {
    startPolling();
});

onBeforeUnmount(() => {
    stopPolling();
});

function startPolling() {
    // 设置轮询间隔（毫秒为单位），例如，每5分钟
    const pollingIntervalTime = 5 * 1000;
    
    pollingInterval = setInterval(() => {
        getAlert();
    }, pollingIntervalTime);

    // 初始调用getAlert
    getAlert();
}

function stopPolling() {
    clearInterval(pollingInterval);
}

function getAlert() {
    let token = localStorage.getItem('aatt')
    getAdminAlert(token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                let data = res.data
                if (data.code == 902) {
                    for (let i = 0; i < data.data.length; i++) {
                        data.data[i].create_time = data.data[i].create_time.substring(0,10)
                    }
                    AlertList.value = data.data
                    showFlag.value = false
                }
                if(data.code == 802){
                    showFlag.value = true
                }
            }
        }
    )
}

function toAlert(id) {
    router.push("/admin/AlertView/" + id)
}
</script>

<style scoped>
.alertList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.alertList-title {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(151, 205, 230);
    color: var(--main-color);
    font-size: 2rem;
    font-weight: 800;
    flex-shrink: 0;
}

.alertList-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100% - 70px);
    overflow-y: auto;
}

.alertList-list-item {
    height: 90px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(197, 197, 197);
    cursor: pointer;
    transition: all 0.5s;
}

.alertList-list-item:hover {
    background-color: rgb(226, 226, 226);
    border-bottom: 1px solid var(--main-blue);
}

.alertList-list-item-left {
    display: flex;
    flex-direction: column;
}

.alertList-list-item-left-value {
    padding-top: 5px;
    font-size: 1.3rem;
    color: rgb(78, 78, 78);
}

.alertList-list-item-left-info {
    padding-top: 10px;
    display: flex;
}

.alertList-list-item-left-info-text {
    color: var(--main-blue);
}

.alertList-list-item-left-info-time {
    margin-left: 25px;
}

.alertList-list-item-right-flag {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(67, 212, 75);
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    border-radius: 10px;
}

.alertList-list-item-right-flag2{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    border-radius: 10px;
}

.alertList-null{
    width: 100%;
    height: 100%;
    padding-top: 25px;
    color: rgb(136, 136, 136);
    display: flex;
    justify-content: center;
}
</style>