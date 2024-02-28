<template>
    <div class="MainHouse-list-house-border">
        <div class="MainHouse-list-house">
            <div class="MainHouse-list-house-item" v-for="(houseList) in HouseList" @click="toRoomView(houseList.id)">
                <div class="MainHouse-list-house-item-border">
                    <img :src="houseList.firstImg" alt="" loading="lazy">
                </div>
                <div class="MainHouse-list-house-item-detail">
                    <div class="MainHouse-list-house-item-detail-introduce">
                        {{ houseList.introduce }}
                    </div>
                    <div class="MainHouse-list-house-item-detail-name">
                        {{ houseList.house_name }}
                    </div>
                    <div class="MainHouse-list-house-item-detail-address">
                        {{ houseList.city_id }}
                    </div>
                    <div class="MainHouse-list-house-item-detail-price">
                        ${{ houseList.price }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getCollectionList } from '@/api/Room';
import useStore from '@/utils/userInfo';
import router from '@/router/router';

let userInfoStore = useStore()
let HouseList = ref()

onMounted(() => {
    let token = localStorage.getItem('AT')
    let consumerId = userInfoStore.userId
    let data = {
        consumerId: consumerId
    }
    getCollectionList(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.code == "902") {
                    HouseList.value = res.data.data
                }
            }
        }
    )
})

function toRoomView(id) {
    router.push("/index/house/room/" + id)
}
</script>

<style scoped>
.MainHouse-list-house-border {
    padding: 25px;
    width: 100%;
}

.MainHouse-list-house {
    margin-bottom: 50px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
    /* 可根据需要调整间距 */
}

.MainHouse-list-house-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* flex-basis: 25%; */
    /* width: 16%; */
    width: 100%;
    cursor: pointer;
    overflow: hidden;
}

.MainHouse-list-house-item-border {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
}

.MainHouse-list-house-item-border img {
    height: 100%;
    width: 100%;
    aspect-ratio: 16/15;
}

.MainHouse-list-house-item-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.MainHouse-list-house-item-detail-introduce {
    color: #838686;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
    overflow: hidden;
    /* 隐藏超出容器的部分 */
    text-overflow: ellipsis;
    /* 显示省略号 */
}

.MainHouse-list-house-item-detail-name {
    font-weight: 800;
    font-size: 1.4rem;
    color: #343636;
    white-space: nowrap;
    /* 防止文字换行 */
    overflow: hidden;
    /* 隐藏超出容器的部分 */
    text-overflow: ellipsis;
    /* 显示省略号 */
    width: 100%;
    /* 设置容器宽度，根据需要调整 */
}

.MainHouse-list-house-item-detail-address {
    font-weight: 800;
    font-size: 0.9rem;
    color: #343636;
}

.MainHouse-list-house-item-detail-price {
    font-weight: 800;
    font-size: 17px;
    color: #FF6C5C;
    text-decoration: underline;
    margin-bottom: 15px;
}
</style>