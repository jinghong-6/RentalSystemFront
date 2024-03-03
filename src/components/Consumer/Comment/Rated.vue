<template>
    <div class="Orders">
        <div class="Orders-title">
            <RouterLink to="/consumer/Comment" class="Orders-title-item">待评价</RouterLink>
            <RouterLink to="/consumer/Comment/Rated" class="Orders-title-item aa">已评价</RouterLink>
        </div>
        <div class="Orders-detail">
            <div class="Orders-detail-null" v-if="!showFlag">
                当前暂无订单
            </div>
            <div class="Orders-detail-item" v-for="(order, index) in Orders" v-if="showFlag">
                <div class="Orders-detail-item-order">
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
                <div class="Orders-detail-item-comment">
                    <div class="room-detail-comment-all-commentType">
                        <div class="room-detail-comment-all-commentType-item" ref="CommentTypeRef">
                            {{ order.grades }}
                        </div>
                    </div>
                    
                    <div class="room-detail-comment-all-comment" v-if="order.comment != undefined">
                        <div>{{ order.comment.content }}</div>
                        <img class="" v-for="img in order.comment.imgs" :src="img" alt="">
                    </div>
                    <div v-if="order.comment != undefined">
                        <div class="room-detail-comment-all-children" v-for="children in order.comment.children">
                            {{ children.user_type }}:{{ children.content }}
                        </div>
                    </div>
                    <div class="room-detail-comment-all-textarea" ref="textareaRef">
                        <textarea v-model="textareaValue[index]" :maxlength="999" placeholder="回复评论"></textarea>
                        <div @click="returnComment(index)">发送</div>
                    </div>
                    <div class="room-detail-comment-all-return-border">
                        <div class="room-detail-comment-all-return" @click="showReturnTextarea(index)">回复</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { getCommentByUUID, getRatedOrderByConsumerId, setOrderComment } from '@/api/Order'
import useStore from '@/utils/userInfo';
import router from '@/router/router';

let userInfoStore = useStore()
let Orders = ref()
let showFlag = ref(false)
let CommentTypeRef = ref()
let textareaValue = ref([])
let textareaRef = ref()

onMounted(() => {
    getOrders()

})

function getOrders() {
    let token = localStorage.getItem('AT')
    let consumerId = userInfoStore.userId
    let data = {
        ConsumerId: consumerId
    }
    getRatedOrderByConsumerId(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                Orders.value = res.data.data
                if (Orders.value.length > 0) {
                    for (let index = 0; index < Orders.value.length; index++) {
                        if (Orders.value[index].grades == "1") {
                            Orders.value[index].grades = "好评"
                        }
                        if (Orders.value[index].grades == "2") {
                            Orders.value[index].grades = "中评"
                        }
                        if (Orders.value[index].grades == "3") {
                            Orders.value[index].grades = "差评"
                        }
                    }
                    showFlag.value = true
                    getAllComment()

                }
                if (Orders.value == "未找到相关订单") {
                    showFlag.value = false
                }
            }
        }
    )
}



function getAllComment() {
    let token = localStorage.getItem('AT')
    console.log(Orders.value)
    for (let index = 0; index < Orders.value.length; index++) {
        let data = {
            UUID: Orders.value[index].uuid
        }
        getCommentByUUID(data, token).then(
            res => {
                if (res.status == 200 && res.data.code == "902") {
                    for (let i = 0; i < res.data.data[0].children.length; i++) {
                        if (res.data.data[0].children[i].user_type == "0") {
                            res.data.data[0].children[i].user_type = "我"
                        }
                        if (res.data.data[0].children[i].user_type == "1") {
                            res.data.data[0].children[i].user_type = "房东"
                        }
                    }
                    Orders.value[index].comment = res.data.data[0]

                    // 图片
                    let data2 = res.data.data
                    for (let index = 0; index < data2.length; index++) {
                        if (data2[index].imgs != undefined && data2[index].imgs != '') {
                            data2[index].imgs = data2[index].imgs.split(",")
                        }
                    }

                    if (CommentTypeRef.value != undefined) {
                        for (let j = 0; j < Orders.value.length; j++) {
                            if (Orders.value[j].grades == "好评" && CommentTypeRef.value[j]) {
                                CommentTypeRef.value[j].style.backgroundColor = 'rgb(68 220 87)'
                            }
                            if (Orders.value[j].grades == "中评" && CommentTypeRef.value[j]) {
                                CommentTypeRef.value[j].style.backgroundColor = 'rgb(39 121 243)'
                            }
                            if (Orders.value[j].grades == "差评" && CommentTypeRef.value[j]) {
                                CommentTypeRef.value[j].style.backgroundColor = 'rgb(243, 39, 90)'
                            }
                        }
                    }
                }


            }
        )
    }
}

function showReturnTextarea(index) {
    textareaRef.value[index].style.display = 'flex'
}

