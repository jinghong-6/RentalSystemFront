<template>
    <div class="RoomCenterBorder">
        <div class="RoomCenter" v-if="showFlag2">
            <div class="RoomCenter-title">我的民宿</div>
            <div class="RoomCenter-title-list">
                <div class="RoomCenter-title-list-img">民宿图片</div>
                <div class="RoomCenter-title-list-name">民宿名称</div>
                <div class="RoomCenter-title-list-date">起止日期</div>
                <div class="RoomCenter-title-list-type">民宿类型</div>
                <div class="RoomCenter-title-list-num">最大入住人数</div>
                <div class="RoomCenter-title-list-price">单价</div>
                <div class="RoomCenter-title-list-status">当前状态</div>
                <div class="RoomCenter-title-list-take">操作</div>
            </div>
            <div class="RoomCenter-room-border">
                <div class="RoomCenter-room">
                    <div class="Orders-detail-null" v-if="!showFlag">
                        当前暂无订单
                    </div>
                    <div class="RoomCenter-room-item" v-for="(house, index) in HouseArr" v-if="showFlag">
                        <div class="RoomCenter-room-item-img">
                            <img :src="house.firstImg" alt="">
                        </div>
                        <div class="RoomCenter-room-item-name">
                            {{ house.house_name }}
                        </div>
                        <div class="RoomCenter-room-item-date">
                            {{ house.begin_time }}~{{ house.end_time }}
                        </div>
                        <div class="RoomCenter-room-item-type">
                            {{ house.type }}
                        </div>
                        <div class="RoomCenter-room-item-num">
                            {{ house.max_num }}人
                        </div>
                        <div class="RoomCenter-room-item-price">
                            {{ house.price }}$
                        </div>
                        <div class="RoomCenter-room-item-status">
                            {{ house.house_status }}
                        </div>
                        <div class="RoomCenter-room-item-take">
                            <div class="RoomCenter-room-item-take-border">
                                <div class="RoomCenter-room-item-take-edit" @click="toEdit(house.id)">编辑</div>
                                <div v-if="house.house_status == '正常'" class="RoomCenter-room-item-take-down"
                                    @click="downHouse(house.id)">下架</div>
                                <div v-if="house.house_status != '正常'" class="RoomCenter-room-item-take-up"
                                    @click="upHouse(house.id)">上架</div>
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
                    下架成功
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
                    上架成功
                </div>
            </div>
            <div v-if="UpdateUpfail" class="UpdateView">
                <div class="UpdateView-text">
                    上架失败
                </div>
            </div>
            <div v-if="UpdateDownfail" class="UpdateView">
                <div class="UpdateView-text">
                    下架失败
                </div>
            </div>
        </div>
        <div v-if="!showFlag2">
            <RouterView></RouterView>
        </div>
    </div>
</template>
      
<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { getHouseByLandlordId, UpdateHouseStatus } from '@/api/Room';
import useStore from '@/utils/landInfo';
import router from '@/router/router';

let userInfoStore = useStore()
let HouseArr = ref([])
let showFlag = ref(false)
// let showFlag2 = ref(true)
let showFlag2 = ref(false)
let UpdateDownSuccess = ref(false)
let UpdateDownfail = ref(false)
let UpdateUpSuccess = ref(false)
let UpdateUpfail = ref(false)

onMounted(() => {
    showFlag2.value = true
    getHouseInfo()
})

function getHouseInfo() {
    let token = localStorage.getItem('AT')
    let landlordId = userInfoStore.landId
    let data = {
        landlordId: landlordId
    }
    getHouseByLandlordId(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                HouseArr.value = res.data.data
                if (HouseArr.value.length > 0) {
                    for (let i = 0; i < HouseArr.value.length; i++) {
                        if (HouseArr.value[i].house_status == "0") {
                            HouseArr.value[i].house_status = "正常"
                        }
                        if (HouseArr.value[i].house_status == "1") {
                            HouseArr.value[i].house_status = "下架"
                        }
                        if (HouseArr.value[i].house_status == "2") {
                            HouseArr.value[i].house_status = "系统下架"
                        }
                    }
                    showFlag.value = true
                }
                if (HouseArr.value == "未找到相关民宿，请创建") {
                    showFlag.value = false
                }
            }
        }
    )
}

function toEdit(id) {
    showFlag2.value = false
    router.push('/landlord/RoomCenter/' + id);
}

function downHouse(id) {
    let token = localStorage.getItem('AT')
    let data = {
        id: id,
        status: "1"
    }
    UpdateHouseStatus(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == '904') {
                    UpdateDownSuccess.value = true
                    getHouseInfo()
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

function upHouse(id) {
    let token = localStorage.getItem('AT')
    let data = {
        id: id,
        status: "0"
    }
    UpdateHouseStatus(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == '904') {
                    UpdateUpSuccess.value = true
                    getHouseInfo()
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
.RoomCenterBorder {
    width: 100%;
    height: 100%;
}

.RoomCenter {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.RoomCenter-title {
    background-color: rgb(217, 237, 250);
    padding: 5px;
    padding-left: 10px;
    color: var(--main-color);
    font-weight: 800;
    height: 25px;
}

.RoomCenter-title-list {
    background-color: rgb(245, 251, 255);
    display: flex;
    width: calc(100% - 5px);
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    color: rgb(75, 75, 75);
    height: 20px;
}

.RoomCenter-title-list div {
    display: flex;
    font-size: 0.8rem;
    flex-shrink: 0;
    justify-content: center;
}

.RoomCenter-title-list-img,
.RoomCenter-room-item-img {
    width: 15%;
}

.RoomCenter-title-list-name,
.RoomCenter-room-item-name {
    width: 28%;
}

.RoomCenter-title-list-date,
.RoomCenter-room-item-date {
    width: 10%;
}

.RoomCenter-title-list-type,
.RoomCenter-room-item-type {
    width: 10%;
}

.RoomCenter-title-list-num,
.RoomCenter-room-item-num {
    width: 7%;
}

.RoomCenter-title-list-price,
.RoomCenter-room-item-price {
    width: 10%;
}

.RoomCenter-title-list-status,
.RoomCenter-room-item-status {
    width: 7.5%;
}

.RoomCenter-title-list-take,
.RoomCenter-room-item-take {
    width: 12.5%;
}

.RoomCenter-room {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}

.RoomCenter-room-item {
    border-bottom: 1px solid rgb(179, 209, 235);
    height: 175px;
    display: flex;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
}

.RoomCenter-room-item-img img {
    display: flex;
    border-radius: 10px;
    width: calc(100% - 20px);
    height: 100%;
}

.RoomCenter-room-item-name,
.RoomCenter-room-item-img,
.RoomCenter-room-item-date,
.RoomCenter-room-item-type,
.RoomCenter-room-item-num,
.RoomCenter-room-item-price,
.RoomCenter-room-item-status,
.RoomCenter-room-item-take {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: rgb(78, 78, 78);
    font-weight: 800;
}

.RoomCenter-room-item-take-edit {
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

.RoomCenter-room-item-take-edit:hover {
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

.RoomCenter-room-border {
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
}

.RoomCenter-room-item-take-border {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.RoomCenter-room-item-take-down {
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

.RoomCenter-room-item-take-down:hover {
    color: var(--main-blue);
    background-color: white;
}

.RoomCenter-room-item-take-up {
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

.RoomCenter-room-item-take-up:hover {
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