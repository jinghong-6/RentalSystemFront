<template>
    <div class="Orders">
        <div style="height: 100%;">
            <div class="Orders-title">
                <RouterLink to="/admin/Role" class="Orders-title-item aa">用户</RouterLink>
                <RouterLink to="/admin/Role/Landlord" class="Orders-title-item">房东</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>



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
</style>