<template>
    <div class="Orders">
        <div class="Orders-title">
            <RouterLink to="/consumer/Orders" class="Orders-title-item aa">待付款</RouterLink>
            <RouterLink to="/consumer/Orders/OrderCompete" class="Orders-title-item">待确认</RouterLink>
            <RouterLink to="/consumer/Orders/OrderCompeted" class="Orders-title-item">未开始</RouterLink>
            <RouterLink to="/consumer/Orders/OrderBegin" class="Orders-title-item">进行中</RouterLink>
            <RouterLink to="/consumer/Orders/OrderEnd" class="Orders-title-item">已结束</RouterLink>
        </div>
        <div class="Orders-detail">
            <div class="Orders-detail-null" v-if="!showFlag">
                当前暂无订单
            </div>
            <div class="Orders-detail-item" v-for="(order, index) in Orders" v-if="showFlag">
                <div class="Orders-detail-item-img">
                    <img :src="order.house_img" alt="">
                </div>
                <div class="Orders-detail-item-info">
                    <div class="Orders-detail-item-info-title">{{ order.house_name }}</div>
                    <div class="Orders-detail-item-info-time">{{ order.begin_time }}~{{ order.end_time }}</div>
                </div>
                <div class="Orders-detail-item-landlord-name">房东：{{ order.landName }}</div>
                <div class="Orders-detail-item-landlord-tele">房东电话：{{ order.landTele }}</div>
                <div class="Orders-detail-item-people">入住人数：{{ order.people_num }}人</div>
                <div class="Orders-detail-item-price">{{ order.price_all }}$</div>
                <div class="Orders-detail-item-deadtime-border">
                    <div class="Orders-detail-item-deadtime">订单创建时间： <span>{{ order.order_begin_time }}</span> </div>
                    <div class="Orders-detail-item-deadtime">订单截止时间： <span>{{ order.order_end_time }}</span> </div>
                </div>
                <div class="button-border">
                    <div class="Orders-detail-item-buttom">
                        <div @click="toPay(index)">去付款</div>
                    </div>
                    <div class="Orders-detail-item-buttom2" @click="cancelOrder(order.uuid)">
                        <div>取消订单</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showPayFlag" class="QRcode-border">
            <div class="QRcode">
                <div class="QRcode-title">扫码付款</div>
                <div class="timeCount">订单关闭: <span>{{ formatTime }}</span></div>
                <qrcode-vue class="QRcodeView" :value="Evalue" :size="size" level="H" />
                <div class="QRcode-buttom">
                    <div class="QRcode-back-buttom" @click="back">
                        <svg t="1696401356309" class="QRcode-back-buttom-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4005">
                            <path d="M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z" fill="#f32759"
                                p-id="4006"></path>
                        </svg>
                        <span>返回</span>
                    </div>
                    <div class="QRcode-success-buttom" @click="paySuccess">
                        支付完成
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="alertFalg" class="loginView">
        <div class="login-text">
            {{ alertInfo }}
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { getNoPayOrderC, CancelNopayOrder, getPaySuccessOrFailed } from '@/api/Order'
import useStore from '@/utils/userInfo';
// 二维码组件
import QrcodeVue from 'qrcode.vue'
import router from '@/router/router';

let userInfoStore = useStore()
let Orders = ref()
let showFlag = ref(false)
let showPayFlag = ref(false)
let Evalue = ref("")
let size = '300'
let alertInfo = ref()
let alertFalg = ref(false)
let currentTime = ref(new Date()); // 当前时间
let remainingTime = ref()
let deadline
// 格式化时间为时分秒
let formatTime = ref('');
let nowUUID = ref()

onMounted(() => {
    getOrders()
})

function getOrders() {
    let token = localStorage.getItem('AT')
    let consumerId = userInfoStore.userId
    let data = {
        consumer_id: consumerId
    }
    getNoPayOrderC(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                Orders.value = res.data.data
                if (Orders.value.length > 0) {
                    showFlag.value = true
                }
                if (Orders.value == "未找到相关订单") {
                    showFlag.value = false
                }
            }
        }
    )
}

let timer;
function toPay(index) {
    Evalue.value = 'http://zzw.fj.cn/#/pay/' + btoa(Orders.value[index].uuid)
    nowUUID.value = Orders.value[index].uuid
    deadline = new Date(Orders.value[index].order_end_time)
    deadline.setMinutes(deadline.getMinutes())
    remainingTime.value = ref(deadline - currentTime.value); // 剩余时间
    timer = setInterval(updateRemainingTime, 1000);
    showPayFlag.value = true
    // 在组件卸载时清除定时器
    return () => clearInterval(timer);

}

function paySuccess() {
    let AT = localStorage.getItem("AT");
    let data = {
        uuid: nowUUID.value
    }
    getPaySuccessOrFailed(data, AT).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == '902') {
                    alertInfo.value = "支付成功"
                    alertFalg.value = true
                    setTimeout(() => {
                        alertFalg.value = false
                        router.push("/consumer/Orders/OrderCompete")
                    }, 2000);
                } else {
                    alertInfo.value = "支付失败，请重试"
                    alertFalg.value = true
                    setTimeout(() => {
                        alertFalg.value = false
                    }, 2500);
                }
            }
        }
    )
}

