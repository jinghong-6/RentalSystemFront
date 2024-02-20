<template>
    <div class="OrderRoom-border">
        <div class="OrderRoom">
            <div class="OrderRoom-title">确认订单</div>
            <div class="OrderRoom-title-items">
                <span></span>
                民宿信息
            </div>
            <div class="OrderRoom-RoomDetail">
                <div class="OrderRoom-RoomDetail-Img">
                    <img :src="Img" alt="">
                </div>
                <div class="OrderRoom-RoomDetail-detail">
                    <div class="OrderRoom-RoomDetail-detail-RoomTitle">{{ RoomTitle }}</div>
                    <div class="OrderRoom-RoomDetail-detail-introduce">简介：
                        <span>{{ Introduce }}</span>
                    </div>
                    <div class="OrderRoom-RoomDetail-detail-Address">详细地址：
                        <span>{{ RoomAddress }}</span>
                    </div>
                    <div class="OrderRoom-RoomDetail-detail-num">数量：
                        <span>1（间/套）</span>
                    </div>
                    <div class="OrderRoom-RoomDetail-detail-price">价格：
                        <span>
                            <span>{{ Price }}</span>
                            /晚
                        </span>
                    </div>
                </div>
            </div>
            <div class="OrderRoom-title-items">
                <span></span>
                个人信息
            </div>
            <div class="OrderRoom-Consumer">
                <div class="OrderRoom-Consumer-name">姓名：
                    <span>
                        {{ ConsumerName }}
                    </span>
                </div>
                <div class="OrderRoom-Consumer-tele">联系电话：
                    <span>
                        {{ ConsumerTele }}
                    </span>
                </div>
                <div class="OrderRoom-Consumer-time">预定时间：
                    <span>{{ ConsumerBeginTime }} ~ {{ ConsumerEndTime }}</span>
                </div>
                <div class="OrderRoom-Consumer-num">入住人数：
                    <span>{{ ConsumerNum }}</span>
                </div>
            </div>
            <div class="OrderRoom-title-items">
                <span></span>
                房东信息
            </div>
            <div class="OrderRoom-Landlord">
                <div class="OrderRoom-Landlord-Img">
                    <img :src="LandlordImg" alt="">
                </div>
                <div class="OrderRoom-Landlord-Detail">
                    <div class="OrderRoom-Landlord-name">昵称：
                        <span>{{ LandlordName }}</span>
                    </div>
                    <div class="OrderRoom-Landlord-tele">
                        联系电话：
                        <span>{{ LandlordTele }}</span>
                    </div>
                </div>
            </div>
            <div class="checkButtom">
                <div>
                    <span>￥{{ allPrice }}</span>
                    <span @click="payOrder">付款提交</span>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showPayFlag" class="QRcode-border">
        <div class="QRcode">
            <div class="QRcode-title">扫码付款</div>
            <div class="timeCount">订单关闭: <span>{{ formatTime }}</span></div>
            <qrcode-vue class="QRcodeView" :value="value" :size="size" level="H" />
            <div class="QRcode-buttom">
                <RouterLink to="/consumer/Orders" class="QRcode-back-buttom">
                    <svg t="1696401356309" class="QRcode-back-buttom-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4005">
                        <path d="M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z" fill="#f32759"
                            p-id="4006"></path>
                    </svg>
                    <span>返回</span>
                </RouterLink>
                <div class="QRcode-success-buttom" @click="paySuccess">
                    支付完成
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
import { ref, watch, onMounted } from 'vue';
// 二维码组件
import QrcodeVue from 'qrcode.vue'
import RoomOrder from '@/utils/OrderRoom';
import router from '@/router/router';
import { useRoute } from 'vue-router'
import { postAddOrder,getPaySuccessOrFailed } from '@/api/Order';

const route = useRoute()

let RoomOrderStore = RoomOrder()

let alertFalg = ref(false)
let alertInfo = ref()
let payInfo = ref()

let Img = ref()
let RoomTitle = ref()
let RoomAddress = ref()
let Price = ref()
let Introduce = ref()

let ConsumerName = ref()
let ConsumerTele = ref()
let ConsumerBeginTime = ref()
let ConsumerEndTime = ref()
let ConsumerNum = ref()

let LandlordImg = ref()
let LandlordName = ref()
let LandlordTele = ref()
let allPrice = ref()
let value = ''
let size = '300'

let showPayFlag = ref(false)
// let deadline = new Date()
// deadline.setMinutes(deadline.getMinutes() + 15)
let currentTime = ref(new Date()); // 当前时间
let remainingTime = ref()
let deadline
// 格式化时间为时分秒
let formatTime = ref('');

onMounted(() => {
    Img.value = RoomOrderStore.RoomImg
    RoomTitle.value = RoomOrderStore.RoomTitle
    RoomAddress.value = RoomOrderStore.RoomAddress
    Price.value = RoomOrderStore.Price
    Introduce.value = RoomOrderStore.Introduce
    ConsumerName.value = RoomOrderStore.ConsumerName
    ConsumerTele.value = RoomOrderStore.ConsumerTele
    ConsumerBeginTime.value = RoomOrderStore.ConsumerBeginTime
    ConsumerEndTime.value = RoomOrderStore.ConsumerEndTime
    ConsumerNum.value = RoomOrderStore.ConsumerNum
    LandlordImg.value = RoomOrderStore.LandlordImg
    LandlordName.value = RoomOrderStore.LandlordName
    LandlordTele.value = RoomOrderStore.LandlordTele

    let startDate1 = new Date(ConsumerBeginTime.value);
    let endDate1 = new Date(ConsumerEndTime.value);

    let timeDiff = Math.abs(endDate1.getTime() - startDate1.getTime())
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
    allPrice.value = diffDays * Price.value
})


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

