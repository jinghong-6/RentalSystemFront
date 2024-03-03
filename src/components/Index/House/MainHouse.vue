<template>
    <div class="MainHouse" @scroll="fetchData">
        <div class="MainHouse-search">
            <div class="MainHouse-search-address" @click="showSecondDiv">{{ selectedProvince }}</div>
            <div class="mainIndex-title-search-2" v-if="showCity" @blur="hideSecondDiv" tabindex="0" ref="allCity">
                <div class="mainIndex-title-search-2-key">
                    <div class="mainIndex-title-search-2-key-item" v-for="province2 in province" :key="key"
                        @click="getProvince(province2)">{{ province2 }}</div>
                </div>
            </div>
            <div class="MainHouse-search-inputBorder">
                <div class="MainHouse-search-inputBorder-input">
                    <input type="text" v-model="searchValue">
                </div>
                <svg @click="SearchHouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                    style="display:block;fill:none;height:12px;width:12px;stroke:currentColor;stroke-width:5.333333333333333;overflow:visible"
                    aria-hidden="true" role="presentation" focusable="false">
                    <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                </svg>
            </div>
        </div>
        <div class="MainHouse-list">
            <div class="MainHouse-list-type">
                <div class="MainHouse-list-type-item" @click="getHouseByType('普通公寓')">
                    <svg t="1699538867956" class="MainHouse-list-type-item-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4266" width="200" height="200">
                        <path
                            d="M853.333333 896h-42.666666v-192h-85.333334v-42.666667h128c-20.693333-12.458667-30.72-33.28-34.304-56.533333L802.112 490.666667H725.333333v-42.666667h70.229334l-3.946667-21.333333h43.178667l26.410666 171.669333C867.050667 636.437333 899.84 664.576 938.666667 661.333333v42.666667h-85.333334v192z m-170.666666 0h256v42.666667H85.333333v-42.666667h42.666667V405.333333H42.666667v-42.666666c38.570667 3.242667 71.36-24.896 77.226666-62.997334L146.304 128H189.44l-3.925333 21.333333h439.36l-3.946667-21.333333h43.178667l26.410666 171.669333C696.384 337.770667 729.173333 365.909333 768 362.666667v42.666666h-85.333333v490.666667z m-42.666667-490.666667H170.666667v490.666667h469.333333V405.333333z m-405.333333 64h149.333333v149.333334h-149.333333v-149.333334z m0 192h149.333333v149.333334h-149.333333v-149.333334z m192-192h149.333333v149.333334h-149.333333v-149.333334z m0 192h149.333333v149.333334h-149.333333v-149.333334z m-149.333334-149.333333v64h64v-64h-64z m0 256h64v-64h-64v64z m192-256v64h64v-64h-64z m0 256h64v-64h-64v64z m179.029334-461.866667L631.445333 192H178.986667l-16.896 114.133333a120.426667 120.426667 0 0 1-28.16 60.8h542.592a120.426667 120.426667 0 0 1-28.16-60.8z"
                            fill="#717171" p-id="4267"></path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">普通公寓</div>
                </div>
                <div class="MainHouse-list-type-item" @click="getHouseByType('别墅')">
                    <svg t="1699539015985" class="MainHouse-list-type-item-icon" viewBox="0 0 1053 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5825" width="200" height="200">
                        <path
                            d="M876.501554 24.406218a35.37133 35.37133 0 0 1-19.100518 42.799309h-3.537133l-82.768912 26.88221v240.525044h188.882902a35.37133 35.37133 0 0 1 35.37133 31.480483v221.070812h20.869084a35.37133 35.37133 0 0 1 35.37133 35.37133v141.485319a35.37133 35.37133 0 0 1-35.37133 35.37133h-20.869084v189.236615a35.37133 35.37133 0 0 1-31.480484 35.37133H35.37133a35.37133 35.37133 0 0 1-35.37133-35.37133V565.941278a35.37133 35.37133 0 0 1 35.37133-35.37133h106.11399V299.595164l-95.502591 30.773057a35.37133 35.37133 0 0 1-43.153023-19.454231V307.73057a35.37133 35.37133 0 0 1 18.039379-42.799309h3.537133L832.287392 1.768566a35.37133 35.37133 0 0 1 44.214162 22.637652z m-302.778583 773.924697h-111.065976v154.218999h111.065976zM392.621762 601.312608H70.74266v350.529879h321.879102z m287.215198 196.310881H601.312608v154.218998h78.170639z m245.123316 0h-99.039723v154.218998h99.039723z m-127.336787 0H707.426598v154.218998h89.843177z m183.577202-141.48532H462.656995v70.74266h518.543696z m-56.240415-252.197582H462.656995v182.162349h111.065976v-117.079102a14.148532 14.148532 0 0 1 11.318825-13.794818H813.540587a14.148532 14.148532 0 0 1 13.794819 11.672538v121.677375h99.039724z m-245.123316 77.109499H601.312608v106.11399h78.170639z m117.786529 0H707.426598v106.11399h89.843177z m-96.917444-343.455613L210.105699 284.739206v247.599309h182.516063v-161.293265a35.37133 35.37133 0 0 1 31.480483-35.371329h276.6038zM315.512263 314.804836a28.297064 28.297064 0 0 1 27.94335 27.943351v28.297063a28.297064 28.297064 0 0 1-27.94335 27.943351h-28.297064a28.297064 28.297064 0 0 1-27.943351-27.943351v-28.297063a28.297064 28.297064 0 0 1 27.943351-27.943351z"
                            p-id="5826" fill="#717171"></path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">别墅</div>
                </div>
                <div class="MainHouse-list-type-item" @click="getHouseByType('庄园豪宅')">
                    <svg t="1699539659920" viewBox="0 0 1218 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="8309" width="200" height="200">
                        <path
                            d="M553.268796 552.360893h-27.209896a26.907564 26.907564 0 0 1-27.209896-26.907564v-139.375135a26.907564 26.907564 0 0 1 27.209896-26.907564h27.209896a26.907564 26.907564 0 0 1 27.209896 26.907564v139.375135a26.907564 26.907564 0 0 1-27.209896 26.907564m139.072803 0H665.131703a26.907564 26.907564 0 0 1-27.209897-26.907564v-139.375135a26.907564 26.907564 0 0 1 27.209897-26.907564h27.209896a26.907564 26.907564 0 0 1 27.209896 26.907564v139.375135a26.907564 26.907564 0 0 1-27.209896 26.907564m468.614878-139.072803h-278.145605v-117.90955l9.069965 6.046643a30.233218 30.233218 0 0 0 39.303184-6.046643l18.139931-21.163253a30.233218 30.233218 0 0 0-6.046644-39.303183L640.945128 11.488623a54.419792 54.419792 0 0 0-66.513079 0L272.099869 238.237758a30.233218 30.233218 0 0 0-6.046644 39.303183l18.139931 21.163253a30.233218 30.233218 0 0 0 39.303183 5.744311l9.069966-5.744311v117.607218H54.420699a54.11746 54.11746 0 0 0-54.419792 54.419792v498.848097a54.11746 54.11746 0 0 0 54.419792 54.419792h1109.5591a54.11746 54.11746 0 0 0 54.419793-54.419792V471.033536a60.466436 60.466436 0 0 0-57.443115-57.745446zM81.630596 942.369404V498.243432h247.912387v444.125972z m498.848096 0v-139.072802H634.898485v139.072802z m139.072803 0v-166.282698a53.815128 53.815128 0 0 0-54.419792-54.117461h-111.862907a53.815128 53.815128 0 0 0-54.419792 54.117461v166.282698h-81.629689V234.912104L607.688588 90.699654l193.492595 145.119446v707.457301z m414.195086 0h-247.912387V498.243432h247.912387z m-108.839584-84.350678H997.6971a27.209896 27.209896 0 0 1-27.209896-27.512228v-220.702491a27.209896 27.209896 0 0 1 27.209896-27.209897h27.209897a27.209896 27.209896 0 0 1 27.209896 27.209897v220.702491a27.209896 27.209896 0 0 1-27.209896 27.512228m-804.203599 0h-30.233218a27.209896 27.209896 0 0 1-27.209896-27.512228v-220.702491a27.209896 27.209896 0 0 1 27.209896-27.209897h27.209896a27.209896 27.209896 0 0 1 27.209897 27.209897v220.702491a23.279578 23.279578 0 0 1-24.186575 27.512228"
                            p-id="8310" fill="#717171"></path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">庄园豪宅</div>
                </div>
                <div class="MainHouse-list-type-item" @click="getHouseByType('小木屋')">
                    <svg t="1699539775608" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="17094" width="200" height="200">
                        <path
                            d="M959.9 945.6c-20.4-0.6-36.5-17.2-36.5-37.6l1-525.1h42.7c24.8 0 28.9-12.1 9.6-26.9L516.7 5.3C512.1 1.8 506.1 0 500.1 0c-6.6 0-13.3 2.1-18.3 6.3L46.2 369.5c-18.9 15.8-13.9 29 10.6 29.5l42.8 0.9 1.7 507.9c0.1 20.8-16.8 37.7-37.5 37.7h-0.5c-21 0-38.1 17.2-38.1 38.3v0.5c0.3 21.5 17.7 38.9 39.1 38.9l896.4 0.8h0.1c20.9 0 37.9-17.1 37.9-38.2v-0.5c-0.1-21.5-17.3-39.1-38.8-39.7z m-99.5-562.8l-1.1 561.7v1.4c0 7.8-6.3 14-14.1 14l-665.7-0.6c-7.7 0-14-6.3-14.1-14l-1.8-545.6-0.1-44.8L500.9 73.7l359.6 274.2-0.1 34.9z"
                            p-id="17095" fill="#717171"></path>
                        <path
                            d="M337.4 658.6L219 657.4c-2.2 0-4 1.8-4 4v105.3c0 2.2 1.8 4 4 4l118.4 0.4c2.2 0 4-1.8 4-4V662.6c-0.1-2.2-1.8-4-4-4z m240.1-1.2H459.1c-2.2 0-4 1.8-4 4v244.1c0 2.2 1.8 4 4 4l122.4 0.7V661.4c0-2.2-1.8-4-4-4z m227.6 1.2l-122.5-1.2v109.3c0 2.2 1.8 4 4 4l118.4 0.5c2.2 0 4-1.8 4-4V662.6c0.1-2.2-1.7-4-3.9-4z m-467.7-202L219 455.2h-0.1c-2.2 0-4 1.8-4 4v105.2c0 2.2 1.8 4 4 4l118.4 0.5c2.2 0 4-1.8 4-4V460.6c0-2.2-1.7-4-3.9-4z m240.2 0l-118.4-1.4c-2.2 0-4 1.8-4 4v105.1c0 2.2 1.8 4 4 4l118.4 0.6c2.2 0 4-1.8 4-4V460.6c-0.1-2.2-1.8-4-4-4z m227.5 0l-118.4-1.4c-2.2 0-4 1.8-4 4v105.1c0 2.2 1.8 4 4 4l118.4 0.6c2.2 0 4-1.8 4-4V460.6c0-2.2-1.8-4-4-4zM577.6 254.3l-118.4-1.4c-2.2 0-4 1.8-4 4v105.3c0 2.2 1.8 4 4 4l118.4 0.5c2.2 0 4-1.8 4-4V258.3c-0.1-2.2-1.8-4-4-4z"
                            p-id="17096" fill="#717171"></path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">小木屋</div>
                </div>
                <div class="MainHouse-list-type-item" @click="getHouseByType('乡野民宿')">
                    <svg t="1699539845841" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="19261" width="200" height="200">
                        <path
                            d="M924.184059 360.644702c-14.79399-69.282286-32.886615-123.848427-53.831489-162.161005-26.581259-48.660951-59.022704-73.337467-96.387775-73.337466-35.047999 0-65.950811 21.456941-91.999325 63.802805H281.510911l-9.669672 12.677609c-0.891556 1.146981-89.391555 116.105391-189.165539 167.451957-5.992764 3.096728-10.516224 6.171562-14.236919 9.691565-9.714675 9.190445-13.747962 21.981171-10.806923 34.201447 2.47276 10.34959 10.449327 23.707116 34.290238 28.585739 7.018114 1.43768 15.975028 2.43992 28.22936 3.152678 20.676069 1.215095 48.394579 1.459573 80.523432 1.749055 15.953134 0.144741 33.266104 0.300429 51.134927 0.600858v260.375678c-41.353355 41.698787-64.080124 98.825262-64.080125 161.380133 0 17.703405 14.460721 32.063172 32.262648 32.063172 17.825037 0 32.262647-14.360983 32.262647-32.063172 0-94.492763 67.845823-163.073238 161.270665-163.073238 88.877055 0 156.878566 63.83443 162.916333 150.45158v5.501374c0 1.774598 0.135011 3.489596 0.425709 5.181484 0 0.645861 0.020677 1.292939 0.020677 1.9388 0 17.703405 14.438827 32.063172 32.263864 32.063172 17.801927 0 32.261431-14.360983 32.26143-32.063172 0-4.879839-0.156904-9.725622-0.443953-14.526401 0.400166-187.516222 15.885021-358.846994 43.736108-483.128428 32.175073-143.589153 71.230816-181.889568 89.258977-181.889568 17.713136 0 55.991657 38.891542 87.096376 184.67492 26.913312 126.176446 41.732844 301.60497 41.732844 493.95846 0 17.713136 14.436394 32.06074 32.260214 32.06074s32.262647-14.34882 32.262647-32.06074c0.002433-196.684774-15.325518-376.838665-43.132817-507.260036z m-302.441792-3.420267c-21.500728 95.885439-35.872658 218.163608-41.978539 353.710514a212.243823 212.243823 0 0 0-6.638625-6.639842c-42.291131-40.407065-98.97122-62.665555-159.597021-62.665554-34.380244 0-67.399437 7.198128-97.19054 20.834189V384.496559l-31.371091-0.869662c-29.343501-0.801549-58.241832-1.05819-83.710167-1.291723-6.593621-0.05595-13.457264-0.110684-20.364694-0.189744 62.097538-47.179484 111.695048-104.073644 132.21543-129.072482h338.582038c-11.03194 29.64393-21.056775 64.44745-29.946791 104.151487z m-109.155391 26.102033H379.636795v129.352233H512.586876V383.326468z"
                            fill="#717171" p-id="19262"></path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">乡野民宿</div>
                </div>
                <div class="MainHouse-list-type-item" @click="getHouseByType('景点民宿')">
                    <svg t="1699539909613" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="23001" width="200" height="200">
                        <path
                            d="M972.8 474.453333L590.506667 139.946667l-27.306667-23.893334L546.133333 102.4l-17.066666 13.653333-273.066667 238.933334-10.24 6.826666-126.293333 112.64 34.133333 37.546667 95.573333-81.92v78.506667L68.266667 662.186667l34.133333 37.546666 78.506667-64.853333V914.773333h665.6V433.493333l95.573333 81.92 30.72-40.96z m-180.906667 385.706667H232.106667v-269.653333l30.72-23.893334 30.72-27.306666 6.826666-6.826667L443.733333 409.6l290.133334 242.346667 34.133333-40.96L443.733333 341.333333l-143.36 122.88v-78.506666L546.133333 170.666667l30.72 27.306666 215.04 187.733334v474.453333z"
                            fill="#717171" p-id="23002"></path>
                        <path
                            d="M348.16 778.24h187.733333v-187.733333h-187.733333v187.733333z m54.613333-136.533333h85.333334v85.333333h-85.333334v-85.333333z"
                            fill="#717171" p-id="23003"></path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">景点民宿</div>
                </div>
                <div class="MainHouse-list-type-item" @click="getHouseByType('原生态')">
                    <svg t="1699540007976" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="26514" width="200" height="200">
                        <path
                            d="M574.320809 349.122135H181.002702a43.532295 43.532295 0 0 1-34.876752-70.008077L342.657716 16.392837a45.568894 45.568894 0 0 1 70.008078 0l196.786341 262.721221a43.78687 43.78687 0 0 1-35.131326 70.008077zM220.716375 285.733003H534.607136l-157.072668-209.769657z"
                            fill="#717171" p-id="26515"></path>
                        <path
                            d="M704.15397 767.897725H50.914965a43.78687 43.78687 0 0 1-34.876751-70.008078l254.574827-338.584519a134.160934 134.160934 0 0 1 108.194301-54.224438 134.160934 134.160934 0 0 1 108.448876 54.224438l254.574826 338.584519a43.78687 43.78687 0 0 1-35.131326 70.008078zM687.352031 736.075871zM90.883213 704.254018H664.440297l-229.117344-305.489792a71.790101 71.790101 0 0 0-114.813246 0zM345.712614 768.661449h63.643707v228.608194h-63.643707zM888.720719 473.35465H628.036097a42.513996 42.513996 0 0 1-37.677074-23.675459 44.550595 44.550595 0 0 1 4.073197-46.841768l25.457482-37.931649 105.648553-136.706682a42.768571 42.768571 0 0 1 33.349303-16.547363 41.495697 41.495697 0 0 1 33.603877 17.056513l130.342311 174.129181a44.550595 44.550595 0 0 1 4.073197 46.841768 42.004846 42.004846 0 0 1-38.186224 23.675459zM647.383784 438.477899v1.527449z m18.838537-28.257806h181.766426l-89.864914-120.159318z m109.72175-143.071052z"
                            fill="#717171" p-id="26516"></path>
                        <path
                            d="M978.840208 767.897725H617.598529v-63.643707h321.018856l-135.179233-183.54845a54.479013 54.479013 0 0 0-89.864913 0l-74.844999 87.319166L590.613597 565.765312l73.062976-85.537141a116.849845 116.849845 0 0 1 190.931119 2.036598l158.090968 214.352004a45.568894 45.568894 0 0 1 3.818622 47.350918 42.004846 42.004846 0 0 1-37.677074 23.930034z"
                            fill="#717171" p-id="26517"></path>
                        <path d="M726.556555 736.075871h63.643706v260.939197h-63.643706z" fill="#717171" p-id="26518">
                        </path>
                    </svg>
                    <div class="MainHouse-list-type-item-text">原生态</div>
                </div>
            </div>
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
    </div>
