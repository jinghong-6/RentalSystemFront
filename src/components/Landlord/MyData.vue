<template>
    <div class="myData">
        <div class="myData-info">
            <div class="myData-info-img">
                <img :src="imgRef" alt="">
                <div v-if="editFlag == '1'" class="changeImg">
                    <div>修改头像</div>
                    <input type="file" accept="image/*" @change="setPhoto">
                </div>
            </div>
            <div class="myData-info-items">
                <div class="myData-info-items-nameInfo">
                    <div class="name" v-if="editFlag == '0'">{{ nameRef }}</div>
                    <div class="name-edit" v-if="editFlag == '1'">
                        <div>昵称：</div>
                        <input class="name-input" type="text" v-model="nameInputRef">
                    </div>
                    <svg t="1702111721212" class="name-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4240" width="200" height="200">
                        <path
                            d="M504.951 511.98c93.49 0 169.28-74.002 169.28-165.26 0-91.276-75.79-165.248-169.28-165.248-93.486 0-169.287 73.972-169.279 165.248-0.001 91.258 75.793 165.26 169.28 165.26z m77.6 55.098H441.466c-120.767 0-218.678 95.564-218.678 213.45V794.3c0 48.183 97.911 48.229 218.678 48.229H582.55c120.754 0 218.66-1.78 218.66-48.229v-13.77c0-117.887-97.898-213.45-218.66-213.45z"
                            p-id="4241" fill="#1296db"></path>
                    </svg>
                    <div class="tele">{{ teleRef }}</div>
                </div>
                <div class="myData-info-items-qAndw">
                    <div class="qq">
                        <svg t="1702112275315" class="qq-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1389" width="200" height="200">
                            <path
                                d="M953.344 666.624l2.048 14.336 0 8.192 0 6.144 0 6.144-1.024 7.168-1.024 12.288-3.072 11.264-3.072 10.24-1.024 5.12-2.048 4.096-3.072 4.096-2.048 4.096-2.048 3.072-3.072 3.072-2.048 3.072-3.072 2.048-3.072 1.024-3.072 2.048-3.072 1.024-2.048 0-1.024 0-3.072-1.024-4.096-2.048-2.048-2.048-3.072-1.024-2.048-3.072-2.048-2.048-4.096-4.096-4.096-6.144-4.096-6.144-4.096-6.144-4.096-6.144-5.12-10.24-5.12-11.264-1.024 0-1.024 0-2.048 1.024-1.024 3.072-3.072 4.096-3.072 10.24-6.144 15.36-8.192 18.432-5.12 9.216-6.144 10.24-7.168 11.264-7.168 10.24-4.096 5.12-5.12 5.12-10.24 10.24 1.024 1.024 1.024-4.096 5.12 3.072 22.528 11.264 10.24 5.12 9.216 5.12 9.216 7.168 8.192 7.168 4.096 3.072 3.072 4.096 3.072 3.072 2.048 5.12 2.048 4.096 1.024 4.096 1.024 4.096 1.024 4.096-1.024 3.072 0 3.072-1.024 3.072-1.024 3.072-1.024 2.048-2.048 4.096-3.072 5.12-4.096 4.096-3.072 3.072-2.048 3.072-6.144 4.096-7.168 4.096-8.192 3.072-7.168 4.096-9.216 3.072-5.12 2.048-4.096 1.024-10.24 2.048-10.24 3.072-11.264 2.048-11.264 1.024-12.288 1.024-12.288 2.048-12.288 0-13.312 0-13.312 0-13.312-1.024-13.312-2.048-13.312-1.024-14.336-1.024-14.336-3.072-14.336-3.072-13.312-3.072-14.336-3.072-13.312-5.12-14.336-4.096-6.144-3.072-7.168-2.048-4.096-1.024-4.096-1.024-5.12 0-6.144 0-13.312-1.024-6.144-1.024-8.192 0-6.144 4.096-7.168 5.12-10.24 5.12-11.264 6.144-7.168 3.072-7.168 3.072-15.36 6.144-9.216 2.048-9.216 2.048-12.288 3.072-7.168 0-9.216 1.024-8.192 1.024-9.216 1.024-10.24 0-10.24 0-21.504 0-22.528-1.024-22.528-2.048-12.288-2.048-10.24-2.048-11.264-1.024-10.24-2.048-10.24-3.072-9.216-3.072-9.216-3.072-9.216-3.072-7.168-4.096-7.168-5.12-7.168-4.096-2.048-2.048-3.072-3.072-2.048-2.048-3.072-3.072-1.024-4.096-1.024-3.072-3.072-6.144-1.024-2.048 0-4.096 0-3.072 0-4.096 0-4.096 1.024-4.096 0-2.048 0-5.12 1.024-4.096 2.048-4.096 1.024-5.12 2.048-5.12 2.048-2.048 2.048-3.072 4.096-5.12 4.096-2.048 2.048-2.048 4.096-3.072 4.096-1.024 4.096-2.048 4.096-2.048 5.12-2.048 6.144-2.048 6.144-1.024 6.144-1.024 7.168 0 7.168-1.024 2.048-1.024 1.024-1.024 0-1.024-1.024-1.024-4.096-2.048-10.24-3.072-7.168-5.12-7.168-7.168-8.192-8.192-8.192-9.216-9.216-11.264-4.096-6.144-4.096-6.144-4.096-7.168-4.096-7.168-4.096-8.192-3.072-8.192-4.096-8.192-4.096-9.216-3.072-9.216-2.048-11.264-1.024 0-1.024 0 0-1.024-1.024 0-1.024 1.024-1.024 0-1.024 2.048-1.024 2.048-1.024 2.048-1.024 3.072-5.12 9.216-2.048 4.096-3.072 5.12-4.096 5.12-5.12 5.12-4.096 5.12-5.12 5.12-6.144 4.096-5.12 4.096-6.144 4.096-6.144 2.048-8.192 2.048-3.072 1.024-2.048 0-2.048-1.024-2.048 0-2.048-2.048-1.024-2.048-4.096-6.144-1.024-3.072-1.024-5.12-2.048-5.12-1.024-6.144-1.024-11.264-1.024-7.168 0-7.168 0-15.36 1.024-16.384 2.048-8.192 1.024-9.216 1.024-9.216 3.072-9.216 3.072-10.24 3.072-10.24 4.096-10.24 3.072-9.216 5.12-10.24 5.12-11.264 6.144-9.216 7.168-11.264 7.168-10.24 7.168-10.24 6.144-8.192 8.192-8.192 8.192-9.216 3.072-4.096 5.12-4.096 7.168-6.144 7.168-6.144 11.264-10.24 8.192-6.144 3.072-2.048-1.024-5.12-2.048-7.168-1.024-4.096 0-4.096 0-6.144 0-5.12 2.048-6.144 1.024-6.144 2.048-7.168 4.096-7.168 3.072-8.192 6.144-7.168 0-5.12 0-6.144 1.024-6.144 2.048-8.192 3.072-8.192 1.024-4.096 2.048-4.096 3.072-3.072 2.048-3.072 0-6.144 0-6.144 0-7.168 2.048-10.24 1.024-11.264 4.096-14.336 3.072-14.336 3.072-7.168 3.072-9.216 3.072-8.192 4.096-8.192 4.096-9.216 4.096-9.216 5.12-9.216 6.144-9.216 3.072-5.12 4.096-5.12 6.144-10.24 7.168-9.216 8.192-10.24 8.192-10.24 9.216-10.24 10.24-9.216 11.264-11.264 8.192-6.144 9.216-7.168 9.216-6.144 10.24-6.144 10.24-6.144 10.24-4.096 11.264-5.12 11.264-4.096 12.288-4.096 12.288-4.096 12.288-3.072 12.288-2.048 13.312-2.048 13.312-1.024 13.312-2.048 13.312-1.024 13.312 0 13.312 0 14.336 0 13.312 2.048 14.336 1.024 13.312 2.048 13.312 3.072 14.336 3.072 13.312 3.072 13.312 3.072 13.312 5.12 12.288 5.12 12.288 5.12 13.312 6.144 11.264 7.168 11.264 7.168 10.24 7.168 4.096 3.072 5.12 4.096 9.216 7.168 7.168 7.168 8.192 8.192 7.168 8.192 6.144 8.192 7.168 9.216 5.12 9.216 5.12 8.192 6.144 9.216 4.096 8.192 8.192 17.408 3.072 9.216 3.072 9.216 3.072 9.216 3.072 8.192 2.048 7.168 2.048 9.216 4.096 15.36 3.072 13.312 1.024 13.312 2.048 10.24 2.048 16.384 1.024 2.048 1.024 3.072 6.144 9.216 3.072 5.12 3.072 6.144 3.072 6.144 3.072 7.168 3.072 8.192 2.048 8.192 1.024 8.192 1.024 5.12 1.024 5.12 0 5.12-1.024 4.096 0 5.12-1.024 6.144-3.072 10.24-2.048 5.12-2.048 6.144 0 2.048 1.024 1.024 3.072 5.12 12.288 17.408 9.216 14.336 4.096 8.192 6.144 10.24 5.12 10.24 6.144 11.264 6.144 13.312 7.168 14.336 4.096 9.216 4.096 9.216 3.072 9.216 3.072 8.192 2.048 8.192 2.048 8.192 3.072 16.384z"
                                fill="#8a8a8a" p-id="1390"></path>
                        </svg>
                        <div v-if="editFlag == '0'">{{ QQRef }}</div>
                        <div v-if="editFlag == '1'">
                            <input type="text" v-model="QQInputRef">
                        </div>
                    </div>
                    <div class="wechat">
                        <svg t="1702112316397" class="wc-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1735" width="200" height="200">
                            <path
                                d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                fill="#8a8a8a" p-id="1736"></path>
                        </svg>
                        <div v-if="editFlag == '0'">{{ wechatRef }}</div>
                        <div v-if="editFlag == '1'">
                            <input type="text" v-model="WeChatInputRef">
                        </div>
                    </div>
                </div>
                <div class="myData-info-items-introduce">
                    <div class="text">简介：</div>
                    <div v-if="editFlag == '0'">{{ introduceRef }}</div>
                    <div v-if="editFlag == '1'">
                        <input type="text" v-model="IntroduceInputRef">
                    </div>
                </div>
                <div class="myData-info-items-status">
                    <div class="status-border">
                        <div class="addr">
                            <div class="text">地区：</div>
                            <div class="province" v-if="editFlag == '0'">{{ provinceRef }}</div>
                            <div class="province-border" v-if="editFlag == '1'">
                                <div class="selectProvince" @click="showProvinceFun">{{ provinceInputRef }}</div>
                                <div class="provinceList" v-if="showProvinceFlag == '1'" tabindex="0" ref="provinceListRef"
                                    @blur="selectProvinceBlur">
                                    <div class="provinceItem" v-for="province in ProvinceList"
                                        @click="selectProvinceFun(province)">{{ province }}</div>
                                </div>
                            </div>
                            <div>-</div>
                            <div class="city" v-if="editFlag == '0'">{{ cityRef }}</div>
                            <div class="city-border" v-if="editFlag == '1'">
                                <div class="selectCity" @click="showCityFun">{{ cityInputRef }}</div>
                                <div class="cityList" v-if="showCityFlag == '1'" tabindex="0" ref="cityListRef"
                                    @blur="selectCityBlur">
                                    <div class="cityItem" v-for="city in CityList" @click="selectCity(city)">{{ city }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="registerTime">
                            <div>注册时间：</div>
                            <div>{{ registerTimeRef }}</div>
                        </div>
                        <div>账号状态：</div>
                        <div class="status" ref="statusRef">{{ statusRefValue }}</div>
                    </div>
                    <div class="buttons">
                        <div class="editButton" v-if="editFlag == '0'" @click="editInfoFun">编辑</div>
                        <div class="backButton" v-if="editFlag == '1'" @click="back">返回</div>
                        <div class="checkButton" v-if="editFlag == '1'" @click="PostPhoto">确认</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="myData-info2">
            <div class="myData-info2-left">
                <div class="myData-info2-left-money" ref="money"></div>
                <div class="myData-info2-left-comment" ref="comment"></div>
                <div class="myData-info2-left-collection" ref="collection"></div>
            </div>

            <div class="myData-info2-right">
                <div class="myData-info2-right-orderEnd" ref="orderEnd"></div>
                <div class="myData-info2-right-collectionType" ref="collectionType"></div>
                <div class="myData-info2-right-roomType" ref="roomType"></div>
            </div>
        </div>
        <div class="myData-orders" ref="orderList">

        </div>
        <div class="myData-spending" ref="spending"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import landStore from '@/utils/landInfo'
import { getLandInfoForMyData } from '@/api/Order'
import { PostBannerPhotos, getAllProvince, getAllLeaderCityByProvince } from '@/api/PublishRoom'
import { setToken } from '@/api/setToken'
import { PostChangeLandlordInfo } from '@/api/user'

let landInfoSore = landStore()
let statusRef = ref()
let statusRefValue = ref("--")
let registerTimeRef = ref("--")
let cityRef = ref()
let provinceRef = ref()
let QQRef = ref("")
let wechatRef = ref("")
let nameRef = ref("-")
let teleRef = ref("-")
let imgRef = ref("")
let introduceRef = ref("")

let money = ref()
let MoneyChart = ref()
let comment = ref()
let CommentChart = ref()
let collection = ref()
let CollectionChart = ref()
let orderEnd = ref()
let OrderEndChart = ref()
let collectionType = ref()
let CollectionTypeChart = ref()
let roomType = ref()
let RoomTypeChart = ref()
let orderList = ref()
let orderListChart = ref()
let spending = ref()
let spendingChart = ref()

let NotRatedNum = ref(0)
let RatedNum = ref(0)
let CompeleOrderNum = ref(0)
let CompeledOrderNum = ref(0)
let OrderEndNum = ref(0)
let OrderOtherNum = ref(0)
let MyHouse = ref()
let collectionMap = ref()
let OrderHouseMap = ref()
let OrderMonth = ref()
let OrderCount = ref()
let AllPrice = ref()

// 使用onMounted初始化图表
onMounted(() => {
    setTimeout(() => {
        getLandInfo()
        window.addEventListener('resize', handleResize);
    }, 300);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

// 获取用户信息
function getLandInfo() {
    try {
        statusRefValue.value = landInfoSore.landStatus
        if (statusRefValue.value == "1") {
            statusRef.value.style.backgroundColor = "rgb(243, 39, 90)"
            statusRefValue.value = "异常"
        }
        if (statusRefValue.value == "0") {
            statusRef.value.style.backgroundColor = "rgb(70, 201, 70)"
            statusRefValue.value = "正常"
        }
        imgRef.value = landInfoSore.landImgUrl
        teleRef.value = landInfoSore.landTele
        nameRef.value = landInfoSore.landName
        wechatRef.value = landInfoSore.landWechat
        QQRef.value = landInfoSore.landQq
        provinceRef.value = landInfoSore.landProvince
        cityRef.value = landInfoSore.landCounty
        registerTimeRef = landInfoSore.landRegisterTime
        introduceRef.value = landInfoSore.landIntroduce

        let token = localStorage.getItem('AT')
        let landlordId = landInfoSore.landId
        let data = {
            id: landlordId
        }
        getLandInfoForMyData(data, token).then(
            res => {
                if (res.status == 200) {
                    console.log(res.data)
                    if (res.data.code == "902") {
                        NotRatedNum.value = res.data.data.NotRatedNum
                        RatedNum.value = res.data.data.RatedNum
                        CompeleOrderNum.value = res.data.data.CompeleOrderNum
                        CompeledOrderNum.value = res.data.data.CompeledOrderNum
                        OrderEndNum.value = res.data.data.OrderEndNum
                        OrderOtherNum.value = res.data.data.OrderOtherNum
                        MyHouse.value = res.data.data.MyHouse
                        OrderHouseMap.value = res.data.data.OrderHouseMap
                        OrderMonth.value = res.data.data.OrderMonth
                        OrderCount.value = res.data.data.OrderCount
                        AllPrice.value = res.data.data.AllPrice
                        setEcharts()
                    }
                }
            }
        )
        // 操作完成后执行其他逻辑
    } catch (error) {
        // 处理错误
        console.error(error);
    }
}

function setEcharts() {
    // 在创建图表实例前，先销毁可能已存在的实例
    destroyCharts();
    // 余额
    MoneyChart.value = echarts.init(money.value);
    let moneyOption = {
        title: {
            text: '余额',
            textStyle: {
                lineHeight: 30
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '余额',
                type: 'pie',
                radius: ['35%', '80%'],
                avoidLabelOverlap: true,
                top: 35,
                color: 'rgb(243, 39, 90)',
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'center',
                    fontSize: '20'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: landInfoSore.landMoney, name: landInfoSore.landMoney }
                ]
            }
        ]
    };

    // 评论率
    CommentChart.value = echarts.init(comment.value);
    let commentOption = {
        title: {
            text: '评论率',
            textStyle: {
                lineHeight: 30
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '评论率',
                type: 'pie',
                radius: ['35%', '80%'],
                avoidLabelOverlap: true,
                top: 35,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: NotRatedNum.value, name: "未评论" },
                    { value: RatedNum.value, name: "已评论" }
                ]
            }
        ]
    };

    // 待确认订单
    CollectionChart.value = echarts.init(collection.value);
    let collectionOption = {
        title: {
            text: '待确认订单',
            textStyle: {
                lineHeight: 30
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '待确认订单',
                type: 'pie',
                radius: ['35%', '80%'],
                avoidLabelOverlap: true,
                top: 35,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: CompeledOrderNum.value, name: "已确认" },
                    { value: CompeleOrderNum.value, name: "待确认" }
                ]
            }
        ]
    };

    // 订单完成率
    OrderEndChart.value = echarts.init(orderEnd.value);
    let OrderEndoption = {
        title: {
            text: '订单完成率',
            left: 'center',
            textStyle: {
                lineHeight: 30
            },
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',

                type: 'pie',
                radius: '80%',
                top: 35,
                // color: ['rgb(243, 39, 90)', 'rgb(18, 180, 219)'],
                data: [
                    { value: OrderEndNum.value, name: '已完成' },
                    { value: OrderOtherNum.value, name: '未正常结束' }
                ]
            }
        ]
    };

    // 民宿类型
    CollectionTypeChart.value = echarts.init(collectionType.value);
    let CollectionTypeChartOption = {
        title: {
            text: '民宿类型',
            left: 'center',
            textStyle: {
                lineHeight: 30
            },
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',

                type: 'pie',
                radius: '80%',
                top: 35,
                data: MyHouse.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 110, 0.5)'
                    }
                }
            }
        ]
    };

    // 订单民宿类型
    RoomTypeChart.value = echarts.init(roomType.value);
    let RoomTypeChartoption = {
        title: {
            text: '订单民宿类型',
            left: 'center',
            textStyle: {
                lineHeight: 30
            },
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '80%',
                top: 35,
                data: OrderHouseMap.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 110, 0.5)'
                    }
                }
            }
        ]
    };

    // 每月订单
    orderListChart.value = echarts.init(orderList.value);
    let orderListOption = {
        title: {
            text: '每月订单数',
            left: 'center',
            textStyle: {
                lineHeight: 30
            }
        },
        xAxis: {
            type: 'category',
            data: OrderMonth.value
        },

        grid: {
            top: 70, // 设置整个图表向下移动 1px
            height: 200
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                label: {
                    show: true,
                    position: 'top' // 设置标签显示在点的上方
                },
                data: OrderCount.value,
                type: 'line'
            }
        ]
    };

    // 每月收入
    spendingChart.value = echarts.init(spending.value);
    let spendingChartOption = {
        title: {
            text: '每月收入',
            left: 'center',
            textStyle: { lineHeight: 56 }
        },
        xAxis: {
            type: 'category',
            data: OrderMonth.value
        },
        yAxis: {
            type: 'value'
        },

        grid: {
            top: 70, // 设置整个图表向下移动 1px
            height: 200
        },
        series: [
            {
                data: AllPrice.value,
                type: 'bar',
                label: {
                    show: true,
                    position: 'top' // 设置标签显示在点的上方
                },
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    MoneyChart.value.setOption(moneyOption);
    CommentChart.value.setOption(commentOption);
    CollectionChart.value.setOption(collectionOption);
    OrderEndChart.value.setOption(OrderEndoption)
    RoomTypeChart.value.setOption(RoomTypeChartoption)
    CollectionTypeChart.value.setOption(CollectionTypeChartOption)
    orderListChart.value.setOption(orderListOption)
    spendingChart.value.setOption(spendingChartOption)



}

// 动态调节echart大小
function handleResize() {
    MoneyChart.value.resize();
    CommentChart.value.resize();
    CollectionChart.value.resize();
    OrderEndChart.value.resize();
    RoomTypeChart.value.resize();
    CollectionTypeChart.value.resize();
    destroyCharts();
    setEcharts();
}

// 销毁echart实例
function destroyCharts() {
    if (orderListChart.value) {
        orderListChart.value.dispose();
        orderListChart.value = null;
    }
    if (spendingChart.value) {
        spendingChart.value.dispose();
        spendingChart.value = null;
    }
}

let editFlag = ref("0")
let showProvinceFlag = ref("0")
let showCityFlag = ref("0")
let nameInputRef = ref()
let QQInputRef = ref()
let cityInputRef = ref()
let IntroduceInputRef = ref()
let provinceInputRef = ref()
let provinceListRef = ref()
let cityListRef = ref()
let WeChatInputRef = ref()
let selectedProvince = ref()
let selectedCity = ref()
let ProvinceList = ref()
let CityList = ref()

// 进入编辑
function editInfoFun() {
    editFlag.value = "1"
    nameInputRef.value = nameRef.value
    WeChatInputRef.value = wechatRef.value
    cityInputRef.value = cityRef.value
    provinceInputRef.value = provinceRef.value
    QQInputRef.value = QQRef.value
    IntroduceInputRef.value = introduceRef.value

    selectedProvince.value = provinceRef.value
    selectedCity.value = cityRef.value
    oldImg.value = imgRef.value
    // 获取所有省份
    let AT = localStorage.getItem("AT");
    getAllProvince(AT).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                ProvinceList.value = res.data
            }
        }
    );
}

