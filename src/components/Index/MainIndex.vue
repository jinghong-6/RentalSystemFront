<template>
    <div class="mainIndex">
        <div class="view1">
            <div class="mainIndex-title">
                <div class="mainIndex-title-1">
                    去那诗和远方
                </div>
                <div class="mainIndex-title-2">
                    惊鸿民宿，让您安心踏上旅途之路&ensp;&ensp;&ensp;700+城市和地区/160万套房源/用户使用服务1亿人次
                </div>
            </div>
            <div class="mainIndex-change-border">
                <div class="mainIndex-change" @click="rotateSVG">
                    <svg t="1700294257176" class="mainIndex-change-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4062"
                        :style="{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s' }">
                        <path
                            d="M899.072 463.238095c1.999238 15.969524 3.023238 32.256 3.023238 48.761905 0 215.454476-174.640762 390.095238-390.095238 390.095238-103.862857 0-198.265905-40.594286-268.190476-106.788571V902.095238H170.666667l0.024381-170.666667L170.666667 658.285714h243.809523v73.142857h-131.169523c57.685333 60.123429 138.825143 97.52381 228.693333 97.52381 175.055238 0 316.952381-141.897143 316.952381-316.952381a319.390476 319.390476 0 0 0-3.730286-48.761905h73.874286zM853.333333 121.904762l-0.024381 170.666667L853.333333 365.714286H609.52381v-73.142857h131.193904A316.025905 316.025905 0 0 0 512 195.047619C336.944762 195.047619 195.047619 336.944762 195.047619 512c0 16.579048 1.26781 32.889905 3.730286 48.761905h-73.874286A393.947429 393.947429 0 0 1 121.904762 512c0-215.454476 174.640762-390.095238 390.095238-390.095238 103.862857 0 198.290286 40.618667 268.190476 106.812952V121.904762h73.142857z"
                            p-id="4063" fill="#3498db"></path>
                    </svg>
                    <div>换一换</div>
                </div>

            </div>
            <div class="mainIndex-house">
                <div class="mainIndex-house-item" v-for="house in House">
                    <div class="mainIndex-house-item-imgBorder">
                        <img class="mainIndex-house-item-imgBorder-img" :src="house.firstImg" alt=""
                            @click="toRoomView(house.id)">
                    </div>
                    <div class="mainIndex-house-item-detail">
                        <div class="mainIndex-house-item-detail-introduce" @click="toRoomView(house.id)">
                            {{ house.introduce }}
                        </div>
                        <div class="mainIndex-house-item-detail-name" @click="toRoomView(house.id)">
                            {{ house.house_name }}
                        </div>
                        <div class="mainIndex-house-item-detail-address" @click="toRoomView(house.id)">
                            {{ house.city_id }}
                        </div>
                        <div class="mainIndex-house-item-detail-price">
                            ${{ house.price }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="recommend">
                <div class="recommend-title">寻找你未曾相遇的风景</div>
                <div class="recommend-title2">热门城市</div>
                <div class="recommend-row">
                    <div class="recommend-row-border">
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/beijing.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">北京</div>
                            </div>
                        </div>
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/shanghai.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">上海</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recommend-row">
                    <div class="recommend-row-border">
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/sanya.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">三亚</div>
                            </div>
                        </div>
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/guangzhou.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">广州</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recommend-row">
                    <div class="recommend-row-border">
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/haerbin.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">哈尔滨</div>
                            </div>
                        </div>
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/chengdu.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">成都</div>
                            </div>
                        </div>
                        <div class="recommend-row-border-div">
                            <img src="../../../public/img/hangzhou.jpg" alt="">
                            <div class="recommend-row-border-div-text">
                                <div class="recommend-row-border-div-text-city">杭州</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="beian">
                <a href="https://beian.miit.gov.cn/" target="_blank">网站备案/许可证号:11111111111111111111</a>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { getAllCity, getHouseRand } from '@/api/index'
import useStore from '@/utils/userInfo';
import useStore2 from '@/utils/landInfo';
import router from '@/router/router';

let userInfoStore = useStore()
let landInfoStore = useStore2()

let province = ref()
let selectedProvince = ref()
let county = ref([])

let showCity = ref(false)
let allCity = ref()

let House = ref()


onMounted(() => {
    if (userInfoStore.loginFlag == '0' && landInfoStore.loginFlag == '0') {
        userInfoStore.loginFlag = ''
        landInfoStore.loginFlag = ''
        location.reload();
    }
    getAllCity().then(
        res => {
            if (res.status == 200) {
                province.value = res.data
            }
        }
    )

    watch(showCity, (newValue) => {
        if (newValue) {
            setTimeout(() => {
                allCity.value.focus();
            }, 0);
        }
    });

    getHouseRandfun()
})

const rotation = ref(0);

const rotateSVG = () => {
    rotation.value += 360;
    getHouseRandfun()
};

function getHouseRandfun() {
    let consumerId = userInfoStore.userId
    let data = {
        consumerId: consumerId
    }
    getHouseRand(data).then(
        res => {
            if (res.status == 200) {
                House.value = res.data.data
                console.log(res.data.data)
            }
        }
    )
}

// function getProvince(value) {
//     selectedProvince.value = value
//     county.value = province.value[value]
// }

// function showSecondDiv() {
//     showCity.value = true
//     console.log(showCity.value)
// }

// function hideSecondDiv() {
//     showCity.value = false
//     console.log(showCity.value)
// }

function toRoomView(id) {
    router.push("/index/house/room/" + id)
}
</script>

<style scoped>
.mainIndex {
    width: 100%;
    /* height: 100%; */
    background-color: rgb(255, 255, 255);
    overflow: hidden;
    font-size: 20px;
    overflow-y: auto;
}

.view1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* height: 100%; */
}