</template>
      
<script setup>
import { ref, onMounted, watch } from 'vue';
import { getHouse, getHouseType, getHouseSearch, getAllCity, getHouseCity } from '@/api/index';
import router from '@/router/router';
import userStore from '@/utils/userInfo';
import searchStore from '@/utils/searchInfo'

let userInfoStore = userStore()
let searchInfoStore = searchStore()
var isEnd = ref(false);
let isLoading = ref(false)
let index = 0
let TypeFlag = ref("0")
let SearchFlag = ref("0")
let CityFlag = ref("0")
let HouseList = ref([])
let searchValue = ref()
let province = ref()
let selectedProvince = ref("城市")
let showCity = ref(false)
let allCity = ref()

onMounted(() => {
    let searchType = searchInfoStore.Type
    if (searchType != "") {
        if (searchType == "Province") {
            selectedProvince.value = searchInfoStore.Value
            getProvince(selectedProvince.value)
        }
        if (searchType == "Key") {
            searchValue.value = searchInfoStore.Value
            SearchHouse()
        }
        searchInfoStore.Type = ""
        searchInfoStore.Value = ""
    } else {
        let data = {
            index: index
        }
        getHouse(data).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == "902") {
                        HouseList.value = res.data.data
                        console.log(HouseList.value)
                    }
                }
            }
        )
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
})

