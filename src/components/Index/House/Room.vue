<template>
    <div class="room-border">
        <div class="room">
            <div class="room-detail-banner">
                <img v-for="(image, index) in images" :src="image" :key="index"
                    :class="{ active: index === currentIndex }" />
                <div class="room-detail-banner-handoff">
                    <svg @click="prevImage" t="1690902947589" class="handoff-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8702" width="200" height="200">
                        <path
                            d="M603.3 327.5l-246 178c-4.4 3.2-4.4 9.7 0 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z"
                            p-id="8703" fill="#F3275A"></path>
                        <path
                            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                            p-id="8704" fill="#F3275A"></path>
                    </svg>

                    <svg @click="nextImage" t="1690902826098" class="handoff-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8403" width="200" height="200">
                        <path
                            d="M666.7 505.5l-246-178c-5.3-3.8-12.7-0.1-12.7 6.5v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"
                            p-id="8404" fill="#F3275A"></path>
                        <path
                            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                            p-id="8405" fill="#F3275A"></path>
                    </svg>
                </div>
            </div>
            <div class="room-detail">
                <div class="left">
                    <div class="room-detail-title">
                        <h1 class="room-detail-title-text">{{ house_name }}</h1>
                        <div class="room-detail-title-address">
                            地址：
                            <span class="room-detail-title-address-detail">
                                {{ full_address }}
                            </span>
                        </div>
                    </div>
                    <div class="room-detail-synopsis">
                        简介：
                        <span class="room-detail-synopsis-detail">
                            {{ introduce }}
                        </span>
                    </div>
                    <div class="room-detail-facility">
                        <div class="room-detail-facility-item">
                            <svg t="1691066938512" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2928" width="200" height="200">
                                <path
                                    d="M848 539.648a32.128 32.128 0 0 1 24.874667 31.189333v412.885334a32.085333 32.085333 0 0 1-32 32h-253.824a32.085333 32.085333 0 0 1-32-32v-217.557334H470.613333v217.557334a32.085333 32.085333 0 0 1-32 32H183.125333a32.085333 32.085333 0 0 1-32-32v-412.885334a31.957333 31.957333 0 0 1 63.488-5.717333c0.426667 2.517333 0.384 3.157333 0.512 5.717333v380.885334H406.613333v-217.557334a32.085333 32.085333 0 0 1 32-32h148.437334a32.170667 32.170667 0 0 1 32 32v217.557334h189.824v-380.885334a32.256 32.256 0 0 1 33.450666-31.957333c2.858667 0.256 2.858667 0.256 5.674667 0.768z"
                                    p-id="2929" fill="#8a8a8a"></path>
                                <path
                                    d="M774.698667 267.989333l228.224 226.730667c0.768 0.853333 1.578667 1.664 2.304 2.56a31.786667 31.786667 0 0 1 7.04 22.613333 32.341333 32.341333 0 0 1-32.682667 29.482667 32.170667 32.170667 0 0 1-16.384-4.949333c-2.602667-1.664-3.114667-2.261333-5.418667-4.309334L507.690667 92.842667 57.386667 540.117333l-2.56 2.304c-0.938667 0.64-1.834667 1.365333-2.816 2.005334a32.170667 32.170667 0 0 1-23.296 4.394666 32.341333 32.341333 0 0 1-25.856-32.384 32.170667 32.170667 0 0 1 5.077333-16.341333c1.664-2.602667 2.304-3.114667 4.352-5.418667L485.12 25.045333c0.853333-0.725333 1.621333-1.536 2.517333-2.218666a31.701333 31.701333 0 0 1 11.818667-6.016c2.858667-0.768 3.626667-0.725333 6.570667-1.024h3.328c1.109333 0.128 2.218667 0.170667 3.328 0.341333a31.744 31.744 0 0 1 12.373333 4.736c2.474667 1.621333 2.986667 2.218667 5.205333 4.181333l179.541334 178.432c-0.042667-28.928 0.213333-57.856 0.853333-86.741333a32 32 0 0 1 62.037333-9.557333c1.152 3.072 1.92 9.557333 1.92 9.557333l0.085334 151.253333z"
                                    p-id="2930" fill="#8a8a8a"></path>
                            </svg>
                            <div class="room-detail-facility-item-text">
                                房源类型：{{ type }}
                            </div>
                        </div>
                        <div class="room-detail-facility-collection" title="收藏">
                            <svg @click="setCollectionFun" t="1698758159263" class="room-detail-facility-collection-icon"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4322"
                                width="200" height="200" v-if="!CollectionFlag">
                                <path
                                    d="M1010.522034 378.125967c-2.697435-7.186679-9.568936-11.9471-17.244756-11.9471l-317.167616-0.024559L531.542078 29.566386c-2.907213-6.767124-9.56382-11.149944-16.924461-11.149944-0.021489 0-0.042979 0-0.064468 0-7.386224 0.025583-14.042831 4.461615-16.910135 11.269671L355.918175 366.154307l-319.960219 0.024559c-7.66354 0-14.524808 4.746094-17.231453 11.915377-2.706645 7.169283-0.690732 15.264659 5.061272 20.329001l264.485767 232.853325-87.217411 311.044152c-2.061962 7.354502 0.62831 15.21861 6.764054 19.768229 6.135744 4.548596 14.44192 4.840238 20.881586 0.730641l285.916868-182.503591 285.915845 182.503591c3.027963 1.933025 6.471388 2.892887 9.909697 2.892887 3.796466 0 7.584746-1.171686 10.799974-3.497661 6.124488-4.431939 8.919137-12.156878 7.04751-19.481703l-43.378973-169.779801c-0.10847-0.425695-0.233314-0.848321-0.37146-1.264806-7.653307-22.956851-15.889899-63.611783-9.262968-77.967746 4.264117-9.235338 0.233314-20.179598-9.004071-24.443715-9.239432-4.264117-20.180622-0.233314-24.443715 9.004071-7.04137 15.252379-7.662517 37.273928-1.899256 67.321268 3.518127 18.34788 8.340969 33.67189 9.441023 37.062104l31.686676 124.018571L524.528338 742.937696c-6.043646-3.857864-13.776771-3.857864-19.820418 0L249.554706 905.804041l77.314877-275.729855c1.910513-6.814196-0.251733-14.121626-5.563716-18.797112L84.751243 403.013797l283.396465-0.021489c7.40976 0 14.097066-4.441149 16.97358-11.269671L514.783393 83.893712l132.266419 307.947628c2.90619 6.765077 9.56075 11.149944 16.923438 11.149944l280.237519 0.021489L711.389166 606.468558c-7.659447 6.693446-8.443299 18.329461-1.74883 25.989931 6.693446 7.659447 18.331507 8.442276 25.989931 1.74883l269.766027-235.739049C1011.175927 393.417231 1013.219469 385.311623 1010.522034 378.125967z"
                                    fill="#FF9000" p-id="4323"></path>
                            </svg>
                            <svg @click="deleCollection" t="1698765929138" class="room-detail-facility-collection-icon"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4476"
                                width="200" height="200" v-if="CollectionFlag">
                                <path
                                    d="M1006.942208 391.708672c-2.10944-5.599232-7.458816-9.310208-13.459456-9.310208L672.516096 382.398464 526.367744 42.118144c-2.251776-5.26336-7.45472-8.675328-13.205504-8.675328-0.021504 0-0.043008 0-0.043008 0-5.772288 0-10.975232 3.45088-13.2096 8.762368L356.626432 382.399488 32.821248 382.399488c-5.983232 0-11.355136 3.709952-13.459456 9.271296-2.10944 5.604352-0.54784 11.91936 3.959808 15.880192L290.67264 642.930688l-88.240128 314.625024c-1.600512 5.72928 0.504832 11.880448 5.28896 15.418368 4.780032 3.53792 11.246592 3.791872 16.303104 0.590848l289.137664-184.52992 289.133568 184.52992c2.359296 1.514496 5.056512 2.230272 7.7312 2.230272 2.989056 0 5.961728-0.927744 8.489984-2.7392 4.780032-3.493888 6.928384-9.560064 5.413888-15.29344l-84.93568-319.50848L1002.939392 407.59296C1007.468544 403.633152 1009.047552 397.313024 1006.942208 391.708672z"
                                    fill="#FF9000" p-id="4477"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="room-detail-service">
                        <div class="room-detail-facility-service-item" v-for="serviceItem in service">
                            {{ serviceItem }}
                        </div>
                    </div>
                    <div class="Map">
                        <div class="Map-address">房源位置：
                            <span>准确地址将在预定确认后提供</span>
                        </div>
                        <Map :lat="lat" :lon="lon" :isLoading="isLoading"></Map>
                    </div>
                    <div class="room-detail-comment">
                        <span>房客评价：</span>
                        <div v-if="showComment.length <= 0" class="room-detail-comment-null">
                            暂无评论，快去预定吧
                        </div>
                        <div  class="room-detail-comment-all">
                            <div class="room-detail-comment-all-commentType">
                                <div class="room-detail-comment-all-commentType-item"
                                    v-for="(item, index) in commentTypeItem" @click="showTypeComment(index)" ref="TypeRef">
                                    {{ item }}
                                </div>
                            </div>
                            <div class="room-detail-comment-all-comments">
                                <div class="room-detail-comment-all-comments-item" v-for="comment in showComment">
                                    <div class="room-detail-comment-all-comments-item-title">
                                        <img :src="comment.user_type" alt="">
                                        <div class="room-detail-comment-all-comments-item-title-info">
                                            <div class="room-detail-comment-all-comments-item-title-info-name">
                                                {{ comment.user_id }}
                                            </div>
                                            <div class="room-detail-comment-all-comments-item-title-info-time">
                                                {{ comment.create_time }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="room-detail-comment-all-comments-item-text">
                                        <div class="room-detail-comment-all-comments-item-text-message">
                                            {{ comment.content }}
                                        </div>
                                        <div class="room-detail-comment-all-comments-item-text-imgs" v-if="comment.imgs">
                                            <img :src="img" alt="" v-for="img in comment.imgs">
                                        </div>
                                    </div>
                                    <div class="room-detail-comment-all-comments-item-Reply"
                                        v-for="reply in comment.children">
                                        <div class="room-detail-comment-all-comments-item-Reply-title">
                                            <img :src="reply.user_type" alt="">
                                            <div class="room-detail-comment-all-comments-item-Reply-title-info">
                                                <div class="room-detail-comment-all-comments-item-title-info-name">
                                                    {{ reply.user_id }}</div>
                                                <div class="room-detail-comment-all-comments-item-title-info-time">
                                                    {{ reply.create_time }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="room-detail-comment-all-comments-item-Reply-message">
                                            {{ reply.content }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="room-detail-landlord">
                        <div class="room-detail-landlord-detail">
                            <img :src="landlordImg_url" alt="">
                            <div class="room-detail-landlord-detail-name">
                                <div class="room-detail-landlord-detail-name-text1">房东：
                                    <span>{{ landlord_name }}</span>
                                </div>
                                <div class="room-detail-landlord-detail-name-text2">注册日期：
                                    <span>{{ register_time }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="room-detail-landlord-detail-value">
                            {{ LandlordIntroduce }}
                        </div>
                    </div>
                    <div class="end"></div>
                </div>
                <div class="right">
                    <div class="room-right">
                        <div class="room-right-pay">
                            <div class="room-right-pay-price">
                                <div class="room-right-pay-price-text1">￥
                                    <span>{{ price }}</span>
                                </div>
                                <div class="room-right-pay-price-text2">每晚</div>
                            </div>
                            <div class="room-right-pay-date">
                                <div class="room-right-pay-date-begin" @click="showCheckDate('1')">{{ beginDate }}</div>
                                <span>至</span>
                                <div class="room-right-pay-date-end" @click="showCheckDate('2')">{{ endDate }}</div>
                                <div class="date-check" v-if="showCheckDateFlag">
                                    <div class="date-check-title">选择日期以查看最终价格</div>
                                    <div class="date-check-dateTitle">
                                        <div class="date-check-dateTitle-left" @click="previousMonth">
                                            <svg t="1691306337449" class="date-check-dateTitle-icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8403" width="200"
                                                height="200">
                                                <path
                                                    d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                                                    p-id="8404" fill="#707070"></path>
                                            </svg>
                                        </div>
                                        <div class="date-check-dateTitle-date">{{ currentYear }}-{{ currentMonth }}</div>
                                        <div class="date-check-dateTitle-right" @click="nextMonth">
                                            <svg t="1691306384364" class="date-check-dateTitle-icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9006" width="200"
                                                height="200">
                                                <path
                                                    d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
                                                    p-id="9007" fill="#707070"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="date-check-week">
                                        <div class="date-check-week-item">日</div>
                                        <div class="date-check-week-item">一</div>
                                        <div class="date-check-week-item">二</div>
                                        <div class="date-check-week-item">三</div>
                                        <div class="date-check-week-item">四</div>
                                        <div class="date-check-week-item">五</div>
                                        <div class="date-check-week-item">六</div>
                                    </div>
                                    <div class="date-check-days">
                                        <div class="date-check-days-item" v-for="(day, index) in datesArray"
                                            ref="selectedDay" @click="getDay(index)"
                                            @mouseenter="selectedDayMouseenter(index)"
                                            @mouseleave="selectedDayMouseleave(index)">
                                            {{ day }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="room-right-pay-roomNum">
                                <div class="room-right-pay-roomNum-text1"></div>
                                <div class="room-right-pay-roomNum-text2">
                                    
                                    <span></span>
                                </div>
                            </div>
                            <div class="room-right-pay-manNum">
                                <div class="room-right-pay-manNum-text1">预定数量</div>
                                <div class="room-right-pay-manNum-text2">
                                    <input type="number" @blur="checkNum" v-model="num">
                                    <span>间</span>
                                </div>
                            </div>
                            <div class="room-right-pay-allPrice">
                                <div class="room-right-pay-allPrice-text1">总价</div>
                                <div class="room-right-pay-allPrice-text2">
                                    {{ allPrice }}
                                    <span>￥</span>
                                </div>
                            </div>
                            <div class="room-right-pay-buttom" @click="booking">
                                立即预定
                            </div>
                            <div class="room-right-pay-text">
                                将不会现在收费
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
      
<script setup>
import Map from '@/components/Map.vue';
import { ref, watchEffect, reactive, onMounted, nextTick } from 'vue';
import { getHouseById, getIdByHouseIdAndConsumerId, setCollection, delCollection, getHouseComment } from '@/api/Room';
import { useRoute } from 'vue-router';
import router from '@/router/router';
import userStore from '@/utils/userInfo';
import landStore from '@/utils/landInfo';
import RoomOrder from '@/utils/OrderRoom';

let userInfoStore = userStore()
let landInfoStore = landStore()
let RoomOrderStore = RoomOrder()

const route = useRoute()

let currentIndex = ref(0);
let images = reactive([
    // "/img/1.jpg",
    // "/img/2.jpg",
    // "/img/3.jpg",
    // "/img/4.jpg",
    // "/img/5.jpg",
    // "/img/6.jpg"
]);

let currentDate = ref()
let currentMonth = ref(0)
let currentYear = ref([])
let datesArray = ref([])

let showCheckDateFlag = ref(false)

let selectedDay = ref()
let selectedDayBeginIndex = ref()
let selectedDayEndIndex = ref()

let beginDate = ref("请选择")
let DateFlag = ref()
let endDate = ref("请选择")

let begin_time = ref()
let end_time = ref()
let house_name = ref()
let house_id = ref()
let landlordImg_url = ref()
let introduce = ref()
let LandlordIntroduce = ref()
let lat = ref()
let lon = ref()
const isLoading = ref(true);
let price = ref()
let register_time = ref()
let service = ref([])
let type = ref()
let full_address = ref()
let landlord_name = ref()
let MaxNum = ref()
let num = ref()
let firstImg = ref()
let provinceZh = ref()
let leaderZh = ref()
let cityZh = ref()
let landlord_tele = ref()
let landlord_Id = ref()

let allPrice = ref()

let timer = null;

onMounted(() => {
    getHouseById(route.params.id).then(
        res => {
            if (res.status == 200) {
                if (res.data.code == '902') {
                    console.log(res.data.data)
                    let data = res.data.data
                    house_name.value = data.house_name
                    full_address.value = data.full_address
                    introduce.value = data.introduce
                    type.value = data.type
                    landlord_name.value = data.landlord_name
                    register_time.value = data.register_time
                    landlordImg_url.value = data.img_url
                    LandlordIntroduce.value = data.LandlordIntroduce
                    price.value = data.price
                    lat.value = data.lat
                    lon.value = data.lon
                    isLoading.value = false;
                    MaxNum.value = data.max_num
                    begin_time.value = data.begin_time
                    end_time.value = data.end_time
                    firstImg.value = data.firstImg
                    provinceZh.value = data.provinceZh
                    leaderZh.value = data.leaderZh
                    cityZh.value = data.cityZh
                    landlord_tele.value = data.landlord_tele
                    landlord_Id.value = data.landlord_id
                    house_id.value = data.id
                    service.value = data.service.split(",")
                    images = data.img.split(",")


                    // 生成日期
                    var parts = getPartDate();
                    var year = parseInt(parts[0]);
                    var month = parseInt(parts[1]); // 月份在Date对象中是从0开始的，所以需要减去1
                    var day = parseInt(parts[2]);

                    currentDate.value = new Date(year, month - 1, day)
                    updateCalendar()
                    getCollection()
                    getComment(route.params.id)
                }
            }
        }
    )
})

// 轮播图自动切换
watchEffect(() => {
    // 清除之前的计时器
    clearInterval(timer);

    // 启动新的计时器
    timer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
    }, 5000);
});

// 获取评论
let showComment = ref([])
let allComment = ref()
let goodComment = ref([])
let cenComment = ref([])
let badComment = ref([])
let imgComment = ref([])
let backComment = ref([])
let TypeRef = ref()
// 评价
let commentTypeItem = ref(['最新', '好评', '中评', '差评', '有图', '有回复'])

function getComment(houseId) {
    for (let index3 = 0; index3 < TypeRef.value.length; index3++) {
        if (index3 == 0) {
            TypeRef.value[index3].style.color = "rgb(255, 255, 255)"
            TypeRef.value[index3].style.backgroundColor = "rgb(243, 39, 90)"
        }
    }

    let data = {
        houseId: houseId
    }
    getHouseComment(data).then(
        res => {
            if (res.status == 200) {
                if (res.data.code == '902' && res.data.data != "目前还没有评论") {
                    let data2 = res.data.data
                    for (let index = 0; index < data2.length; index++) {
                        data2[index].create_time = data2[index].create_time.slice(0, data2[index].create_time.length - 8)
                        if (data2[index].imgs != undefined && data2[index].imgs != '') {
                            data2[index].imgs = data2[index].imgs.split(",")
                        }
                        if (data2[index].children.length != 0) {
                            for (let index2 = 0; index2 < data2[index].children.length; index2++) {
                                data2[index].children[index2].create_time = data2[index].children[index2].create_time.slice(0, data2[index].children[index2].create_time.length - 8)

                            }
                        }
                    }
                    allComment.value = data2
                    showComment.value = allComment.value
                    typeComment()
                }
            }
        }
    )
}

// 分类评论
function typeComment() {
    for (let index = 0; index < allComment.value.length; index++) {
        if (allComment.value[index].grades == "1") {
            goodComment.value.push(allComment.value[index])
        }
        if (allComment.value[index].grades == "2") {
            cenComment.value.push(allComment.value[index])
        }
        if (allComment.value[index].grades == "3") {
            badComment.value.push(allComment.value[index])
        }
        if (allComment.value[index].imgs != undefined && allComment.value[index].imgs != '' && allComment.value[index].imgs != "null" && allComment.value[index].imgs != null) {

            imgComment.value.push(allComment.value[index])
        }
        if (allComment.value[index].children.length > 0) {
            backComment.value.push(allComment.value[index])
        }
    }
}

function showTypeComment(index) {
    for (let index3 = 0; index3 < TypeRef.value.length; index3++) {
        if (index3 == index) {
            TypeRef.value[index3].style.color = "rgb(255, 255, 255)"
            TypeRef.value[index3].style.backgroundColor = "rgb(243, 39, 90)"
        } else {
            TypeRef.value[index3].style.color = "rgb(109, 109, 109)"
            TypeRef.value[index3].style.backgroundColor = "aliceblue"
        }
    }
    if (index == 0) {
        showComment.value = allComment.value
    }
    if (index == 1) {
        showComment.value = goodComment.value
    }
    if (index == 2) {
        showComment.value = cenComment.value
    }
    if (index == 3) {
        showComment.value = badComment.value
    }
    if (index == 4) {
        showComment.value = imgComment.value
    }
    if (index == 5) {
        showComment.value = backComment.value
    }
}

// 轮播图上一页
function prevImage() {
    // 停止计时器
    clearInterval(timer);

    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;

    // 重新开始计时
    timer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
    }, 5000);
}

// 轮播图下一页
function nextImage() {
    // 停止计时器
    clearInterval(timer);

    currentIndex.value = (currentIndex.value + 1) % images.length;

    // 重新开始计时
    timer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
    }, 5000);
}

