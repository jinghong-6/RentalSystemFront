<template>
    <div class="not-found">
        <h1>404</h1>
        <p>抱歉，页面不存在！</p>
        <p>你在找什么东西？？？</p>
        <router-link to="/">返回首页</router-link>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
};
</script>
<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 4rem;
    color: #2c96c7;
}

h1 {
    font-weight: bold;
    margin-bottom: 1rem;
    animation: shake 0.5s;
}

p {
    font-size: 2rem;
    margin-bottom: 2rem;
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }

    10% {
        transform: translateX(-10px);
    }

    20% {
        transform: translateX(10px);
    }

    30% {
        transform: translateX(-10px);
    }

    40% {
        transform: translateX(10px);
    }

    50% {
        transform: translateX(-10px);
    }

    60% {
        transform: translateX(10px);
    }

    70% {
        transform: translateX(-10px);
    }

    80% {
        transform: translateX(10px);
    }

    90% {
        transform: translateX(-10px);
    }

    100% {
        transform: translateX(0);
    }
}</style>