function fetchData(event) {
    //vue中获取滚动条到底部的距离
    let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight
    //以下三个条件不执行数据加载：1.数据正在加载的状态，2.已经到底了，3.滚动条距离底部的距离小于350px
    if (!isLoading.value && !isEnd.value && scrollBottom < 350) {
        isLoading.value = true
        index = index + 1
        if (TypeFlag.value == "0" && SearchFlag.value == "0" && CityFlag.value == "0") {
            let data = {
                index: index
            }
            getHouse(data).then(
                res => {
                    if (res.status == 200) {
                        if (res.data.code == "902") {
                            // for(let i = 0;i<res.data.data.length;i++){
                            //     HouseList.value.push = res.data.data[i]
                            // }
                            if (res.data.data == undefined || res.data.data.length == 0 || res.data.data == "") {
                                isEnd.value = true
                            } else {
                                Array.prototype.push.apply(HouseList.value, res.data.data);
                            }
                            isLoading.value = false
                            console.log(HouseList.value)
                        }
                    }
                }
            )
        } else if (TypeFlag.value != "0") {
            let data = {
                Type: TypeFlag.value,
                index: index
            }
            getHouseType(data).then(
                res => {
                    if (res.status == 200) {
                        if (res.data.code == "902") {
                            if (res.data.data == undefined || res.data.data.length == 0 || res.data.data == "") {
                                isEnd.value = true
                            } else {
                                Array.prototype.push.apply(HouseList.value, res.data.data);
                            }
                            isLoading.value = false
                            console.log(HouseList.value)
                        }
                    }
                }
            )
        } else if (SearchFlag.value != "0") {
            let data = {
                searchValue: searchValue.value,
                index: index
            }
            getHouseSearch(data).then(
                res => {
                    if (res.status == 200) {
                        if (res.data.code == "902") {
                            if (res.data.data == undefined || res.data.data.length == 0 || res.data.data == "") {
                                isEnd.value = true
                            } else {
                                Array.prototype.push.apply(HouseList.value, res.data.data);
                            }
                            isLoading.value = false
                            console.log(HouseList.value)
                        }
                    }
                }
            )
        } else if (CityFlag.value != "0") {
            let data = {
                city: selectedProvince.value,
                index: index
            }
            getHouseCity(data).then(
                res => {
                    if (res.status == 200) {
                        if (res.data.code == "902") {
                            if (res.data.data == undefined || res.data.data.length == 0 || res.data.data == "") {
                                isEnd.value = true
                            } else {
                                Array.prototype.push.apply(HouseList.value, res.data.data);
                            }
                            isLoading.value = false
                            console.log(HouseList.value)
                        }
                    }
                }
            )
        }
    }
}