// 日期上一个月
function previousMonth() {
    const currentMonth = currentDate.value.getMonth();
    currentDate.value.setMonth(currentMonth - 1);

    // 检查是否成功地切换到上一个月
    // 如果上一个月的月份没有变化，表示当前是该月的最后一天，需要将日期设置为上个月的最后一天
    if (currentDate.value.getMonth() === currentMonth) {
        currentDate.value.setDate(0);
    }

    updateCalendar();
    showSelectChangeDay();
}

// 日期下一个月
function nextMonth() {
    const currentMonth = currentDate.value.getMonth();
    currentDate.value.setMonth(currentMonth + 1);

    // 检查是否成功地切换到下一个月
    // 如果下一个月的月份没有变化，表示当前是该月的最后一天，需要将日期设置为下个月的最后一天
    if (currentDate.value.getMonth() === currentMonth + 2) {
        currentDate.value.setDate(0);
    }

    updateCalendar();
    showSelectChangeDay();
}

// 修改月份
function showSelectChangeDay() {
    parts.value = getPartDate();
    beginYear.value = parseInt(parts.value[0]);
    beginMonth.value = parseInt(parts.value[1]);
    beginday.value = parseInt(parts.value[2]);
    BeginIndex.value = datesArray.value.indexOf(beginday.value);

    endparts.value = end_time.value.split("-");
    endYear.value = parseInt(endparts.value[0]);
    endMonth.value = parseInt(endparts.value[1]);
    endday.value = parseInt(endparts.value[2]);
    EndIndex.value = datesArray.value.indexOf(endday.value);

    selectedDayBeginIndex.value = BeginIndex.value
    selectedDayEndIndex.value = EndIndex.value

    for (let i = 0; i < 42; i++) {
        for (let i = 0; i < 42; i++) {
            selectedDay.value[i].style.backgroundColor = "rgb(255,255,255)"
            selectedDay.value[i].style.color = "rgb(114, 114, 114)"
            selectedDay.value[i].style.pointerEvents = "none"
        }
    }

    if (currentYear.value < beginYear.value || (currentYear.value == beginYear.value && currentMonth.value < beginMonth.value) ||
        currentYear.value > endYear.value || (currentYear.value == endYear.value && currentMonth.value > endMonth.value)) {
        for (let i = 0; i < 42; i++) {
            selectedDay.value[i].style.backgroundColor = "rgb(255,255,255)"
            selectedDay.value[i].style.color = "rgb(114, 114, 114)"
            selectedDay.value[i].style.pointerEvents = "none"
        }
    } else if (currentYear.value == beginYear.value && currentMonth.value == beginMonth.value && currentMonth.value != endMonth.value) {
        for (let i = selectedDayBeginIndex.value; i < 42; i++) {
            if (datesArray.value[i] != '') {
                selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
                selectedDay.value[i].style.color = "rgb(255,255,255)"
                selectedDay.value[i].style.pointerEvents = "all"
            }
        }
    } else if ((currentYear.value == beginYear.value && currentMonth.value > beginMonth.value && currentMonth.value < endMonth.value) ||
        (currentYear.value > beginYear.value && currentYear.value == endYear.value && currentMonth.value < endMonth.value) ||
        (currentYear.value > beginYear.value && currentYear.value < endYear.value)) {
        for (let i = 0; i <= 42; i++) {
            if (datesArray.value[i] != '' && datesArray.value[i] != undefined) {
                selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
                selectedDay.value[i].style.color = "rgb(255,255,255)"
                selectedDay.value[i].style.pointerEvents = "all"
            }
        }
    } else if (currentYear.value == endYear.value && currentMonth.value == endMonth.value && currentMonth.value != beginMonth.value) {
        for (let i = 0; i <= selectedDayEndIndex.value; i++) {

            if (datesArray.value[i] != '') {
                selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
                selectedDay.value[i].style.color = "rgb(255,255,255)"
                selectedDay.value[i].style.pointerEvents = "all"
            }
        }
    } else if (currentYear.value == endYear.value && currentMonth.value == endMonth.value && currentMonth.value == beginMonth.value) {
        for (let i = selectedDayBeginIndex.value; i <= selectedDayEndIndex.value; i++) {
            if (datesArray.value[i] != '') {
                selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
                selectedDay.value[i].style.color = "rgb(255,255,255)"
                selectedDay.value[i].style.pointerEvents = "all"
            }
        }
    }
}

