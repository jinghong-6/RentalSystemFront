<template>
    <div class="Orders">
        <div v-if="showOrderList">
            <div class="Orders-title">
                <RouterLink to="/landlord/Comment" class="Orders-title-item aa">待评价</RouterLink>
                <RouterLink to="/landlord/Comment/Rated" class="Orders-title-item">已评价</RouterLink>
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
                    <div class="Orders-detail-item-people">预定数量：{{ order.people_num }}间</div>
                    <div class="Orders-detail-item-price">{{ order.price_all }}$</div>
                    <div class="Orders-detail-item-deadtime-border">
                        <div class="Orders-detail-item-deadtime">订单创建时间： <span>{{ order.order_begin_time }}</span> </div>
                        <div class="Orders-detail-item-deadtime">订单结束时间： <span>{{ order.order_close_time }}</span> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { getNotRatedCommentOrderByLandlordId } from '@/api/Order'
import landStore from '@/utils/landInfo';
import router from '@/router/router';

let landInfoStore = landStore()
let Orders = ref()
let showFlag = ref(false)
let showOrderList = ref(true)

onMounted(() => {
    getOrders()
})

function getOrders() {
    let token = localStorage.getItem('AT')
    let LandlordId = landInfoStore.landId
    let data = {
        LandlordId: LandlordId
    }
    getNotRatedCommentOrderByLandlordId(data, token).then(
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
</script>

<style scoped>
.Orders {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* overflow-y: scroll; */
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
    width: 13%;
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
    width: 15%;
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 显示的行数 */
    -webkit-box-orient: vertical; /* 设置为垂直排列 */
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

.Orders-detail-item-landlord-name{
    justify-content:normal;
    width: 160px;
    white-space: nowrap;
    /* 防止文字换行 */
    overflow: hidden;
    /* 隐藏超出容器的部分 */
    text-overflow: ellipsis;
    /* 显示省略号 */
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
</style>