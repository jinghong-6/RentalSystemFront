<template>
    <div class="alertList">
        <div class="alertList-title">我的通知</div>
        <div class="alertList-list">
            <div class="alertList-list-item">
                <div class="alertList-list-item-left">
                    <div class="alertList-list-item-left-title"></div>
                    <div class="alertList-list-item-left-value"></div>
                    <div class="alertList-list-item-left-info">
                        <div class="alertList-list-item-left-info-text">系统通知</div>
                        <div class="alertList-list-item-left-info-time"></div>
                    </div>
                </div>
                <div class="alertList-list-item-right">
                    <div class="alertList-list-item-right-flag"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
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
</style>