// 更新当月日期
function updateCalendar() {
    currentMonth.value = currentDate.value.getMonth() + 1;
    currentYear.value = currentDate.value.getFullYear();
    // 月份第一天
    const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1);
    // 月份最后一天
    const lastDay = new Date(currentYear.value, currentMonth.value, 0);
    const daysInMonth = lastDay.getDate();
    // 第一天的偏移量
    const startOffset = firstDay.getDay();
    datesArray.value = Array.from({ length: 42 }, (_, index) => {
        if (index >= startOffset && index < startOffset + daysInMonth) {
            return index - startOffset + 1;
        } else {
            return '';
        }
    });
}

let parts = ref()
let beginYear = ref()
let beginMonth = ref()
let beginday = ref()
let BeginIndex = ref()

let endparts = ref()
let endYear = ref()
let endMonth = ref()
let endday = ref()
let EndIndex = ref()

// 获得所点击的日期
function getDay(index) {
    let day = selectedDay.value[index].innerText

    if (DateFlag.value == "1") {
        beginDate.value = currentYear.value + "-" + currentMonth.value + "-" + day
        beginDate.value = setDate(beginDate.value)

        let date1 = new Date(beginDate.value)
        if (endDate.value != "请选择") {
            let date2 = new Date(endDate.value)
            if (date1 <= date2) {
                showCheckDateFlag.value = false
            } else {
                beginDate.value = "请选择"
                showCheckDateFlag.value = false
            }
        } else {
            showCheckDateFlag.value = false
        }

    } else if (DateFlag.value == "2") {
        endDate.value = currentYear.value + "-" + currentMonth.value + "-" + day
        endDate.value = setDate(endDate.value)

        let date1 = new Date(endDate.value)
        if (beginDate.value != "请选择") {
            let date2 = new Date(beginDate.value)
            if (date1 >= date2) {
                showCheckDateFlag.value = false
            } else {
                endDate.value = "请选择"
                showCheckDateFlag.value = false
            }
        } else {
            showCheckDateFlag.value = false
        }
        showCheckDateFlag.value = false
    }


    if (beginDate.value != '请选择' && endDate.value != '请选择') {
        let startDate1 = new Date(beginDate.value);
        let endDate1 = new Date(endDate.value);

        let timeDiff = Math.abs(endDate1.getTime() - startDate1.getTime())
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
        allPrice.value = diffDays * price.value
    } else {
        allPrice.value = ''
    }

}