// 更新剩余时间和格式化时间
function updateRemainingTime() {
    showPayFlag.value = true
    currentTime.value = new Date();
    remainingTime.value = deadline - currentTime.value;
}

// 格式化时间为时分秒的函数
function formatRemainingTime() {
    if (remainingTime.value <= 0) {
        formatTime.value = '00:00:00';
        if (formatTime.value == '00:00:00') {
            showPayFlag.value = false
            router.push('/')
        }
    } else {
        const seconds = Math.floor((remainingTime.value / 1000) % 60);
        const minutes = Math.floor((remainingTime.value / 1000 / 60) % 60);
        const hours = Math.floor((remainingTime.value / (1000 * 60 * 60)) % 24);

        formatTime.value = `
        ${hours.toString().padStart(2, '0')}:
        ${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}`;
    }
}

// 监听剩余时间的变化
watch(remainingTime, formatRemainingTime);

function back() {
    clearInterval(timer);
    showPayFlag.value = false
}

function cancelOrder(uuid) {
    let token = localStorage.getItem('AT')
    let data = {
        uuid: uuid
    }
    CancelNopayOrder(data, token).then(
        res => {
            if (res.status == 200) {
                let consumerId = userInfoStore.userId
                let data = {
                    consumer_id: consumerId
                }
                getNoPayOrderC(data, token).then(
                    res => {
                        if (res.status == 200) {
                            console.log(res.data)
                            Orders.value = res.data.data
                            if (Orders.value.length > 0) {
                                showFlag.value = true
                            }
                            if (Orders.value == "未找到相关订单") {
                                showFlag.value = false
                            }
                        }
                    }
                )
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

.Orders-detail {
    /* background-color: blue; */
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

.Orders-detail-item {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid rgb(179, 209, 235);
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
}

.Orders-detail-item-img {
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    margin-left: 15px;
}

.Orders-detail-item-img img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
}

.Orders-detail-item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 1;
    width: 350px;
    padding-left: 15px;
    flex-shrink: 0;
}

.Orders-detail-item-landlord {
    justify-content: space-around;
    font-size: 1.1rem;
    font-weight: 800;
}

.Orders-detail-item-info-title {
    font-size: 2rem;
    font-weight: 800;
    color: rgb(65, 65, 65);
}

.Orders-detail-item-info-time {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--main-color);
}

.Orders-detail-item-people,
.Orders-detail-item-price,
.Orders-detail-item-landlord-name,
.Orders-detail-item-landlord-tele {
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1.2rem;
    font-weight: 800;
    padding-left: 15px;
    flex-shrink: 0;
}

.Orders-detail-item-landlord-tele {
    width: 300px;
}

.Orders-detail-item-price {
    color: var(--main-color);
    font-size: 1.5rem;
}

.Orders-detail-item-deadtime {
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 350px;
    flex-shrink: 0;
    font-weight: 800;
    font-size: 1.1rem;
}

.Orders-detail-item-deadtime span {
    color: var(--main-color);
}

.Orders-detail-item-buttom {
    margin-right: 20px;
}

.Orders-detail-item-buttom div {
    background-color: var(--main-color);
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 15px;
    border-radius: 10px;
    letter-spacing: 3px;
    border: 3px solid var(--main-color);
    cursor: pointer;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.Orders-detail-item-buttom div:hover {
    color: var(--main-color);
    background-color: white;
}

.Orders-detail-null {
    width: 100%;
    height: 100%;
    padding-top: 25px;
    color: rgb(136, 136, 136);
    display: flex;
    justify-content: center;
}

.Orders-detail-item-deadtime-border {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly
}

.QRcode-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(39, 39, 39, 0.5);
    flex-direction: column;
}

.QRcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 35px;
    padding-top: 15px;
    background-color: white;
}

.QRcode-title {
    color: var(--main-color);
    font-size: 2.3rem;
    font-weight: 800;
    margin-bottom: 10px;
}

.timeCount {
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.timeCount span {
    font-weight: 600;
    color: var(--main-color);
}

.QRcode-buttom {
    padding-top: 25px;
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.QRcode-back-buttom,
.QRcode-success-buttom {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--main-color);
    border: 2px var(--main-color) solid;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.QRcode-success-buttom {
    border-color: rgb(0, 181, 75);
    color: rgb(0, 181, 75);
}

.QRcode-back-buttom-icon {
    width: 25px;
    height: 25px;
}

.loginView {
    left: 50%;
    top: 15%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgb(245, 245, 245);
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

.login-text {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    color: rgb(243, 39, 90);
    font-weight: 800;
    z-index: 101;
}

@keyframes moveElement2 {
    from {
        top: 0%;
    }

    to {
        top: 15%;
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

.button-border {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 100px;
}

.Orders-detail-item-buttom2 div {
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

.Orders-detail-item-buttom2 div:hover {
    color: var(--main-blue);
    background-color: white;
}
</style>