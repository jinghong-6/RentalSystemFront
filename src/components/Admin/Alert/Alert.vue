<template>
    <div class="alertView">
        <div class="alertView-title">我的通知</div>
        <div class="alertView-item" v-if="AlertInfo != undefined">
            <div class="alertView-item-title">
                <div class="alertView-item-title-text">{{AlertInfo.title}}</div>
                <div class="alertView-item-title-text2">
                    <span class="alertList-list-item-left-info-text" v-if="AlertInfo.user_type == '1'">用户 · {{AlertInfo.userName}}</span>
                        <span class="alertList-list-item-left-info-text" v-if="AlertInfo.user_type == '2'">房东 · {{AlertInfo.userName}}</span>
                    <span class="alertTime">{{AlertInfo.create_time}}</span>
                </div>
            </div>
            <div class="alertView-item-value">
                {{AlertInfo.content}}
            </div>
        </div>
        <div class="alertView-bottom">
            <div class="alertView-bottom-button" @click="back">
                返回
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/router';
import { useRoute } from 'vue-router'
import { getAdminAlertById,readAdminAlertByAlertId } from '@/api/Admin';

const route = useRoute()
let id = route.params.id
let AlertInfo = ref()

onMounted(() => {
    if (id == "" || id == null || id == undefined) {
        router.push("/")
    }
    getAlert()
})

function getAlert() {
    let token = localStorage.getItem('aatt')
    let data = {
        AlertId:id
    }
    getAdminAlertById(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == 902) {
                    res.data.data.create_time = res.data.data.create_time.replace('T', ' ')
                    AlertInfo.value = res.data.data
                    if (AlertInfo.value.alert_status == '0') {
                        read()
                    }
                    console.log(AlertInfo.value)
                }
            }
        }
    )
}

function read() {
    let token = localStorage.getItem('aatt')
    let data = {
        AlertId:id
    }
    readAdminAlertByAlertId(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
            }
        }
    )
}

function back() {
    router.push("/admin/Alert")
}
</script>

<style scoped>
.alertView {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(238, 238, 238);
}

.alertView-title {
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

.alertView-item {
    height: calc(100% - 130px);
    overflow-y: auto;
    /* width: 100%; */
    margin: 10px;
    border: 1px solid rgb(196, 196, 196);
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
}

.alertView-item-title {
    height: 40px;
    width: 98%;
    border-bottom: 1px solid rgb(196, 196, 196);
}

.alertView-item-title-text {
    margin-top: 10px;
    font-size: 1.9rem;
}

.alertView-item-title-text2 {
    font-size: 0.8rem;
    color: var(--main-blue);
}

.alertTime {
    margin-left: 15px;
    color: rgb(107, 107, 107);
}

.alertView-item-value {
    width: 98%;
    padding-top: 20px;
}

.alertView-bottom {
    padding-left: 10px;
    height: 40px;
}

.alertView-bottom-button {
    width: 70px;
    padding: 7px;
    display: flex;
    justify-content: center;
    background-color: var(--main-color);
    color: white;
    font-weight: 800;
    font-size: 1.1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
}

.alertView-bottom-button:hover {
    background-color: rgb(187, 33, 72);
}
</style>