// 格式化日期，将2023-1-1为2023-01-01
function setDate(date) {
    const setdate = new Date(date);
    const setmonth = (setdate.getMonth() + 1).toString().padStart(2, '0');
    const setday = setdate.getDate().toString().padStart(2, '0');
    const formattedDate = `${currentYear.value}-${setmonth}-${setday}`;
    return formattedDate
}

function getPartDate() {
    let partDate = []

    let nowDate = new Date();

    nowDate = nowDate.toISOString().split('T')[0];

    console.log("nowDate:" + nowDate)
    if (nowDate < new Date(begin_time.value)) {
        partDate = begin_time.value.split("-");
    } else {
        // partDate[0] = nowDate.getFullYear().toString();
        // partDate[1] = (nowDate.getMonth() + 1).toString();
        // partDate[2] = nowDate.getDate().toString();
        partDate = nowDate.split("-");
    }
    console.log("partDate:" + partDate)
    return partDate
}

// 显示日期选择框
function showCheckDate(a) {
    // 通过起始入住时间生成日期
    var parts = getPartDate();
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]); // 月份在Date对象中是从0开始的，所以需要减去1
    var day = parseInt(parts[2]);

    currentDate.value = new Date(year, month - 1, day)
    updateCalendar()


    showCheckDateFlag.value = true

    nextTick(() => {
        parts.value = getPartDate();
        beginYear.value = parseInt(parts.value[0]);
        beginMonth.value = parseInt(parts.value[1]);
        beginday.value = parseInt(parts.value[2]);
        BeginIndex.value = datesArray.value.indexOf(beginday.value);

        endparts.value = end_time.value.split("-");
        endYear.value = parseInt(endparts.value[0]);
        endMonth.value = parseInt(endparts.value[1]);
        endday.value = parseInt(endparts.value[2]);
        EndIndex.value = datesArray.value.indexOf(endday.value);

        selectedDayBeginIndex.value = BeginIndex.value
        selectedDayEndIndex.value = EndIndex.value
        if (beginMonth.value < endMonth.value && beginYear.value <= endYear.value) {
            for (let i = selectedDayBeginIndex.value; i < 42; i++) {
                if (datesArray.value[i] != '') {
                    selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
                    selectedDay.value[i].style.color = "rgb(255,255,255)"
                    selectedDay.value[i].style.pointerEvents = "all"
                }
            }
        } else {
            for (let i = selectedDayBeginIndex.value; i <= EndIndex.value; i++) {
                if (datesArray.value[i] != '') {
                    selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
                    selectedDay.value[i].style.color = "rgb(255,255,255)"
                    selectedDay.value[i].style.pointerEvents = "all"
                }
            }
        }

        if (a == "1") {
            // currentDate.value = new Date(beginYear.value, beginMonth.value -1, beginday.value)
            updateCalendar()
            DateFlag.value = "1"
        }
        if (a == "2") {
            // currentDate.value = new Date(endYear.value, endMonth.value -1, endday.value)
            updateCalendar()
            DateFlag.value = "2"
        }


    })


}