function returnComment(index) {
    let AT = localStorage.getItem("AT");
    let data = {
        uuid: Orders.value[index].uuid,
        content: textareaValue.value[index],
        user_id: userInfoStore.userId,
        user_type: '0',
        parent_id: Orders.value[index].comment.id
    }
    setOrderComment(data, AT).then(
        res => {
            if (res.status == 200) {
                if (res.data.code == "904") {
                    textareaValue.value[index] = ''
                    getAllComment()
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
    /* height: 150px; */
    border-bottom: 1px solid rgb(179, 209, 235);
    padding-bottom: 10px;
}

.Orders-detail-item-order {
    width: 100%;
    height: 150px;

    display: flex;
    padding-top: 10px;
    padding-bottom: 5px;
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

.Orders-detail-item-deadtime-border {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly
}

.Orders-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}

.Orders-input textarea {
    padding: 10px;
    margin-top: 25px;
    width: calc(100% - 60px);
    max-width: calc(100% - 60px);
    min-width: calc(100% - 60px);
    outline: none;
    border: 2px solid rgb(172, 172, 172);
    border-radius: 10px;
    font-size: 1.2rem;
    transition: all 0.5s;
}

.Orders-input textarea:focus {
    border: 2px solid var(--main-blue);
}

.Orders-input-inertImg {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.Orders-input-inertImg img {
    margin-left: 20px;
    margin-top: 10px;
    width: 10%;
    height: 100%;
    border: 2px solid rgb(172, 172, 172);
    aspect-ratio: 16/10;
    margin-right: 15px;
}

.Orders-input-inertImg span {
    margin-left: 20px;
    background-color: rgb(243, 243, 243);
    font-size: 4rem;
    color: rgb(151, 151, 151);

    margin-top: 10px;
    width: 10%;
    height: 100%;
    border: 2px solid rgb(172, 172, 172);
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    aspect-ratio: 16/9;


    position: relative;
}

.Orders-input-inertImg span input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.Orders-input-inertImg span div {
    font-size: 15px;
}

.Orders-input-buttom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.Orders-input-buttom div {
    margin-right: 30px;

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

.Orders-input-buttom div:hover {
    color: var(--main-blue);
    background-color: white;
}

.counter-border {
    width: calc(100% - 70px);
    display: flex;
    justify-content: flex-end;
    color: rgb(102, 102, 102);
}

.room-detail-comment-all-commentType {
    margin-top: 10px;
    display: flex;
}

.room-detail-comment-all-commentType-item {
    cursor: pointer;
    margin-right: 10px;
    padding: 5px;
    padding-right: 15px;
    padding-left: 15px;
    transition: all 0.5s;
    font-weight: 800;
    color: white;
}

.Orders-detail-item-comment {
    margin-left: 15px;
    width: calc(100% - 20px);
}

.room-detail-comment-all-comment {
    width: calc(100% - 30px);
    margin-top: 5px;
    padding: 8px;
    background-color: rgb(220, 235, 255);
    border-radius: 5px;
    font-size: 1.2rem;
    color: rgb(112, 112, 112);
}

.room-detail-comment-all-children {
    width: calc(100% - 55px);
    margin-top: 5px;
    padding: 2px;
    padding-left: 30px;
    background-color: rgb(220, 235, 255);
    border-radius: 5px;
    font-size: 1.2rem;
    color: rgb(112, 112, 112);
}

.room-detail-comment-all-return-border {
    width: calc(100% - 20px);
    display: flex;
    justify-content: flex-end;
}

.room-detail-comment-all-return {
    margin-top: 10px;
    padding: 10px;
    font-size: 1.3rem;
    font-weight: 800;
    color: rgb(255, 255, 255);
    background-color: var(--main-color);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.5s;
    border: 3px solid var(--main-color);
}

.room-detail-comment-all-return:hover {
    color: var(--main-color);
    background-color: rgb(255, 255, 255);
}

.room-detail-comment-all-textarea {
    margin-top: 10px;
    width: calc(100% - 16px);
    display: none;
    position: relative;
}

.room-detail-comment-all-textarea textarea {
    position: relative;
    padding: 10px;
    border: 1px solid rgb(152, 180, 214);
    width: 100%;
    height: 150px;
    border-radius: 5px;
    outline: none;
    resize: none;
    font-size: 1.2rem;
}

.room-detail-comment-all-textarea div {
    cursor: pointer;
    position: absolute;
    padding: 5px;
    padding-right: 20px;
    padding-left: 20px;
    background-color: rgb(135, 167, 255);
    color: white;
    border-radius: 5px;
    font-weight: 800;
    bottom: 15px;
    right: 10px;
    transition: all 0.5s;
}

.room-detail-comment-all-textarea div:hover {
    background-color: rgb(60, 89, 167);
}

.room-detail-comment-all-comment img{
    margin-top: 10px;
    max-height: 200px;
}
</style>