// 显示省份
function showProvinceFun() {
    showProvinceFlag.value = "1"
    setTimeout(() => {
        provinceListRef.value.focus()
    }, 20);
}

// 省份列表失去焦点隐藏
function selectProvinceBlur() {
    showProvinceFlag.value = "0"
}

// 显示城市
function showCityFun() {
    let data = {
        province: selectedProvince.value
    }
    // 获取当前省份的城市
    let AT = localStorage.getItem("AT");
    getAllLeaderCityByProvince(data, AT).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                CityList.value = res.data
                showCityFlag.value = "1"
                setTimeout(() => {
                    cityListRef.value.focus()
                }, 20);
            }
        }
    );
}

// 城市列表失去焦点隐藏
function selectCityBlur() {
    showCityFlag.value = "0"
}

// 选择省份
function selectProvinceFun(province) {
    selectedProvince.value = province
    provinceInputRef.value = selectedProvince.value
    showProvinceFlag.value = '0'
    cityInputRef.value = '-'
}

// 选择城市
function selectCity(city) {
    selectedCity.value = city
    cityInputRef.value = selectedCity.value
    showCityFlag.value = '0'
}

// 返回
function back() {
    editFlag.value = "0"
    imgRef.value = oldImg.value
}

let selectImg = ref()
let oldImg = ref()
// 修改头像,选择图片
function setPhoto(event) {
    let file = event.target.files[0];
    selectImg.value = file
    imgRef.value = URL.createObjectURL(selectImg.value)
}

