<template>
    <div class="alertList">
        <div class="alertList-title">我的通知</div>
        <div class="alertList-list">
            <div class="alertList-list-item" @click="toAlert">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-title">扣款通知</div>
                    <div class="alertList-list-item-left-value">您于2022年12月10日预定泛华大酒店，预定日期为20-12，支出1299元</div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text">系统通知</div>
                        <div class="alertList-list-item-left-info-time">2022-12-01</div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag">已读</div>
                </div>
            </div>
            <div class="alertList-list-item">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-title">扣款通知</div>
                    <div class="alertList-list-item-left-value">您于2022年12月10日预定泛华大酒店，预定日期为20-12，支出1299元</div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text">系统通知</div>
                        <div class="alertList-list-item-left-info-time">2022-12-01</div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag">已读</div>
                </div>
            </div>
            <div class="alertList-list-item">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-title">扣款通知</div>
                    <div class="alertList-list-item-left-value">您于2022年12月10日预定泛华大酒店，预定日期为20-12，支出1299元</div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text">系统通知</div>
                        <div class="alertList-list-item-left-info-time">2022-12-01</div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag">已读</div>
                </div>
            </div>
            <div class="alertList-list-item">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-title">扣款通知</div>
                    <div class="alertList-list-item-left-value">您于2022年12月10日预定泛华大酒店，预定日期为20-12，支出1299元</div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text">系统通知</div>
                        <div class="alertList-list-item-left-info-time">2022-12-01</div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag">已读</div>
                </div>
            </div>
            <div class="alertList-list-item">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-title">扣款通知</div>
                    <div class="alertList-list-item-left-value">您于2022年12月10日预定泛华大酒店，预定日期为20-12，支出1299元</div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text">系统通知</div>
                        <div class="alertList-list-item-left-info-time">2022-12-01</div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag">已读</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import router from '@/router/router';

function toAlert(params) {
    router.push("/consumer/AlertView")
}
</script>

<style scoped>
.alertList{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.alertList-title{
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(151, 205, 230);
    color: var(--main-color);
    font-size: 2rem;
    font-weight: 800;
    flex-shrink: 0;
}

.alertList-list{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100% - 70px);
    overflow-y: auto;
}

.alertList-list-item{
    height: 150px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(197, 197, 197);
    cursor: pointer;
    transition: all 0.5s;
}

.alertList-list-item:hover{
    background-color: rgb(226, 226, 226);
    border-bottom: 1px solid var(--main-blue);
}

.alertList-list-item-left{
    display: flex;
    flex-direction: column;
}

.alertList-list-item-left-title{
    display: flex;
    font-weight: 800;
    font-size: 1.7rem;
}

.alertList-list-item-left-value{
    padding-top: 5px;
    font-size: 1rem;
    color: rgb(78, 78, 78);
}

.alertList-list-item-left-info{
    padding-top: 10px;
    display: flex;
}

.alertList-list-item-left-info-text{
    color: var(--main-blue);
}

.alertList-list-item-left-info-time{
    margin-left: 25px;
}

.alertList-list-item-right-flag{
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: var(--main-color); */
    background-color: rgb(67, 212, 75);
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    border-radius: 10px;
}
</style>