.mainIndex-title {
    height: 250px;
    width: 100%;
    /* margin-top: 80px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("/public/img/features_banner.jpg");
}

.mainIndex-title-1 {
    font-weight: 800;
    color: rgb(243, 39, 90);
    font-size: 2.5rem;
}

.mainIndex-title-2 {
    color: #ffffff;
    margin-top: 10px;
    font-size: 1.4rem;
    overflow: hidden;
    white-space: nowrap;
}

.mainIndex-change-border {
    margin-top: 20px;
    width: 95%;
    display: flex;
    justify-content: flex-end;
}

.mainIndex-change {
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 1.4rem;
    font-weight: 800;
    color: #3498db;
    border: 2px solid #3498db;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s;
}

.mainIndex-change:hover {
    color: #59b5f1;
    border: 2px solid #59b5f1;
    box-shadow: 0 2px 0px #59b5f1;
    /* 只有下方的阴影 */
}

.mainIndex-change-icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
}

.mainIndex-house {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    flex: 1;
}

.mainIndex-house-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* flex-basis: 25%; */
    width: 25%;
}

.mainIndex-house-item-imgBorder {
    /* height: 20%; */
    width: 80%;
    /* border-radius: 20px; */
    overflow: hidden;
}

.mainIndex-house-item-imgBorder-img {
    height: 100%;
    width: 100%;
    aspect-ratio: 16/10;
    cursor: pointer;
    /* overflow: hidden; */
}

.mainIndex-house-item-detail {
    display: flex;
    flex-direction: column;
    width: 80%;
}

.mainIndex-house-item-detail-introduce {
    margin-top: 5px;
    color: #838686;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
    cursor: pointer;
}

.mainIndex-house-item-detail-address {
    font-weight: 800;
    font-size: 17px;
    color: #343636;
    cursor: pointer;
}

.mainIndex-house-item-detail-name {
    font-weight: 800;
    font-size: 20px;
    color: #343636;
    cursor: pointer;
}

.mainIndex-house-item-detail-price {
    font-weight: 800;
    font-size: 17px;
    color: #FF6C5C;
    text-decoration: underline;
    margin-bottom: 15px;
}

@media screen and (max-width: 1920px) {
    .mainIndex-title-1 {
        font-size: 2.2rem;
    }

    .mainIndex-title-2 {
        font-size: 1.2rem;
    }

    .mainIndex-house {
        margin-top: 40px;
        margin-bottom: 80px;
    }

    .mainIndex-house-item-detail-introduce {
        margin-top: 5px;
        color: #838686;
        overflow: hidden;
        white-space: nowrap;
        font-size: 16px;
    }

    .mainIndex-house-item-detail-address {
        font-weight: 800;
        font-size: 18px;
        color: #343636;
    }

    .mainIndex-house-item-detail-price {
        font-weight: 800;
        font-size: 17px;
        color: #FF6C5C;
        text-decoration: underline;
        margin-bottom: 15px;
    }
}

.recommend {
    width: 100%;
    background-color: #f3f3f3;
    padding-bottom: 20px;
}

.recommend-title {
    padding-top: 40px;
    color: #353535;
    /* font-weight: 800; */
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 2rem;
}

.recommend-title2 {
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;

    font-size: 1rem;
    font-weight: normal;
    color: #525252;
}

.recommend-row {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 15px;
}

.recommend-row-border{
    width: 1180px;
    display: flex;
    justify-content: space-between;
}

.recommend-row-border-div{
    position: relative;
}

.recommend-row-border-div-text{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.recommend-row-border-div-text-city{
    font-size: 1.7rem;
}

.recommend-row-border div img{
    cursor: pointer;
}

.beian{
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.beian a{
    font-size: 1rem;
}
</style>