let ReturnImgUrl = ref()
// 先保存图片再上传数据
function PostPhoto() {
    if (cityInputRef.value == '-' || cityInputRef.value == '' || cityInputRef.value == undefined || cityInputRef.value == null) {
        return
    }
    if (nameInputRef.value == undefined || nameInputRef.value == '') {
        return
    }
    if (selectedProvince.value == undefined || selectedProvince.value == '') {
        return
    }
    // 判断图片是否被修改
    if (selectImg.value != undefined && selectImg.value != '') {
        // 被修改则上传图片
        let AT = localStorage.getItem("AT");
        // 创建一个FormData对象
        let formData = new FormData();

        // 将当前选择的图片文件设置到FormData中
        formData.set('file', selectImg.value);

        // 发送上传请求
        PostBannerPhotos(formData, AT).then(
            res => {
                if (res.status == 200) {
                    if (res.data.data != "500" && res.data.data != '5000') {
                        ReturnImgUrl.value = res.data
                        setInfo(ReturnImgUrl.value)
                    } else if (res.data.data == '5000') {
                        setToken();
                        PostPhoto()
                    } else {
                        alert("上传失败")
                        return
                    }
                }
            }
        );
    } else {
        setInfo(imgRef.value)
    }
}

// 上传数据
function setInfo(url) {
    let AT = localStorage.getItem("AT");

    let data = {
        id: landInfoSore.landId,
        landlord_name: nameInputRef.value,
        qq: QQInputRef.value,
        wechat: WeChatInputRef.value,
        province: selectedProvince.value,
        county: selectedCity.value,
        img_url: url,
        introduce: IntroduceInputRef.value
    }

    console.log(data)
    PostChangeLandlordInfo(data, AT).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == '904') {
                    location.reload();
                }
            }
        }
    )
}
</script>

