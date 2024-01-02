<template>
    <div class="pay">
        <div class="pay-header">惊鸿民宿</div>
        <div class="pay-container">
            <div class="pay-container-title">
                <span>订单支付:</span>
            </div>
            <div class="pay-numbering"><span>订单编号：<span>{{ orderId }}</span></span></div>
            <div class="pay-container-text1">您需要支付</div>

            <div class="pay-num">￥{{ allPrice }}</div>
            <div class="payInput">
                <input v-model="pwd" @input="onInput" type="password" maxlength="6" inputmode="numeric">
            </div>
            <div class="checkPayButtom" @click="payOrderfun">确认支付</div>
        </div>
    </div>
    <div v-if="alertFalg" class="loginView">
        <div class="login-text">
            {{ alertInfo }}
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOrder, payOrder } from '@/api/Order';
const route = useRoute()
let pwd = ref('');
let orderId = ref()
let allPrice = ref()
let uuid = ref()
let alertFalg = ref(false)
let alertInfo = ref()

onMounted(() => {
    uuid.value = atob(route.params.payInfo)
    let data = {
        uuid: uuid.value
    }
    getOrder(data).then(
        res => {
            if (res.status == 200 && res.data.code == "902") {
                console.log(res.data)
                orderId.value = res.data.data.order_id
                allPrice.value = res.data.data.price_all
            }
        }
    )
})

function onInput() {
    pwd.value = pwd.value.replace(/\D/g, ''); // 只保留数字
}

function payOrderfun() {
    if (pwd.value != '' && pwd.value != undefined &&
        uuid.value != '' && uuid != undefined) {
        let data = {
            uuid: uuid.value,
            pwd: pwd.value
        }
        payOrder(data).then(
            res => {
                if (res.status == 200) {
                    console.log(res.data)
                    let data = res.data
                    if (data.code == 801 && data.data == "订单状态更改成功") {
                        alertInfo.value = "支付成功,请返回"
                        alertFalg.value = true
                        setTimeout(() => {
                            alertFalg.value = false
                            window.close();
                        }, 2000);
                    }
                }
            }
        )
    }
}
</script>

<style scoped>
.pay{
    width: 100%;
}
.pay-header {
    background-color: rgb(245, 251, 255);
    font-size: 1.8rem;
    font-weight: 700;
    color: rgb(243, 39, 90);
    text-align: center;
    letter-spacing: .4rem;
    font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 100%;
}

.pay-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pay-container-title {
    margin-top: 25px;
    padding-left: 15px;
    font-size: 2rem;
    width: calc(100% - 15px);
}

.pay-container-text1 {
    margin-top: 70px;
    font-size: 1.8rem;
    color: rgb(84, 84, 84);
}

.pay-num {
    margin-top: 35px;
    font-size: 2.2rem;
    color: rgb(243, 39, 90);
}

.payInput input:focus {
    outline: none;
}

.payInput input {
    margin-top: 80px;
    width: 200px;
    height: 35px;
    border: 1px solid rgb(150, 150, 150);
    border-radius: 10px;
    padding-left: 15px;
    font-size: 1.2rem;
}

.checkPayButtom {
    margin-top: 35px;
    padding: 15px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: rgb(42, 143, 221);
    color: white;
    border-radius: 10px;
}

.pay-numbering {
    width: calc(100% - 15px);
    margin-top: 15px;
    padding-left: 15px;
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