// 鼠标移入日期
function selectedDayMouseenter(i) {

    if (currentYear.value == beginYear.value && currentMonth.value == beginMonth.value && currentMonth.value != endMonth.value) {
        if (datesArray.value[i] != '' && i >= selectedDayBeginIndex.value) {
            selectedDay.value[i].style.backgroundColor = "rgb(220,220,220)"
            selectedDay.value[i].style.color = "rgb(243, 39, 90)"
        }
    } else if ((currentYear.value == beginYear.value && currentMonth.value > beginMonth.value && currentMonth.value < endMonth.value) ||
        (currentYear.value > beginYear.value && currentYear.value == endYear.value && currentMonth.value < endMonth.value) ||
        (currentYear.value > beginYear.value && currentYear.value < endYear.value)) {
        if (datesArray.value[i] != '') {
            selectedDay.value[i].style.backgroundColor = "rgb(220,220,220)"
            selectedDay.value[i].style.color = "rgb(243, 39, 90)"
        }
    } else if (currentYear.value == endYear.value && currentMonth.value == endMonth.value && currentMonth.value != beginMonth.value) {
        if (datesArray.value[i] != '' && i <= selectedDayEndIndex.value) {
            selectedDay.value[i].style.backgroundColor = "rgb(220,220,220)"
            selectedDay.value[i].style.color = "rgb(243, 39, 90)"
        }
    } else if (currentYear.value == endYear.value && currentMonth.value == endMonth.value && currentMonth.value == beginMonth.value) {
        if (datesArray.value[i] != '' && i >= selectedDayBeginIndex.value && i <= selectedDayEndIndex.value) {
            selectedDay.value[i].style.backgroundColor = "rgb(220,220,220)"
            selectedDay.value[i].style.color = "rgb(243, 39, 90)"
        }
    }
}