<style scoped>
.myData {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    background-color: rgb(246, 246, 246);
    flex-direction: column;
}

.myData-info {
    margin-top: 15px;
    height: 23%;
    width: 99%;
    border-radius: 15px;
    background-color: white;
    display: flex;
    align-items: center;
}

.myData-info-img {
    height: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.changeImg {
    position: relative;
    border: 1px solid rgb(173, 173, 173);
    margin-top: 2px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: white;
    border-radius: 5px;
    color: rgb(97, 97, 97);
    font-weight: 800;
    transition: all 0.5s;
}

.changeImg:hover {
    background-color: rgb(230, 230, 230);
    cursor: pointer;
}

.changeImg div {
    width: 100%;
    height: 100%;
}

.changeImg input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.myData-info-img img {
    padding-left: 15px;
    padding-right: 15px;
    height: 95%;
    aspect-ratio: 1/1;
}



.myData-info-items {
    width: 100%;
    height: 85%;
    font-weight: 800;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.myData-info-items-nameInfo {
    display: flex;
    align-items: flex-end;
}

.name {
    font-size: 1.5rem;
}

.name-edit {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.name-input {
    outline: none;
    height: 35px;
    font-size: 1.4rem;
    padding-left: 5px;
    border: 2px solid rgb(165, 165, 165);
    border-radius: 5px;
}

.name-icon {
    width: 20px;
    height: 20px;
    margin-left: 15px;
}

.tele {
    color: rgb(18, 150, 219);
    font-size: 0.9rem;
}

.tele-edit {
    margin-left: 20px;
}

.myData-info-items-qAndw {
    display: flex;
}

.qq,
.wechat {
    display: flex;
    align-items: center;
    justify-content: center;
}

.wechat {
    margin-left: 30px;
}

.qq div input,
.wechat div input {
    height: 25px;
    outline: none;
    padding-left: 5px;
    border: 2px solid rgb(165, 165, 165);
    border-radius: 5px;
}

.myData-info-items-introduce div input {
    width: 400px;
    height: 25px;
    outline: none;
    padding-left: 5px;
    border: 2px solid rgb(165, 165, 165);
    border-radius: 5px;
}

.wechat {
    margin-left: 30px;
}

.qq div,
.wechat div {
    color: rgb(138, 138, 138);
    padding-left: 3px;
    width: 170px;
}

.wc-icon,
.qq-icon {
    width: 20px;
    height: 20px;
}

.addr {
    display: flex;
}

.registerTime {
    display: flex;
    margin-left: 35px;
    margin-right: 30px;
}

.myData-info-items-status {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between
}

.buttons {
    display: flex;
}

.status-border {
    display: flex;
    align-items: center;
}

.status {
    background-color: rgb(70, 201, 70);
    color: white;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
}

.myData-info2 {
    margin-top: 20px;
    height: 20%;
    width: 99%;
    display: flex;
    justify-content: space-between;
}

.myData-info2-left,
.myData-info2-right {
    width: 49.5%;
    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
}

.myData-info2-left-money,
.myData-info2-left-collection,
.myData-info2-left-comment,
.myData-info2-right-collectionType,
.myData-info2-right-roomType,
.myData-info2-right-orderEnd {
    width: 30%;
    height: 100%;
}

.myData-spending,
.myData-orders {
    margin-top: 20px;
    height: 25%;
    width: 99%;
    border-radius: 15px;
    background-color: white;
}

.myData-info-items-introduce {
    display: flex;
}

.province-border,
.city-border {
    position: relative;
    width: 80px;
    margin-right: 10px;
}

.provinceList,
.cityList {
    padding-top: 5px;
    padding-bottom: 5px;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid rgb(165, 165, 165);
    border-radius: 5px;
    max-height: 150px;
    background-color: rgb(255, 255, 255);
    overflow-y: auto;
    z-index: 9999;
}

.cityList {
    margin-left: 10px;
}

.provinceItem,
.cityItem {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    width: 100%;
    cursor: pointer;
}

.provinceItem:hover,
.cityItem:hover {
    background-color: aliceblue;
}

.registerTime {
    display: flex;
    margin-left: 35px;
}

.myData-info-items-status {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between
}

.buttons {
    display: flex;
}

.status-border {
    display: flex;
    align-items: center;
}

.editButton {
    margin-right: 25px;
    cursor: pointer;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    background-color: rgb(96, 149, 248);
    color: white;
    transition: all 0.5s;
}

.checkButton {
    margin-right: 25px;
    cursor: pointer;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    background-color: var(--main-color);
    color: white;
    transition: all 0.5s;
}

.backButton {
    margin-right: 25px;
    cursor: pointer;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    background-color: rgb(161, 161, 161);
    color: white;
    transition: all 0.5s;
}

.editButton:hover {
    background-color: rgb(77, 119, 197);
}

.checkButton:hover {
    background-color: rgb(206, 24, 69);
}

.backButton:hover {
    background-color: rgb(122, 122, 122);
}

.status {
    background-color: rgb(70, 201, 70);
    color: white;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
}

.myData-info2 {
    margin-top: 20px;
    height: 20%;
    width: 99%;
    display: flex;
    justify-content: space-between;
}

.myData-info2-left,
.myData-info2-right {
    width: 49.5%;
    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
}

.myData-info2-left-money,
.myData-info2-left-collection,
.myData-info2-left-comment,
.myData-info2-right-collectionType,
.myData-info2-right-roomType,
.myData-info2-right-orderEnd {
    width: 30%;
    height: 100%;
}

.myData-spending,
.myData-orders {
    margin-top: 20px;
    height: 25%;
    width: 99%;
    border-radius: 15px;
    background-color: white;
}

.selectProvince,
.selectCity {
    width: 100%;
    margin-left: 10px;
    border: 2px solid rgb(122, 122, 122);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s;
}

.selectProvince:hover,
.selectCity:hover {
    background-color: aliceblue;
}

.selectProvince {
    margin-left: 0;
}
</style>