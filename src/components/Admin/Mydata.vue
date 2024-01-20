<template>
    <div class="myData">
        <div class="myData-info2">
            <div class="myData-info2-left-money" ref="money"></div>
            <div class="myData-info2-left-comment" ref="comment"></div>
            <div class="myData-info2-left-collection" ref="collection"></div>
            <div class="myData-info2-right-orderEnd" ref="orderEnd"></div>
            <div class="myData-info2-right-collectionType" ref="collectionType"></div>
        </div>
        <div class="myData-orders" ref="orderList"></div>
        <div class="myData-roomType" ref="roomType"></div>
        <div class="myData-spending" ref="spending"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import adminStore from '@/utils/adminInfo';
import bus from "@/utils/bus"
import { getAllInfo } from '@/api/Admin'

let adminInfoStore = adminStore()

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

let OrderMonth = ref()
let OrderCount = ref()
let AllPrice = ref()

let OrderNum = ref()
let ConsumerNum = ref()
let LandlordNum = ref()
let HouseNum = ref()
let HouseTypeName = ref([])
let HouseTypeNum = ref([])

// 使用onMounted初始化图表
onMounted(() => {
    let at = localStorage.getItem("aatt")
    if (at != null && at != undefined && at != '') {
        console.log("at:" + at)
        getUserInfo()
        window.addEventListener('resize', handleResize);
    } else {
        bus.on('login', (e) => {
            console.log("e:" + e)
            getUserInfo()
            window.addEventListener('resize', handleResize);
        })
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

// 获取用户信息
function getUserInfo() {
    try {
        let token = localStorage.getItem("aatt");
        getAllInfo(token).then(
            res => {
                if (res.status == "200") {
                    console.log(res.data)
                    if (res.data.code == "902") {
                        let data = res.data.data
                        AllPrice.value = data.AllPrice
                        ConsumerNum.value = data.ConsumerNum
                        HouseNum.value = data.HouseNum
                        HouseTypeName.value = data.HouseType.name
                        HouseTypeNum.value = data.HouseType.value
                        OrderNum.value = data.OrderNum
                        LandlordNum.value = data.LandlordNum
                        OrderMonth.value = data.OrderMonth
                        OrderCount.value = data.OrderCount
                        setEcharts()
                    }
                }
            }
        )

    } catch (error) {
        // 处理错误
        console.error(error);
    }
}

function setEcharts() {
    try {
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
                        { value: adminInfoStore.money, name: adminInfoStore.money }
                    ]
                }
            ]
        };

        // 总订单数
        CommentChart.value = echarts.init(comment.value);
        let commentOption = {
            title: {
                text: '总订单数',
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
                    name: '总订单数',
                    type: 'pie',
                    radius: ['35%', '80%'],
                    avoidLabelOverlap: true,
                    top: 35,
                    // color: 'rgb(243, 39, 90)',
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
                        { value: OrderNum.value, name: OrderNum.value }
                    ]
                }
            ]
        };

        // 用户量
        CollectionChart.value = echarts.init(collection.value);
        let collectionOption = {
            title: {
                text: '用户量',
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
                    name: '用户量',
                    type: 'pie',
                    radius: ['35%', '80%'],
                    avoidLabelOverlap: true,
                    top: 35,
                    // color: 'rgb(243, 39, 90)',
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
                        { value: ConsumerNum.value, name: ConsumerNum.value }
                    ]
                }
            ]
        };

        // 商家量
        OrderEndChart.value = echarts.init(orderEnd.value);
        let OrderEndoption = {
            title: {
                text: '商家量',
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
                    name: '商家量',
                    type: 'pie',
                    radius: ['35%', '80%'],
                    avoidLabelOverlap: true,
                    top: 35,
                    // color: 'rgb(243, 39, 90)',
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
                        { value: LandlordNum.value, name: LandlordNum.value }
                    ]
                }
            ]
        };

        // 民宿量
        CollectionTypeChart.value = echarts.init(collectionType.value);
        let CollectionTypeChartOption = {
            title: {
                text: '民宿量',
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
                    name: '民宿量',
                    type: 'pie',
                    radius: ['35%', '80%'],
                    avoidLabelOverlap: true,
                    top: 35,
                    // color: 'rgb(243, 39, 90)',
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
                        { value: HouseNum.value, name: HouseNum.value }
                    ]
                }
            ]
        };

        // 民宿类型
        RoomTypeChart.value = echarts.init(roomType.value);
        let RoomTypeChartoption = {
            title: {
                text: '民宿类型',
                left: 'center',
                textStyle: { lineHeight: 56 }
            },
            xAxis: {
                type: 'category',
                data: HouseTypeName.value
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
                    data: HouseTypeNum.value,
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

        // 每月订单
        orderListChart.value = echarts.init(orderList.value);
        let orderListOption = {
            title: {
                text: '每月订单数',
                left: 'center',
                textStyle: { lineHeight: 56 }
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
    } catch (error) {
        // 处理错误
        console.error(error);
    }
}


// 动态调节echart大小
function handleResize() {
    try {
        MoneyChart.value.resize();
        CommentChart.value.resize();
        CollectionChart.value.resize();
        OrderEndChart.value.resize();
        CollectionTypeChart.value.resize();
        destroyCharts();
        setEcharts();
    } catch (error) {
        // 处理错误
        console.error(error);
    }
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
    if (RoomTypeChart.value) {
        RoomTypeChart.value.dispose();
        RoomTypeChart.value = null;
    }
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

.myData-info2 {
    margin-top: 20px;
    height: 20%;
    width: 99%;
    display: flex;
    justify-content: space-between;

    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
}

.myData-info2-left-money,
.myData-info2-left-collection,
.myData-info2-left-comment,
.myData-info2-right-collectionType,
.myData-info2-right-orderEnd {
    width: 30%;
    height: 100%;
}

.myData-spending,
.myData-orders,
.myData-roomType {
    margin-top: 20px;
    height: 24%;
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