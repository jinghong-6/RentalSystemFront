<template>
    <div class="Orders">
        <div style="height: 100%;">
            <div class="Orders-title">
                <RouterLink to="/admin/Role" class="Orders-title-item aa">用户</RouterLink>
                <RouterLink to="/admin/Role/Landlord" class="Orders-title-item">房东</RouterLink>
            </div>
            <div class="Role-title-list">
                <div class="Role-title-list-img">头像</div>
                <div class="Role-title-list-acconut">账户</div>
                <div class="Role-title-list-name">用户名</div>
                <div class="Role-title-list-money">余额</div>
                <div class="Role-title-list-addr">地区</div>
                <div class="Role-title-list-qq">QQ</div>
                <div class="Role-title-list-wechat">Wechat</div>
                <div class="Role-title-list-status">状态</div>
                <div class="Role-title-list-register">注册时间</div>
                <div class="Role-title-list-take">操作</div>
            </div>
            <div class="Role-detail-border">
                <div class="Role-detail">
                    <div class="Orders-detail-null" v-if="!showFlag">
                        当前暂无用户
                    </div>
                    <div class="Orders-detail-item" v-for="consumer in Consumer" v-if="showFlag">
                        <div class="Orders-detail-item-img">
                            <img :src="consumer.img_url" alt="">
                        </div>
                        <div class="Orders-detail-item-account">{{ consumer.tele }}</div>
                        <div class="Orders-detail-item-name">{{ consumer.consumer_name }}</div>
                        <div class="Orders-detail-item-money">{{ consumer.money }}</div>
                        <div class="Orders-detail-item-addr">{{ consumer.province }}-{{ consumer.county }}</div>
                        <div class="Orders-detail-item-qq">{{ consumer.qq }}</div>
                        <div class="Orders-detail-item-wechat">{{ consumer.wechat }}</div>
                        <div class="Orders-detail-item-status">{{ consumer.consumer_status }}</div>
                        <div class="Orders-detail-item-register">{{ consumer.register_time }}</div>
                        <div class="Orders-detail-item-take">
                            <div class="Orders-detail-item-take-border">
                                <div class="Orders-detail-item-take-take-down" v-if="consumer.consumer_status == '正常'"
                                    @click="banned(consumer.id)">封禁</div>
                                <div class="Orders-detail-item-take-take-up" v-if="consumer.consumer_status != '正常'"
                                    @click="unbanned(consumer.id)">解封</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="UpdateDownSuccess" class="UpdateView">
                <div>
                    <svg t="1690093758693" class="UpdateView-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1725" width="200" height="200">
                        <path
                            d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zM512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"
                            fill="#24d930" p-id="1726"></path>
                        <path
                            d="M653.226667 357.205333L482.133333 593.493333l-91.392-126.250666a31.829333 31.829333 0 0 0-44.586666-7.082667 32.042667 32.042667 0 0 0-7.082667 44.714667l117.248 161.877333c6.4 8.789333 16.085333 13.226667 25.813333 13.226667a31.701333 31.701333 0 0 0 25.856-13.226667l196.906667-272a32.042667 32.042667 0 0 0-25.770667-50.773333 31.829333 31.829333 0 0 0-25.856 13.184z"
                            fill="#24d930" p-id="1727"></path>
                    </svg>
                </div>
                <div class="UpdateView-text">
                    封禁成功
                </div>
            </div>
            <div v-if="UpdateUpSuccess" class="UpdateView">
                <div>
                    <svg t="1690093758693" class="UpdateView-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1725" width="200" height="200">
                        <path
                            d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zM512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"
                            fill="#24d930" p-id="1726"></path>
                        <path
                            d="M653.226667 357.205333L482.133333 593.493333l-91.392-126.250666a31.829333 31.829333 0 0 0-44.586666-7.082667 32.042667 32.042667 0 0 0-7.082667 44.714667l117.248 161.877333c6.4 8.789333 16.085333 13.226667 25.813333 13.226667a31.701333 31.701333 0 0 0 25.856-13.226667l196.906667-272a32.042667 32.042667 0 0 0-25.770667-50.773333 31.829333 31.829333 0 0 0-25.856 13.184z"
                            fill="#24d930" p-id="1727"></path>
                    </svg>
                </div>
                <div class="UpdateView-text">
                    解封成功
                </div>
            </div>
            <div v-if="UpdateUpfail" class="UpdateView">
                <div class="UpdateView-text">
                    操作失败
                </div>
            </div>
            <div v-if="UpdateDownfail" class="UpdateView">
                <div class="UpdateView-text">
                    操作失败
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllConsumer, changeConsumerStatus } from '@/api/Admin';

let Consumer = ref([])
let showFlag = ref(false)
let UpdateDownSuccess = ref(false)
let UpdateDownfail = ref(false)
let UpdateUpSuccess = ref(false)
let UpdateUpfail = ref(false)

onMounted(() => {
    getConsumer()
})

function getConsumer() {
    let token = localStorage.getItem('aatt')
    getAllConsumer(token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                let data = res.data
                if (data.code == "902") {
                    Consumer.value = res.data.data
                    for (let i = 0; i < Consumer.value.length; i++) {
                        if (Consumer.value[i].consumer_status == 0) {
                            Consumer.value[i].consumer_status = "正常"
                        }
                        if (Consumer.value[i].consumer_status == 1) {
                            Consumer.value[i].consumer_status = "封禁"
                        }
                    }
                    showFlag.value = true
                }
                if (data.data == "未查询到用户") {
                    showFlag.value = false
                }
            }
        }
    )
}