let timer;
function payOrder() {
    let AT = localStorage.getItem("AT");
    let data = {
        consumer_id: RoomOrderStore.ConsumerId,
        landlord_id: RoomOrderStore.LandlordId,
        house_id: route.params.id,
        begin_time: RoomOrderStore.ConsumerBeginTime,
        end_time: RoomOrderStore.ConsumerEndTime,
        people_num: RoomOrderStore.ConsumerNum
    }

    postAddOrder(data, AT).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == '901') {
                    let data = res.data.data

                    payInfo.value = data.uuid
                    console.log(data)
                    value = 'http://zzw.fj.cn/#/pay/' + btoa(payInfo.value)
                    console.log(value)
                    deadline = new Date(data.OrderEndTime)
                    deadline.setMinutes(deadline.getMinutes())
                    remainingTime.value = ref(deadline - currentTime.value); // 剩余时间
                    timer = setInterval(updateRemainingTime, 1000);


                    // 在组件卸载时清除定时器
                    return () => clearInterval(timer);
                } else {
                    alertInfo.value = "日期已被预定"
                    alertFalg.value = true
                    setTimeout(() => {
                        alertFalg.value = false
                    }, 2000);
                }
            }
        }
    )
}

function paySuccess() {
    let AT = localStorage.getItem("AT");
    let data = {
        uuid: payInfo.value
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




// const socket = ref(null);
// const message = ref('');

// const connectWebSocket = () => {
//     // 创建 WebSocket 连接
//     socket.value = new WebSocket('ws://localhost:8090/websocket');

//     // 监听连接打开事件
//     socket.value.addEventListener('open', (event) => {
//         // 连接已打开，现在可以发送消息
//         socket.value.send('Hello, WebSocket Server!');
//     });

//     // 监听消息事件
//     socket.value.addEventListener('message', (event) => {
//         const receivedMessage = event.data;
//         // 处理接收到的消息
//         message.value = receivedMessage;
//         console.log(message.value)
//     });

//     // 监听连接关闭事件
//     socket.value.addEventListener('close', (event) => {
//         // 连接已关闭
//     });
// };

</script>
    
<style scoped>
.OrderRoom-border {
    position: relative;
    width: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center
}

.OrderRoom {
    /* background-color: aqua; */
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
}

.OrderRoom-title {
    font-size: 2rem;
    font-weight: 800;
}

.OrderRoom-title-items {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    border-top: 2px solid rgb(66, 160, 179);
    padding-top: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.OrderRoom-title-items span {
    position: relative;
    width: 5px;
    height: 100%;
    background-color: var(--main-color);
    border-radius: 20px;
    margin-right: 10px;
}

.OrderRoom-RoomDetail {
    display: flex;
}

.OrderRoom-RoomDetail-Img {
    width: 40%;
    flex-shrink: 0;
}

.OrderRoom-RoomDetail-Img img {
    width: 100%;
    height: 100%;
}

.OrderRoom-RoomDetail-detail {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
}

.OrderRoom-RoomDetail-detail-RoomTitle {
    font-weight: 800;
    font-size: 2rem;
}

.OrderRoom-RoomDetail-detail-price,
.OrderRoom-RoomDetail-detail-introduce,
.OrderRoom-RoomDetail-detail-num,
.OrderRoom-RoomDetail-detail-Address,
.OrderRoom-Consumer-name,
.OrderRoom-Consumer-tele,
.OrderRoom-Consumer-time,
.OrderRoom-Consumer-num,
.OrderRoom-Landlord-name,
.OrderRoom-Landlord-tele {
    font-size: 1.3rem;
    color: rgb(22, 77, 124);
    margin-top: 15px;
    font-weight: 800;
}

.OrderRoom-RoomDetail-detail-price span,
.OrderRoom-RoomDetail-detail-introduce span,
.OrderRoom-RoomDetail-detail-num span,
.OrderRoom-RoomDetail-detail-Address span,
.OrderRoom-Consumer-name span,
.OrderRoom-Consumer-tele span,
.OrderRoom-Consumer-time span,
.OrderRoom-Consumer-num span,
.OrderRoom-Landlord-name span,
.OrderRoom-Landlord-tele span {
    font-weight: 400;
    color: rgb(46, 46, 46);
    font-size: 1.3rem;
}

.OrderRoom-RoomDetail-detail-price>span>span {
    font-weight: 800;
    color: var(--main-color);
    font-size: 2rem;
}

.OrderRoom-RoomDetail-detail-introduce {
    margin-top: 25px;
}

.OrderRoom-Landlord-Img img {
    width: 100px;
    height: 100px;
    margin-right: 25px;
}

.OrderRoom-Landlord {
    display: flex;

}

.checkButtom {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-end
}

.checkButtom div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.checkButtom span {
    width: 125px;
}

.checkButtom span:nth-child(1) {
    color: var(--main-color);
    font-weight: 800;
    font-size: 2rem;
    width: auto;
}

.checkButtom span:nth-child(2) {
    padding: 5px;
    padding-right: 30px;
    padding-left: 30px;
    background-color: var(--main-color);
    color: white;
    font-size: 1.9rem;
    border-radius: 15px;
    cursor: pointer;
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
</style>