// 鼠标移出日期
function selectedDayMouseleave(i) {

    if (currentYear.value == beginYear.value && currentMonth.value == beginMonth.value && currentMonth.value != endMonth.value) {
        if (datesArray.value[i] != '' && (i >= selectedDayBeginIndex.value)) {
            selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
            selectedDay.value[i].style.color = "rgb(255,255,255)"
        }
    } else if ((currentYear.value == beginYear.value && currentMonth.value > beginMonth.value && currentMonth.value < endMonth.value) ||
        (currentYear.value > beginYear.value && currentYear.value == endYear.value && currentMonth.value < endMonth.value) ||
        (currentYear.value > beginYear.value && currentYear.value < endYear.value)) {

        if (datesArray.value[i] != '') {
            selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
            selectedDay.value[i].style.color = "rgb(255,255,255)"
        }
    } else if (currentYear.value == endYear.value && currentMonth.value == endMonth.value && currentMonth.value != beginMonth.value) {
        if (datesArray.value[i] != '' && (i <= selectedDayEndIndex.value)) {
            selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
            selectedDay.value[i].style.color = "rgb(255,255,255)"
        }
    } else if (currentYear.value == endYear.value && currentMonth.value == endMonth.value && currentMonth.value == beginMonth.value) {
        if (datesArray.value[i] != '' && i >= selectedDayBeginIndex.value && i <= selectedDayEndIndex.value) {
            selectedDay.value[i].style.backgroundColor = "rgb(243, 39, 90)"
            selectedDay.value[i].style.color = "rgb(255,255,255)"
        }
    }
}

// 检查入住人数输入框格式
function checkNum() {
    const Numvalue = Number(num.value);
    if (isNaN(Numvalue) || Numvalue <= 0 || Numvalue > Number(MaxNum.value) || String(num.value).indexOf('.') != -1) {
        num.value = '';
    } else {
        num.value = Numvalue;
    }
}

