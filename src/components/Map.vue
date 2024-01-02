<template>
    <div class="container3" id="mapContainer"></div>
</template>

<script setup>
import { ref, watch,onMounted } from 'vue';
const props = defineProps(['lat', 'lon', 'isLoading']);

const loadedLat = ref('');
const loadedLon = ref('');



watch([() => props.lat, () => props.lon], ([newLat, newLon]) => {
  if (newLat !== '' && newLon !== '') {
    loadedLat.value = newLat;
    loadedLon.value = newLon;
    initMap();
  }
});

function initMap() {
    // 定义地图中心点坐标
    let center = new TMap.LatLng(loadedLat.value, loadedLon.value);
    // 定义map变量，调用 TMap.Map() 构造函数创建地图
    // 初始化地图
    var map = new TMap.Map('mapContainer', {
        zoom: 17, // 设置地图缩放
        center: center,
        pitch: 0, // 俯仰度
        rotation: 0, // 旋转角度
    });
    //创建并初始化MultiMarker
    var markerLayer = new TMap.MultiMarker({
        map: map,  //指定地图容器
        //样式定义
        styles: {
            //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
            "myStyle": new TMap.MarkerStyle({
                "width": 50,  // 点标记样式宽度（像素）
                "height": 50, // 点标记样式高度（像素）
                "src": 'img/local.png',  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                "anchor": { x: 16, y: 32 }
            })
        },
        //点标记数据数组
        geometries: [{
            "id": "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
            "styleId": 'myStyle',  //指定样式id
            "position": new TMap.LatLng(loadedLat.value, loadedLon.value),  //点标记坐标位置
            "properties": {//自定义属性
                "title": "marker1"
            }
        }]
    });

    map.setViewMode('2D');
}
</script>

<style scoped>
.container3{
    width: 100%;
    height: 500px;
}
</style>