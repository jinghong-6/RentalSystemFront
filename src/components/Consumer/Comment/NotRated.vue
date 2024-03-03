<template>
    <div class="Orders">
        <div style="height: 100%;" v-if="showOrderList">
            <div class="Orders-title">
                <RouterLink to="/consumer/Comment" class="Orders-title-item aa">待评价</RouterLink>
                <RouterLink to="/consumer/Comment/Rated" class="Orders-title-item">已评价</RouterLink>
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
                    <div class="Orders-detail-item-buttom">
                        <div @click="toWriteComment(order.uuid)">去评价</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!showOrderList">
            <div class="Orders-title">
                <div class="Orders-title-item aa">填写评价</div>
            </div>
            <div class="Orders-detail">
                <div class="Orders-detail-item">
                    <div class="Orders-detail-item-img">
                        <img :src="nowWriteComment.house_img" alt="">
                    </div>
                    <div class="Orders-detail-item-info">
                        <div class="Orders-detail-item-info-title">{{ nowWriteComment.house_name }}</div>
                        <div class="Orders-detail-item-info-time">{{ nowWriteComment.begin_time }}~{{
                            nowWriteComment.end_time }}</div>
                    </div>
                    <div class="Orders-detail-item-landlord-name">房东：{{ nowWriteComment.landName }}</div>
                    <div class="Orders-detail-item-landlord-tele">房东电话：{{ nowWriteComment.landTele }}</div>
                    <div class="Orders-detail-item-people">预定数量：{{ nowWriteComment.people_num }}间</div>
                    <div class="Orders-detail-item-price">{{ nowWriteComment.price_all }}$</div>
                    <div class="Orders-detail-item-deadtime-border">
                        <div class="Orders-detail-item-deadtime">订单创建时间： <span>{{ nowWriteComment.order_begin_time }}</span>
                        </div>
                        <div class="Orders-detail-item-deadtime">订单结束时间： <span>{{ nowWriteComment.order_close_time }}</span>
                        </div>
                    </div>
                    <div class="Orders-detail-item-buttom">
                        <div @click="back">返回</div>
                    </div>
                </div>
                <div class="Orders-input">
                    <div class="room-detail-comment-all-commentType">
                        <div class="room-detail-comment-all-commentType-item" v-for="(item, index) in commentTypeItem"
                            @click="getGrade(item, index)" ref="gradesRef">
                            {{ item }}
                        </div>
                    </div>
                    <textarea name="" id="" cols="30" rows="7" placeholder="发表你的评价" v-model="text"
                        @input="handleInput"></textarea>
                    <div class="counter-border">
                        <div class="counter">{{ remaining }} / {{ maxLength }}</div>
                    </div>
                    <div class="Orders-input-inertImg">
                        <img v-for="url in previewUrls" :key="url" :src="url" alt="Preview">
                        <span>+
                            <div>添加图片</div>
                            <input type="file" id="file-input" accept="image/*" @change="handleFileSelect" multiple>
                        </span>
                    </div>
                    <div class="Orders-input-buttom">
                        <div @click="upLoad">提交评价</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { setOrderComment, setOrderGrades, getNotRatedOrderByConsumerId } from '@/api/Order'
import { PostBannerPhotos } from '@/api/PublishRoom'
import useStore from '@/utils/userInfo';
import router from '@/router/router';

let userInfoStore = useStore()
let Orders = ref()
let showFlag = ref(false)
let showOrderList = ref(true)

let nowWriteComment = ref()
let ReturnImgs = ref([]);
let previewUrls = ref([]);
let selectedImages = ref([]);
let maxLength = 999;
let remaining = ref(maxLength);
let text = ref('');
let grade = ref("0");
let gradesRef = ref()
// 评价
let commentTypeItem = ref(['好评', '中评', '差评'])


onMounted(() => {
    getOrders()
})