function getHouseByType(Type) {
    SearchFlag.value = '0'
    CityFlag.value = '0'
    index = 0
    TypeFlag.value = Type
    let data = {
        Type: Type,
        index: index
    }
    getHouseType(data).then(
        res => {
            if (res.status == 200) {
                if (res.data.code == "902") {
                    HouseList.value = res.data.data
                    console.log(HouseList.value)
                }
            }
        }
    )
}

function SearchHouse() {
    SearchFlag.value = '1'
    CityFlag.value = '0'
    index = 0
    TypeFlag.value = '0'

    let consumerId = ''
    if (userInfoStore.userId != "") {
        consumerId = userInfoStore.userId
    }
    if (searchValue.value != '' && searchValue.value != undefined) {
        let data = {
            consumerId: consumerId,
            searchValue: searchValue.value,
            index: index
        }
        getHouseSearch(data).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == "902") {
                        HouseList.value = res.data.data
                        console.log(HouseList.value)
                    }
                }
            }
        )
    }
}

function getProvince(value) {
    selectedProvince.value = value
    showCity.value = false

    CityFlag.value = value
    TypeFlag.value = '0'
    SearchFlag.value = '0'
    index = 0
    let data = {
        city: selectedProvince.value,
        index: index
    }
    console.log("selectedProvince:" + selectedProvince.value)
    getHouseCity(data).then(
        res => {
            if (res.status == 200) {
                if (res.data.code == "902") {
                    HouseList.value = res.data.data
                    console.log("HouseList:" + HouseList.value)
                }
            }
        }
    )
}