// 预定
function booking() {
    if (userInfoStore.userId != '' && userInfoStore.userId != undefined &&
        beginDate.value != '请选择' && endDate.value != '请选择' &&
        num.value != '' && num.value != undefined) {
        RoomOrderStore.RoomImg = firstImg.value
        RoomOrderStore.RoomTitle = house_name.value
        RoomOrderStore.RoomAddress = provinceZh.value + '-' + leaderZh.value + '-' + cityZh.value + '-' + full_address.value
        RoomOrderStore.Price = price.value
        RoomOrderStore.Introduce = introduce.value
        RoomOrderStore.ConsumerId = userInfoStore.userId
        RoomOrderStore.ConsumerName = userInfoStore.userName
        RoomOrderStore.ConsumerTele = userInfoStore.userTele
        RoomOrderStore.ConsumerBeginTime = beginDate.value
        RoomOrderStore.ConsumerEndTime = endDate.value
        RoomOrderStore.ConsumerNum = num.value
        RoomOrderStore.LandlordId = landlord_Id.value
        RoomOrderStore.LandlordImg = landlordImg_url.value
        RoomOrderStore.LandlordName = landlord_name.value
        RoomOrderStore.LandlordTele = landlord_tele.value
        router.push('/index/house/OrderRoom/' + route.params.id)
    }
}

// 收藏功能
let CollectionFlag = ref(false)
// 查看当前民宿是否被收藏
function getCollection() {
    if (userInfoStore.userId != '' && userInfoStore.userId != undefined) {
        let token = localStorage.getItem('AT')
        let consumerId = userInfoStore.userId
        let data = {
            houseId: house_id.value,
            consumerId: consumerId
        }
        getIdByHouseIdAndConsumerId(data, token).then(
            res => {
                if (res.status == 200) {
                    console.log(res.data)
                    let collectionData = res.data
                    if (collectionData.code == "802") {
                        CollectionFlag.value = false
                    } else if (collectionData.code == "902") {
                        CollectionFlag.value = true
                    }
                }
            }
        )
    }
}

// 进行收藏
function setCollectionFun() {
    if (userInfoStore.userId != '' && userInfoStore.userId != undefined) {
        let token = localStorage.getItem('AT')
        let consumerId = userInfoStore.userId
        let data = {
            house_id: house_id.value,
            consumer_id: consumerId
        }
        setCollection(data, token).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == "901") {
                        CollectionFlag.value = true
                    }
                }
            }
        )
    }
}

// 取消收藏
function deleCollection() {
    let token = localStorage.getItem('AT')
    let consumerId = userInfoStore.userId
    let data = {
        houseId: house_id.value,
        consumerId: consumerId
    }
    delCollection(data, token).then(
        res => {
            if (res.status == 200) {
                if (res.data.code == "903") {
                    CollectionFlag.value = false
                }
            }
        }
    )
}


</script>

<style scoped>
.room-border {
    width: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center
}

.room {
    /* background-color: aqua; */
    height: auto;
    width: 80%;
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
}

.left {
    width: 75%;
}

.right {
    width: 25%;
}

.room-detail {
    width: 100%;
    height: auto;
    /* background-color: antiquewhite; */
    display: flex;
}

.room-right {
    width: 100%;
    height: 100%;
    /* background-color: rgb(40, 136, 104); */
    display: flex;
    justify-content: center;
    position: relative;
}

.room-right-pay {
    margin-top: 25px;
    width: 85%;
    height: 450px;
    /* background-color: blue; */
    /* border: 1px solid rebeccapurple; */
    box-shadow: 0px 0px 20px rgba(189, 189, 189, 0.5);
    position: sticky;
    top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center
}

.room-detail-banner {
    margin-top: 25px;
    height: 800px;
    width: 100%;
    flex-shrink: 0;
    /* overflow: hidden; */
    position: relative;
}

.room-detail-banner img {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s;
}

.room-detail-banner-handoff {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between
}

.handoff-icon {
    margin-left: 25px;
    margin-right: 25px;
    width: 80px;
    height: 80px;
    opacity: 0;
    transition: all 0.5s;
    cursor: pointer;
}

.room-detail-banner:hover .handoff-icon {
    opacity: 1;
}

.room-detail-banner svg {
    /* position: absolute; */
    z-index: 15;
}

.room-detail-banner img.active {
    opacity: 1;
}

.room-detail-title {
    margin-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    width: 100%;
    border-bottom: 5px solid var(--main-color);
}

.room-detail-title-text {
    margin-top: 15px;
    padding-bottom: 15px;
    font-size: 3rem;
    width: 100%;
}

.room-detail-title-address,
.room-detail-synopsis,
.Map-address {
    font-weight: 800;
    color: rgb(96, 149, 248);
}

.room-detail-comment span {
    font-weight: 800;
    color: rgb(96, 149, 248);
}

.room-detail-comment-null {
    margin-top: 10px;
    color: rgb(108, 112, 116);
}

.Map-address {
    margin-bottom: 10px;
}

.room-detail-title-address-detail,
.room-detail-synopsis-detail,
.Map-address span {
    font-weight: normal;
    color: rgb(95, 95, 97);
    line-height: 1.5;
}

.room-detail-synopsis,
.Map,
.room-detail-comment,
.room-detail-landlord {
    border-bottom: 1px solid rgb(206, 205, 205);
    padding-bottom: 25px;
}

.Map {
    margin-bottom: 25px;
}

.room-detail-landlord {
    margin-top: 25px;
}

.end {
    height: 25px;
    margin-bottom: 50px;
}

.room-detail-facility {
    display: flex;
    /* flex-wrap: wrap; */
    padding-bottom: 25px;
    align-items: center;
    justify-content: space-between;

}

.room-detail-facility-item {
    margin-top: 25px;
    display: flex;
    width: 20%;
    justify-content: center
}

.room-detail-facility-collection {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    height: 40px;
}

.room-detail-facility-collection-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.room-icon {
    width: 50px;
    height: 50px;
}

.room-detail-facility-item-text {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    font-weight: 800;
    margin-left: 10px;
    color: rgb(75, 75, 75);
    width: calc(100% - 50px);
}