function banned(id) {
    let token = localStorage.getItem('aatt')
    let data = {
        status: '1',
        id: id
    }
    changeConsumerStatus(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                let data = res.data
                if (data.code == "904") {
                    UpdateDownSuccess.value = true
                    getConsumer()
                    setTimeout(() => {
                        UpdateDownSuccess.value = false
                    }, 4500);
                } else {
                    UpdateDownfail.value = true
                    setTimeout(() => {
                        UpdateDownfail.value = false
                    }, 4500);
                }
            }
        }
    )
}

function unbanned(id) {
    let token = localStorage.getItem('aatt')
    let data = {
        status: '0',
        id: id
    }
    changeConsumerStatus(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                let data = res.data
                if (data.code == "904") {
                    UpdateUpSuccess.value = true
                    getConsumer()
                    setTimeout(() => {
                        UpdateUpSuccess.value = false
                    }, 4500);
                } else {
                    UpdateUpfail.value = true
                    setTimeout(() => {
                        UpdateUpfail.value = false
                    }, 4500);
                }
            }
        }
    )
}
</script>

<style scoped>
.Orders {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.Orders-title {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: rgb(151, 205, 230);
    color: white;
    flex-shrink: 0;

}

a {
    color: white;
}

.Orders-title-item {
    font-weight: 500;
    font-size: 1.5rem;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
    background-color: rgb(151, 205, 230);
    height: 100%;
    display: flex;
    align-items: center;
}

.Orders-title-item:hover {
    font-weight: 800;
    color: var(--main-color);
    background-color: rgb(139, 187, 211);
}

.aa {
    font-weight: 800;
    color: var(--main-color);
    background-color: rgb(139, 187, 211);
}

.Role-title-list {
    background-color: rgb(245, 251, 255);
    display: flex;
    width: calc(100% - 5px);
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    color: rgb(75, 75, 75);
    height: 20px;
}

.Role-title-list div {
    display: flex;
    font-size: 0.8rem;
    flex-shrink: 0;
    justify-content: center;
}

.Role-title-list-img,
.Orders-detail-item-img {
    width: 5%;
}

.Role-title-list-acconut,
.Orders-detail-item-account {
    width: 10%;
}

.Role-title-list-name,
.Orders-detail-item-name {
    width: 20%;
}

.Role-title-list-money,
.Orders-detail-item-money {
    width: 5%;
}

.Role-title-list-addr,
.Orders-detail-item-addr {
    width: 10%;
}

.Role-title-list-qq,
.Orders-detail-item-qq,
.Role-title-list-wechat,
.Orders-detail-item-wechat {
    width: 10%;
}

.Role-title-list-status,
.Orders-detail-item-status {
    width: 5%;
}

.Role-title-list-register,
.Orders-detail-item-register {
    width: 10%;
}

.Role-title-list-take,
.Orders-detail-item-take {
    width: 15%;
}

.Role-detail-border {
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
}

.Role-detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: overlay;
}

.Orders-detail-null {
    width: 100%;
    height: 100%;
    padding-top: 25px;
    color: rgb(136, 136, 136);
    display: flex;
    justify-content: center;
}

.Orders-detail-item {
    border-bottom: 1px solid rgb(179, 209, 235);
    height: 70px;
    display: flex;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
}

.Orders-detail-item-img img {
    display: flex;
    border-radius: 10px;
    width: calc(100% - 20px);
    height: 100%;
}

.Orders-detail-item-img,
.Orders-detail-item-account,
.Orders-detail-item-name,
.Orders-detail-item-money,
.Orders-detail-item-addr,
.Orders-detail-item-qq,
.Orders-detail-item-wechat,
.Orders-detail-item-status,
.Orders-detail-item-register,
.Orders-detail-item-take {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: rgb(78, 78, 78);
    font-weight: 800;
}

.Orders-detail-item-take-border {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.Orders-detail-item-take-take-down {
    background-color: var(--main-blue);
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 15px;
    border-radius: 10px;
    letter-spacing: 3px;
    border: 3px solid var(--main-blue);
    cursor: pointer;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.Orders-detail-item-take-take-down:hover {
    color: var(--main-blue);
    background-color: white;
}

.Orders-detail-item-take-take-up {
    background-color: rgb(70, 218, 102);
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 15px;
    border-radius: 10px;
    letter-spacing: 3px;
    border: 3px solid rgb(70, 218, 102);
    cursor: pointer;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.Orders-detail-item-take-take-up {
    color: rgb(70, 218, 102);
    background-color: white;
}

.UpdateView {
    left: 50%;
    top: 7%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgb(255, 255, 255);
    z-index: 101;
    width: 200px;
    /* height: 380px; */
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* animation: moveElement 0.5s, hideElement 4s forwards; */
    animation: moveElement2 0.5s, hideElement2 4s forwards;
}

@keyframes moveElement2 {
    from {
        top: 0%;
    }

    to {
        top: 7%;
    }
}

@keyframes hideElement2 {
    from {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.UpdateView-text {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    color: rgb(243, 39, 90);
    font-weight: 800;
    z-index: 101;
}

.UpdateView-icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>