function toRoomView(id) {
    router.push("/index/house/room/" + id)
}

function showSecondDiv() {
    showCity.value = true
}

function hideSecondDiv() {
    showCity.value = false
}
</script>
    
<style scoped>
.MainHouse {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}

.MainHouse-search {
    display: flex;
    position: relative;
    margin-top: 70px;

}

.MainHouse-search-address {
    background-color: var(--main-color);
    width: 200px;
    height: 50px;
    border-radius: 50px;
    position: absolute;
    left: -100px;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-weight: 800;
    font-size: 1.4rem;
    padding-left: 20px;
    cursor: pointer;
}

.MainHouse-search-inputBorder {
    position: relative;
    display: flex;
    align-items: center;
}

.MainHouse-search-inputBorder-input input {
    width: 350px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid rgb(236, 236, 236);
    background-color: rgb(245, 244, 244);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);

    padding-left: 25px;
    padding-right: 70px;
    font-size: 20px;
    color: rgb(122, 122, 122);
    outline: none;
    transition: all 0.8s;
    -ms-transition: all 0.8s;
}

.MainHouse-search-inputBorder-input input:focus {
    box-shadow: 0 3px 8px rgb(248, 234, 238), 0 5px 5px rgb(240, 222, 227);
}

.MainHouse-search-inputBorder svg {
    position: relative;
    right: 50px;
    color: #ffffff;
    padding: 12px;
    background-color: var(--main-color);
    border-radius: 50px;
    cursor: pointer;
}