function getOrders() {
    let token = localStorage.getItem('AT')
    let consumerId = userInfoStore.userId
    let data = {
        ConsumerId: consumerId
    }
    getNotRatedOrderByConsumerId(data, token).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                Orders.value = res.data.data

                // 
                // nowWriteComment.value = Orders.value[0]
                // showOrderList.value = false
                // // 
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

function toWriteComment(uuid) {
    for (let index = 0; index < Orders.value.length; index++) {
        if (uuid == Orders.value[index].uuid) {
            nowWriteComment.value = Orders.value[index]
            console.log(nowWriteComment.value)
        }
    }
    showOrderList.value = false
}

function back() {
    text.value = ""
    grade.value = "0"
    showOrderList.value = true
    nowWriteComment.value = undefined
    selectedImages.value = []
    getOrders()
}

// 设置评价图片
function handleFileSelect(event) {
    let files = event.target.files;
    if (files.length > 0 && selectedImages.value.length < 3) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (selectedImages.value.length < 8) {
                selectedImages.value.push(file);
                previewUrls.value.push(URL.createObjectURL(file));
            }
        }
    }
    // console.log(selectedImages.value);
    // console.log(previewUrls.value);
}

const handleInput = (event) => {
    text.value = event.target.value.substr(0, maxLength);
};

watch(text, (newValue) => {
    remaining.value = maxLength - newValue.length;
});

function getGrade(item, index) {
    if (item == "好评") {
        grade.value = "1"
    }
    if (item == "中评") {
        grade.value = "2"
    }
    if (item == "差评") {
        grade.value = "3"
    }


    for (let i = 0; i < 3; i++) {
        if (i == index) {
            gradesRef.value[index].style.color = 'rgb(255,255,255)'
            gradesRef.value[index].style.backgroundColor = 'rgb(243, 39, 90)'
        } else {
            gradesRef.value[i].style.color = 'rgb(109, 109, 109)'
            gradesRef.value[i].style.backgroundColor = 'rgb(240, 248, 255)'
        }

    }
}

// 上传
function upLoad() {
    if (grade.value == "0") {
        return
    }
    if (text.value == "" || text.value == undefined) {
        return
    }
    let AT = localStorage.getItem("AT");

    // 逐个上传选定的图片
    function uploadImage(index) {
        if (index >= selectedImages.value.length) {
            // 所有图片上传完成
            if (ReturnImgs.value.length != 0 || selectedImages.value.length == 0) {

                let data2 = {
                    uuid: nowWriteComment.value.uuid,
                    grades: grade.value
                }

                setOrderGrades(data2, AT).then(
                    res => {
                        if (res.status == 200) {
                            console.log(res.data)
                        }
                    }
                )

                let data = {
                    uuid: nowWriteComment.value.uuid,
                    content: text.value,
                    user_id: userInfoStore.userId,
                    imgs: ReturnImgs.value,
                    user_type: '0'
                }

                setOrderComment(data, AT).then(
                    res => {
                        if (res.status == 200) {
                            console.log(res.data.code)
                            if (res.data.code == "904") {
                                back()
                            }
                        }
                    }
                )


            }
            return;
        }

        // 创建一个FormData对象
        let formData = new FormData();

        // 将当前选择的图片文件设置到FormData中
        formData.set('file', selectedImages.value[index]);

        // 发送上传请求
        PostBannerPhotos(formData, AT).then(
            res => {
                if (res.status == 200) {
                    if (res.data.data != "500") {
                        // console.log(res.data);
                        ReturnImgs.value.push(res.data)
                    } else if (res.data.data == '5000') {
                        setToken();
                        upLoad();
                    } else {
                        return
                    }
                }

                // 递归调用，上传下一张图片
                uploadImage(index + 1);
            }
        );
    }

    // 开始上传第一张图片
    uploadImage(0);
    // console.log(ReturnImgs.value.length)

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
    height: calc(100% - 70px);
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
    background-color: aliceblue;
    color: rgb(109, 109, 109);
    transition: all 0.5s;
}

.room-detail-comment-all-commentType-item:hover {
    background-color: var(--main-color);
    color: white;
}
</style>