.room-detail-landlord-detail {
    display: flex;
}

.room-detail-landlord-detail img {
    width: 100px;
    height: 100px;
}

.room-detail-landlord-detail-name {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 25px;
}

.room-detail-landlord-detail-name-text1 {
    font-size: 2rem;
    font-weight: 800;
}

.room-detail-landlord-detail-name-text1 span {
    font-weight: normal;
}

.room-detail-landlord-detail-name-text2 {
    color: rgb(108, 112, 116);
}

.room-detail-landlord-detail-value {
    margin-top: 25px;
    font-size: 1.1rem;
}

.room-right-pay-price {
    display: flex;
    margin-top: 25px;
    justify-content: space-around;
    align-items: center;
    width: 80%;
}

.room-right-pay-price-text1 {
    font-weight: 800;
    color: var(--main-color);
    font-size: 2rem;
}

.room-right-pay-price-text2 {
    font-weight: 700;
    font-size: 1.4rem;
}

.room-right-pay-date {
    height: 25px;
    width: 80%;
    border: 1px solid rgb(190, 179, 201);
    margin-top: 25px;
    display: flex;
    padding: 5px;
    justify-content: space-around;
    color: rgb(114, 114, 114);
    position: relative;
}

.date-check {
    position: absolute;
    border: 1px solid rgb(190, 179, 201);
    height: 360px;
    width: 100%;
    margin-top: 30px;
    background-color: white;
    z-index: 20;
}

.date-check-title {
    color: var(--main-color);
    margin-left: 15px;
    margin-top: 5px;

}

.date-check-dateTitle {
    margin-top: 15px;
    display: flex;
    color: black;
    justify-content: space-around
}

.date-check-dateTitle-icon {
    width: 25px;
    height: 25px;
}

.date-check-week {
    display: flex;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    justify-content: space-around;
}

.date-check-days {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
}

.date-check-days-item {
    flex-basis: 14.2857%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    pointer-events: none;
}

.date-check-dateTitle-left,
.date-check-dateTitle-right {
    cursor: pointer;
}

.room-right-pay-date-begin,
.room-right-pay-date-end {
    cursor: pointer;
}

.room-right-pay-roomNum,
.room-right-pay-manNum {
    height: 25px;
    width: 80%;
    border: 1px solid rgb(190, 179, 201);
    margin-top: 25px;
    display: flex;
    padding: 5px;
    justify-content: space-around;
    color: rgb(114, 114, 114);
    position: relative;
    align-items: center;
    cursor: pointer;
}

.room-right-pay-roomNum-text2 span,
.room-right-pay-manNum-text2 span {
    margin-left: 15px;
}

.room-right-pay-buttom {
    background-image: linear-gradient(to right, #fc738a 0%, #f04662 100%);
    color: white;
    font-size: 1.5rem;
    width: 80%;
    padding: 10px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
}

.room-right-pay-buttom:hover {
    filter: brightness(1.5);
}

.room-right-pay-text {
    font-size: 0.8rem;
    color: rgb(105, 106, 107);
    margin-top: 10px;
}

.room-right-pay-allPrice {
    display: flex;
    color: rgb(114, 114, 114);
    align-items: flex-end;
    margin-top: 40px;
    width: 80%;
    justify-content: flex-end;

}

.room-right-pay-allPrice-text2 {
    font-size: 1.5rem;
    color: var(--main-color);
    font-weight: 800;
}

.room-right-pay-manNum-text2 input {
    width: 50px;
    color: rgb(114, 114, 114);
}

.room-right-pay-manNum-text2 input:focus {
    outline: none;
}

.room-detail-service {
    width: 100%;
    display: flex;
    margin-bottom: 25px;
    flex-flow: row wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(206, 205, 205);
}

.room-detail-facility-service-item {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 5px;
    border: 2px solid rgb(148, 148, 148);
    border-radius: 30px;
    color: rgb(105, 105, 105);
    cursor: pointer;
    transition: all 0.5s;
}

.room-detail-facility-service-item:hover {
    border: 2px solid var(--main-color);
    color: var(--main-color)
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
    background-color: aliceblue;
    color: rgb(109, 109, 109);
    transition: all 0.5s;
}

.room-detail-comment-all-commentType-item:hover {
    background-color: var(--main-color);
    color: white;
}

.room-detail-comment-all-comments-item {
    margin-top: 10px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(233, 233, 233);
}

.room-detail-comment-all-comments-item-title {
    display: flex;
}

.room-detail-comment-all-comments-item-title img,
.room-detail-comment-all-comments-item-Reply-title img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.room-detail-comment-all-comments-item-title-info {
    margin-left: 10px;
}

.room-detail-comment-all-comments-item-title-info-name {
    font-weight: 800;
    color: #696969;
    font-size: 1.1rem;
}

.room-detail-comment-all-comments-item-title-info-time {
    font-weight: 800;
    font-size: 0.8rem;
    color: var(--main-blue);
    width: 100%;
    flex-shrink: 0;
}

.room-detail-comment-all-comments-item-text {
    margin-top: 5px;
}

.room-detail-comment-all-comments-item-text-message,
.room-detail-comment-all-comments-item-Reply-message {
    background-color: #f1f1f1;
    padding: 10px;
    color: #555555;
}

.room-detail-comment-all-comments-item-Reply-message {
    width: 100%;
}

.room-detail-comment-all-comments-item-text-imgs {
    margin-top: 10px;
}

.room-detail-comment-all-comments-item-Reply {
    margin-top: 5px;
    display: flex;
}

.room-detail-comment-all-comments-item-text-imgs img {
    width: 250px;
    margin-right: 10px;
}

.room-detail-comment-all-comments-item-Reply-title {
    display: flex;
}

.room-detail-comment-all-comments-item-Reply-title-info {
    display: flex;
    flex-direction: column;
    width: 80px;
    margin-left: 10px;
}
</style>