.MainHouse-list {
    width: 95%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 25px;
    align-items: center
}

.MainHouse-list-type {
    width: 95%;
    border-bottom: 2px solid var(--main-blue);
    display: flex;

}

.MainHouse-list-type-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 30px;
    cursor: pointer;
    margin-bottom: 10px;
}

.MainHouse-list-type-item:hover svg {
    opacity: 1;
}

.MainHouse-list-type-item:hover .MainHouse-list-type-item-text {
    color: black;
}

.MainHouse-list-type-item svg {
    opacity: 0.6425339366515838;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
}

.MainHouse-list-type-item-text {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    color: rgb(105, 105, 105);
    font-weight: 800;
    justify-content: space-around;
    transition: all 0.5s;
}

.MainHouse-list-house {
    margin-top: 20px;
    margin-bottom: 100px;
    width: 95%;
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

.mainIndex-title-search-2 {
    position: absolute;
    border-radius: 20px;
    top: calc(100% + 5px);
    height: 300px;
    width: 450px;
    background-color: #ffffff;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    overflow: hidden;
    z-index: 999;
}

.mainIndex-title-search-2:focus {
    outline: none;
}

.mainIndex-title-search-2-key {
    overflow-y: scroll;
    margin-top: 5px;
    padding-left: 10px;
    width: calc(100% - 10px);
    flex-shrink: 0;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    cursor: pointer;
}

.mainIndex-title-search-2-key-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 5px;
    color: rgb(243, 39, 90);
}

.mainIndex-title-search-2-key-item:hover {
    background-color: rgb(217, 237, 250);
}
</style>