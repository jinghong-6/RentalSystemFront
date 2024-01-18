<template>
    <div class="Orders">
        <div class="Orders-title">
            <RouterLink to="/consumer/Orders" class="Orders-title-item">待付款</RouterLink>
            <RouterLink to="/consumer/Orders/OrderCompete" class="Orders-title-item aa">待确认</RouterLink>
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
                    <div class="Orders-detail-item-deadtime">
                        订单创建时间：<span>{{ order.order_begin_time }}</span>
                    </div>
                    <div class="Orders-detail-item-deadtime">
                        订单支付时间：<span>{{ order.order_pay_time }}</span>
                    </div>
                    <div class="Orders-detail-item-deadtime">
                        订单关闭时间：<span>{{ order.order_end_time }}</span>
                    </div>
                </div>
                <div class="Orders-detail-item-buttom" @click="cancelOrder(order.uuid)">
                    <div>取消订单</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getCompleteOrderC, CancelOrder } from '@/api/Order'
import useStore from '@/utils/userInfo';

let userInfoStore = useStore()
let Orders = ref()
let showFlag = ref(false)

onMounted(() => {
    getOrders()
})

function getOrders() {
    let token = localStorage.getItem('AT')
    let consumerId = userInfoStore.userId
    let data = {
        consumer_id: consumerId
    }
    getCompleteOrderC(data, token).then(
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

function cancelOrder(uuid) {
    let token = localStorage.getItem('AT')
    let data = {
        uuid: uuid
    }
    CancelOrder(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                let consumerId = userInfoStore.userId
                let data = {
                    consumer_id: consumerId
                }
                getCompleteOrderC(data, token).then(
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

.Orders-detail-item-deadtime-border {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 100px;

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
</style>