<template>
    <div class="header">
        <div class="header-logo" @click="toIndex">
            <img src="../assets/logo.png" class="header-logo-img" alt="">
            <div class="header-logo-font">惊鸿民宿</div>
        </div>

        <div class="sidebarIndex">
        <RouterLink to="/">
            <div class="sidebarIndex-item" @click="PageSwitching(page1)" ref="page1">首页</div>
        </RouterLink>
        <RouterLink to="/index/house">
            <div class="sidebarIndex-item" @click="PageSwitching(page2)" ref="page2">民宿中心</div>
        </RouterLink>
        <RouterLink to="/index/contact">
            <div class="sidebarIndex-item" @click="PageSwitching(page3)" ref="page3">联系我们</div>
        </RouterLink>
    </div>

        <div class="header-user-border">
            <div class="header-user">
                <div v-if="!userInfoFlag" class="header-user-div">
                    <span class="header-user-login" @click="openLoginModal">登录</span>
                    <span>|</span>
                    <span class="header-user-register" @click="openRegisterModal">注册</span>
                </div>
                <div v-if="userInfoFlag" class="header-user-div">
                    <div class="userInfo-nameInfo">
                        <div class="userInfo-nameInfo-text">欢迎您！</div>
                        <div class="userInfo-nameInfo-name" @click="toPersonalPage">{{ userName }}
                        </div>
                    </div>
                    <div class="avatar">
                        <img :src="avatar" alt="" @click="toPersonalPage">
                    </div>
                </div>
            </div>
            <div v-if="userInfoFlag" class="user-alert" @click="toAlert">
                <svg t="1704715261289" class="user-alert-icon" viewBox="0 0 1365 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4238" width="200" height="200">
                    <path
                        d="M182.98306 908.65781c5.262221 1.024 10.723553 1.564444 16.298662 1.564444h966.76951c6.399998 0 12.657774-0.711111 18.65955-2.019555l-321.109244-321.137689-95.231974 95.260418a113.493302 113.493302 0 0 1-160.597288-0.085333l-99.185751-99.18575L182.98306 908.65781zM113.777746 816.952946l314.367913-314.367912L114.403524 188.871343A86.044421 86.044421 0 0 0 113.777746 198.997563v617.955383z m1137.777462-2.844443V199.168229l-307.484359 307.484359L1251.555208 814.136947zM200.248833 113.778031l467.797204 467.825647c10.922664 10.894219 29.04177 11.09333 40.106655 0l467.342093-467.313648A86.215087 86.215087 0 0 0 1166.051232 113.778031H200.220389zM0 170.809126A170.723508 170.723508 0 0 1 170.837286 0.000284h1023.658382A170.60973 170.60973 0 0 1 1365.332954 170.809126v682.382033A170.723508 170.723508 0 0 1 1194.495668 1024H170.837286A170.60973 170.60973 0 0 1 0 853.191159V170.809126z"
                        fill="#8a8a8a" p-id="4239"></path>
                </svg>
                <div class="alertNum" v-if="AlertNum != undefined && AlertNum != '' && AlertNum != '0'">{{ AlertNum }}</div>
            </div>
        </div>
    </div>
    <div class="Modal-view" v-if="showModal">
        <div class="overlay"></div>
        <div class="Modal-view-content">
            <div class="Modal-view-content-close" @click="closeModal">
                <div>
                    X
                </div>
            </div>

            <div class="Modal-view-conten-userLogin-login" v-show="loginFlag">
                <div class="Modal-view-conten-userLogin" v-show="userLoginFlag">
                    <div class="Modal-view-conten-userLogin-title">用户登录</div>
                    <div class="Modal-view-conten-userLogin-account">
                        <div>
                            <svg t="1689497299306" class="Modal-view-conten-userLogin-account-icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2281" width="200" height="200">
                                <path
                                    d="M511.82655 556.277436c-135.928832 0-246.477624-110.546745-246.477624-246.477624S375.896694 63.322188 511.82655 63.322188c135.930879 0 246.477624 110.546745 246.477624 246.477624S647.757428 556.277436 511.82655 556.277436zM511.82655 108.135836c-111.202685 0-201.662953 90.481757-201.662953 201.662953s90.460268 201.662953 201.662953 201.662953c111.159706 0 201.662953-90.481757 201.662953-201.662953S622.986255 108.135836 511.82655 108.135836z"
                                    p-id="2282" fill="#8a8a8a"></path>
                                <path
                                    d="M870.340853 959.603341 153.314293 959.603341c-37.068244 0-67.220984-30.15274-67.220984-67.220984 0-3.061732 0.656963-75.535347 54.923914-147.879002 31.596625-42.143842 74.835406-75.578326 128.576377-99.474572 65.559135-29.143761 147.091056-43.937698 242.23295-43.937698 95.14394 0 176.630836 14.792914 242.276952 43.937698 53.741995 23.896246 96.980775 57.33073 128.577401 99.474572 54.266951 72.342632 54.880935 144.81727 54.880935 147.879002C937.561837 929.4506 907.409097 959.603341 870.340853 959.603341zM511.82655 645.905756c-156.280346 0-271.553743 42.712801-333.436138 123.501802-46.38954 60.567447-47.439452 122.449843-47.483454 123.062803 0 12.254092 10.021238 22.320355 22.406313 22.320355l717.02656 0c12.341073 0 22.407336-10.066263 22.407336-22.407336 0-0.524956-1.050935-62.406329-47.440475-122.974799C783.33629 688.618557 668.063917 645.905756 511.82655 645.905756z"
                                    p-id="2283" fill="#8a8a8a"></path>
                            </svg>
                        </div>
                        <div class="Modal-view-conten-userLogin-account-div">
                            <label ref="teleUserLabel">telephone</label>
                            <input type="text" @focus="teleUserFocus" @blur="teleUserBlur" v-model="teleUserRef"
                                ref="teleUserInput">
                        </div>
                    </div>
                    <div class="Modal-view-conten-userLogin-pwd">
                        <div>
                            <svg t="1689497374247" class="Modal-view-conten-userLogin-pwd-icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3893" width="200" height="200">
                                <path
                                    d="M534.102928 715.684621c-12.791046 0-23.126212-10.335165-23.126212-23.126212l0-41.852303c-25.377436-9.516538-42.773259-34.280004-42.773259-61.704007 0-36.326571 29.572899-65.89947 65.89947-65.89947 36.326571 0 65.89947 29.572899 65.89947 65.89947 0 27.424003-17.395823 52.187469-42.773259 61.704007L557.22914 692.558409C557.22914 705.247127 546.893974 715.684621 534.102928 715.684621z"
                                    p-id="3894" fill="#8a8a8a"></path>
                                <path
                                    d="M275.519137 907.652643c-41.238333 0-74.904367-35.507944-74.904367-79.202158L200.61477 444.002798l667.078645 0 0 384.550015c0 43.694214-33.563705 79.202158-74.904367 79.202158L275.519137 907.652643 275.519137 907.652643zM240.420506 807.780154c0 35.405616 22.205256 59.145798 55.25732 59.145798l476.850205 0c33.052064 0 55.25732-23.740182 55.25732-59.145798l0-322.232038L240.420506 485.548116 240.420506 807.780154z"
                                    p-id="3895" fill="#8a8a8a"></path>
                                <path
                                    d="M755.336864 449.52853 755.336864 326.734486c0-126.17088-93.52813-217.754772-222.359548-217.754772-128.831418 0-222.359548 91.583891-222.359548 217.754772l0 122.691716L268.151494 449.426202 268.151494 323.562306c0-68.662336 27.526332-133.231538 77.667233-181.735185 50.038573-48.503647 116.449685-75.211352 187.158589-75.211352s137.222344 26.707705 187.158589 75.211352c50.038573 48.503647 77.667233 113.072849 77.667233 181.735185l0 125.966224L755.336864 449.52853 755.336864 449.52853z"
                                    p-id="3896" fill="#8a8a8a"></path>
                            </svg>
                        </div>
                        <div class="Modal-view-conten-userLogin-pwd-div">
                            <label ref="pwdUserLabel">password</label>
                            <input type="password" @focus="pwdUserFocus" @blur="pwdUserBlur" v-model="pwdUserRef">
                        </div>
                    </div>
                    <div class="Modal-view-conten-userLogin-text">惊鸿民宿欢迎您</div>
                    <div class="Modal-view-conten-userLogin-loginButton">
                        <div @click="userLogin">
                            登录
                        </div>
                    </div>
                    <div class="Modal-view-conten-userLogin-landlordLogin" @click="showLogin">我是商家</div>
                    <div class="Modal-view-conten-userLogin-registerButton" @click="toRegister">前往注册</div>
                </div>

                <div class="Modal-view-conten-userLogin" v-show="!userLoginFlag">
                    <div class="Modal-view-conten-userLogin-title">商家登录</div>
                    <div class="Modal-view-conten-userLogin-account">
                        <div>
                            <svg t="1689497299306" class="Modal-view-conten-userLogin-account-icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2281" width="200" height="200">
                                <path
                                    d="M511.82655 556.277436c-135.928832 0-246.477624-110.546745-246.477624-246.477624S375.896694 63.322188 511.82655 63.322188c135.930879 0 246.477624 110.546745 246.477624 246.477624S647.757428 556.277436 511.82655 556.277436zM511.82655 108.135836c-111.202685 0-201.662953 90.481757-201.662953 201.662953s90.460268 201.662953 201.662953 201.662953c111.159706 0 201.662953-90.481757 201.662953-201.662953S622.986255 108.135836 511.82655 108.135836z"
                                    p-id="2282" fill="#8a8a8a"></path>
                                <path
                                    d="M870.340853 959.603341 153.314293 959.603341c-37.068244 0-67.220984-30.15274-67.220984-67.220984 0-3.061732 0.656963-75.535347 54.923914-147.879002 31.596625-42.143842 74.835406-75.578326 128.576377-99.474572 65.559135-29.143761 147.091056-43.937698 242.23295-43.937698 95.14394 0 176.630836 14.792914 242.276952 43.937698 53.741995 23.896246 96.980775 57.33073 128.577401 99.474572 54.266951 72.342632 54.880935 144.81727 54.880935 147.879002C937.561837 929.4506 907.409097 959.603341 870.340853 959.603341zM511.82655 645.905756c-156.280346 0-271.553743 42.712801-333.436138 123.501802-46.38954 60.567447-47.439452 122.449843-47.483454 123.062803 0 12.254092 10.021238 22.320355 22.406313 22.320355l717.02656 0c12.341073 0 22.407336-10.066263 22.407336-22.407336 0-0.524956-1.050935-62.406329-47.440475-122.974799C783.33629 688.618557 668.063917 645.905756 511.82655 645.905756z"
                                    p-id="2283" fill="#8a8a8a"></path>
                            </svg>
                        </div>
                        <div class="Modal-view-conten-userLogin-account-div">
                            <label ref="teleLandLabel">telephone</label>
                            <input type="text" @focus="teleLandFocus" @blur="teleLandBlur" v-model="teleLandRef"
                                ref="teleLandInput">
                        </div>
                    </div>
                    <div class="Modal-view-conten-userLogin-pwd">
                        <div>
                            <svg t="1689497374247" class="Modal-view-conten-userLogin-pwd-icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3893" width="200" height="200">
                                <path
                                    d="M534.102928 715.684621c-12.791046 0-23.126212-10.335165-23.126212-23.126212l0-41.852303c-25.377436-9.516538-42.773259-34.280004-42.773259-61.704007 0-36.326571 29.572899-65.89947 65.89947-65.89947 36.326571 0 65.89947 29.572899 65.89947 65.89947 0 27.424003-17.395823 52.187469-42.773259 61.704007L557.22914 692.558409C557.22914 705.247127 546.893974 715.684621 534.102928 715.684621z"
                                    p-id="3894" fill="#8a8a8a"></path>
                                <path
                                    d="M275.519137 907.652643c-41.238333 0-74.904367-35.507944-74.904367-79.202158L200.61477 444.002798l667.078645 0 0 384.550015c0 43.694214-33.563705 79.202158-74.904367 79.202158L275.519137 907.652643 275.519137 907.652643zM240.420506 807.780154c0 35.405616 22.205256 59.145798 55.25732 59.145798l476.850205 0c33.052064 0 55.25732-23.740182 55.25732-59.145798l0-322.232038L240.420506 485.548116 240.420506 807.780154z"
                                    p-id="3895" fill="#8a8a8a"></path>
                                <path
                                    d="M755.336864 449.52853 755.336864 326.734486c0-126.17088-93.52813-217.754772-222.359548-217.754772-128.831418 0-222.359548 91.583891-222.359548 217.754772l0 122.691716L268.151494 449.426202 268.151494 323.562306c0-68.662336 27.526332-133.231538 77.667233-181.735185 50.038573-48.503647 116.449685-75.211352 187.158589-75.211352s137.222344 26.707705 187.158589 75.211352c50.038573 48.503647 77.667233 113.072849 77.667233 181.735185l0 125.966224L755.336864 449.52853 755.336864 449.52853z"
                                    p-id="3896" fill="#8a8a8a"></path>
                            </svg>
                        </div>
                        <div class="Modal-view-conten-userLogin-pwd-div">
                            <label ref="pwdLandLabel">password</label>
                            <input type="password" @focus="pwdLandFocus" @blur="pwdLandBlur" v-model="pwdLandRef">
                        </div>
                    </div>
                    <div class="Modal-view-conten-userLogin-text">惊鸿民宿欢迎您</div>
                    <div class="Modal-view-conten-userLogin-loginButton">
                        <div @click="landLogin">
                            登录
                        </div>
                    </div>
                    <div class="Modal-view-conten-userLogin-landlordLogin" @click="showLogin">我是用户</div>
                    <div class="Modal-view-conten-userLogin-registerButton" @click="toRegister">前往注册</div>
                </div>
            </div>

            <div class="Modal-view-conten-userLogin-register" v-show="!loginFlag">
                <div class="Modal-view-conten-userLogin-register-title">
                    注册中心 ·&ensp;
                    <span v-show="userRegisterFlag">用户注册</span>
                    <span v-show="!userRegisterFlag">商家注册</span>
                </div>
                <div class="Modal-view-conten-userLogin-register-name">
                    <svg t="1689497299306" class="Modal-view-conten-userLogin-register-name-icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2281" width="200" height="200">
                        <path
                            d="M511.82655 556.277436c-135.928832 0-246.477624-110.546745-246.477624-246.477624S375.896694 63.322188 511.82655 63.322188c135.930879 0 246.477624 110.546745 246.477624 246.477624S647.757428 556.277436 511.82655 556.277436zM511.82655 108.135836c-111.202685 0-201.662953 90.481757-201.662953 201.662953s90.460268 201.662953 201.662953 201.662953c111.159706 0 201.662953-90.481757 201.662953-201.662953S622.986255 108.135836 511.82655 108.135836z"
                            p-id="2282" fill="#8a8a8a"></path>
                        <path
                            d="M870.340853 959.603341 153.314293 959.603341c-37.068244 0-67.220984-30.15274-67.220984-67.220984 0-3.061732 0.656963-75.535347 54.923914-147.879002 31.596625-42.143842 74.835406-75.578326 128.576377-99.474572 65.559135-29.143761 147.091056-43.937698 242.23295-43.937698 95.14394 0 176.630836 14.792914 242.276952 43.937698 53.741995 23.896246 96.980775 57.33073 128.577401 99.474572 54.266951 72.342632 54.880935 144.81727 54.880935 147.879002C937.561837 929.4506 907.409097 959.603341 870.340853 959.603341zM511.82655 645.905756c-156.280346 0-271.553743 42.712801-333.436138 123.501802-46.38954 60.567447-47.439452 122.449843-47.483454 123.062803 0 12.254092 10.021238 22.320355 22.406313 22.320355l717.02656 0c12.341073 0 22.407336-10.066263 22.407336-22.407336 0-0.524956-1.050935-62.406329-47.440475-122.974799C783.33629 688.618557 668.063917 645.905756 511.82655 645.905756z"
                            p-id="2283" fill="#8a8a8a"></path>
                    </svg>
                    <input type="text" placeholder="昵称(20位内不能包含特殊字符)" v-model="name" @blur="checkNameValue"
                        ref="nameRegisterInput">

                </div>
                <div class="Modal-view-conten-userLogin-register-tele">
                    <svg t="1689512484421" class="Modal-view-conten-userLogin-register-tele-icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6200" width="200" height="200">
                        <path
                            d="M817.066667 586.666667c-32-4.266667-64-12.8-96-23.466667-38.4-14.933333-81.066667-4.266667-110.933334 23.466667l-27.733333 27.733333c-70.4-44.8-130.133333-102.4-172.8-172.8l27.733333-27.733333c27.733333-29.866667 38.4-72.533333 23.466667-110.933334-10.666667-29.866667-19.2-61.866667-23.466667-96-6.4-51.2-51.2-89.6-104.533333-89.6h-108.8c-32 0-59.733333 12.8-78.933333 34.133334-19.2 21.333333-29.866667 51.2-27.733334 81.066666 12.8 117.333333 53.333333 230.4 117.333334 328.533334 57.6 91.733333 136.533333 170.666667 228.266666 228.266666 98.133333 64 211.2 104.533333 328.533334 117.333334h8.533333c25.6 0 51.2-10.666667 70.4-27.733334 21.333333-19.2 34.133333-49.066667 34.133333-76.8v-108.8c4.266667-53.333333-36.266667-98.133333-87.466666-106.666666z m25.6 106.666666v108.8c0 10.666667-4.266667 23.466667-12.8 29.866667-8.533333 8.533333-19.2 10.666667-29.866667 10.666667-106.666667-10.666667-211.2-49.066667-300.8-106.666667-83.2-53.333333-155.733333-125.866667-209.066667-209.066667-57.6-89.6-96-194.133333-106.666666-300.8 0-10.666667 2.133333-23.466667 10.666666-32 8.533333-8.533333 19.2-12.8 29.866667-12.8h108.8c21.333333 0 38.4 14.933333 40.533333 34.133334 4.266667 36.266667 14.933333 74.666667 27.733334 108.8 6.4 14.933333 2.133333 32-8.533334 42.666666l-46.933333 46.933334c-10.666667 10.666667-12.8 25.6-4.266667 38.4 55.466667 96 134.4 174.933333 230.4 230.4 12.8 6.4 27.733333 4.266667 38.4-4.266667l46.933334-46.933333c10.666667-10.666667 27.733333-14.933333 42.666666-8.533334 36.266667 12.8 72.533333 21.333333 108.8 27.733334 19.2 2.133333 34.133333 19.2 34.133334 42.666666 0-2.133333 0-2.133333 0 0z"
                            fill="#8a8a8a" p-id="6201"></path>
                    </svg>
                    <input type="text" placeholder="手机号(账号)" v-model="tele" @blur="checkSameAccount"
                        ref="accountRegisterInput">
                </div>
                <div class="Modal-view-conten-userLogin-register-address">
                    <svg t="1689512691887" class="Modal-view-conten-userLogin-register-address-icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7344" width="200" height="200">
                        <path
                            d="M877.216 491.808M895.904 448c0-212.064-171.936-384-384-384-212.064 0-384 171.936-384 384 0 104.672 42.016 199.456 109.92 268.736L237.664 716.736l1.568 1.568c0.768 0.768 1.536 1.568 2.336 2.336l217.12 217.12c29.376 29.376 76.992 29.376 106.368 0l217.12-217.12c0.768-0.768 1.568-1.536 2.336-2.336l1.568-1.568-0.16 0C853.888 647.456 895.904 552.672 895.904 448zM565.088 847.36c-53.12 53.12-53.152 53.248-106.368 0L285.76 673.472C228 615.648 191.904 536.224 191.904 448c0-176.736 143.264-320 320-320 176.736 0 320 143.264 320 320 0 88.224-36.096 167.648-93.856 225.472L565.088 847.36zM512 256c-106.048 0-192 85.952-192 192s85.952 192 192 192 192-85.952 192-192S618.048 256 512 256zM512 576c-70.688 0-128-57.312-128-128s57.312-128 128-128 128 57.312 128 128S582.688 576 512 576z"
                            fill="#8a8a8a" p-id="7345"></path>
                    </svg>
                    <div class="Modal-view-conten-userLogin-register-address-item1">
                        <div class="Modal-view-conten-userLogin-register-address-item2">
                            <div class="Modal-view-conten-userLogin-register-address-item2-province1">
                                <div class="Modal-view-conten-userLogin-register-address-item2-province1-key"
                                    @click="showSelectProvince">{{ selectedProvince }}</div>
                                <div class="Modal-view-conten-userLogin-register-address-item2-province1-value" tabindex="0"
                                    @blur="selectProvinceBorderBlur" ref="selectProvinceBorder">
                                    <div class="Modal-view-conten-userLogin-register-address-item2-province1-value-item"
                                        v-for="(value, key) in province" :key="key" @click="selectProvince(value)">{{ value
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="Modal-view-conten-userLogin-register-address-item2-province2">
                                <div class="Modal-view-conten-userLogin-register-address-item2-province2-key"
                                    @click="showSelectCounty">{{ selectedCounty }}</div>
                                <div class="Modal-view-conten-userLogin-register-address-item2-province2-value" tabindex="0"
                                    @blur="selectCountyBorderBlur" ref="selectCountyBorder">
                                    <div class="Modal-view-conten-userLogin-register-address-item2-province2-value-item"
                                        v-for="cou in county" @click="selectCounty(cou)">{{ cou }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <textarea placeholder="详细地址" v-model="detailAddress" v-show="!userRegisterFlag" @blur="checkDetail"
                            ref="detailAddressRegisterInput"></textarea>
                    </div>


                </div>
                <div class="Modal-view-conten-userLogin-register-pwd">
                    <svg t="1689497374247" class="Modal-view-conten-userLogin-register-pwd-icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3893" width="200" height="200">
                        <path
                            d="M534.102928 715.684621c-12.791046 0-23.126212-10.335165-23.126212-23.126212l0-41.852303c-25.377436-9.516538-42.773259-34.280004-42.773259-61.704007 0-36.326571 29.572899-65.89947 65.89947-65.89947 36.326571 0 65.89947 29.572899 65.89947 65.89947 0 27.424003-17.395823 52.187469-42.773259 61.704007L557.22914 692.558409C557.22914 705.247127 546.893974 715.684621 534.102928 715.684621z"
                            p-id="3894" fill="#8a8a8a"></path>
                        <path
                            d="M275.519137 907.652643c-41.238333 0-74.904367-35.507944-74.904367-79.202158L200.61477 444.002798l667.078645 0 0 384.550015c0 43.694214-33.563705 79.202158-74.904367 79.202158L275.519137 907.652643 275.519137 907.652643zM240.420506 807.780154c0 35.405616 22.205256 59.145798 55.25732 59.145798l476.850205 0c33.052064 0 55.25732-23.740182 55.25732-59.145798l0-322.232038L240.420506 485.548116 240.420506 807.780154z"
                            p-id="3895" fill="#8a8a8a"></path>
                        <path
                            d="M755.336864 449.52853 755.336864 326.734486c0-126.17088-93.52813-217.754772-222.359548-217.754772-128.831418 0-222.359548 91.583891-222.359548 217.754772l0 122.691716L268.151494 449.426202 268.151494 323.562306c0-68.662336 27.526332-133.231538 77.667233-181.735185 50.038573-48.503647 116.449685-75.211352 187.158589-75.211352s137.222344 26.707705 187.158589 75.211352c50.038573 48.503647 77.667233 113.072849 77.667233 181.735185l0 125.966224L755.336864 449.52853 755.336864 449.52853z"
                            p-id="3896" fill="#8a8a8a"></path>
                    </svg>
                    <div>
                        <div>
                            <input type="password" placeholder="密码(由8位以上数字+字母组成)" v-model="pwd" ref="pwdRegisterInput"
                                @blur="checkPwdValue">
                        </div>
                        <div>
                            <input type="password" placeholder="确认密码" v-model="checkPwd" ref="checkPwdRegisterInput"
                                @blur="checkSamePwd">
                        </div>
                    </div>

                </div>
                <div class="Modal-view-conten-userLogin-register-button" ref="checkRegisterBottom" @click="checkRegister">确认
                </div>
                <div class="Modal-view-conten-userLogin-register-bottom">
                    <div>
                        <div v-show="!userRegisterFlag" class="Modal-view-conten-userLogin-register-bottom-userRegister"
                            @click="userRegister">
                            用户注册
                        </div>
                        <div v-show="userRegisterFlag" class="Modal-view-conten-userLogin-register-bottom-landlordRegister"
                            @click="userRegister">
                            商家注册
                        </div>
                        <div class="Modal-view-conten-userLogin-register-bottom-toLogin" @click="toLogin">返回登录</div>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="registerSuccess" class="checkView">
            <div>
                <svg t="1690093758693" class="checkView-icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1725" width="200" height="200">
                    <path
                        d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zM512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"
                        fill="#24d930" p-id="1726"></path>
                    <path
                        d="M653.226667 357.205333L482.133333 593.493333l-91.392-126.250666a31.829333 31.829333 0 0 0-44.586666-7.082667 32.042667 32.042667 0 0 0-7.082667 44.714667l117.248 161.877333c6.4 8.789333 16.085333 13.226667 25.813333 13.226667a31.701333 31.701333 0 0 0 25.856-13.226667l196.906667-272a32.042667 32.042667 0 0 0-25.770667-50.773333 31.829333 31.829333 0 0 0-25.856 13.184z"
                        fill="#24d930" p-id="1727"></path>
                </svg>
            </div>
            <div class="checkView-text">
                注册成功
            </div>
        </div>
    </div>
    <div v-if="loginSuccess" class="loginView">
        <div>
            <svg t="1690093758693" class="loginView-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1725" width="200" height="200">
                <path
                    d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zM512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"
                    fill="#24d930" p-id="1726"></path>
                <path
                    d="M653.226667 357.205333L482.133333 593.493333l-91.392-126.250666a31.829333 31.829333 0 0 0-44.586666-7.082667 32.042667 32.042667 0 0 0-7.082667 44.714667l117.248 161.877333c6.4 8.789333 16.085333 13.226667 25.813333 13.226667a31.701333 31.701333 0 0 0 25.856-13.226667l196.906667-272a32.042667 32.042667 0 0 0-25.770667-50.773333 31.829333 31.829333 0 0 0-25.856 13.184z"
                    fill="#24d930" p-id="1727"></path>
            </svg>
        </div>
        <div class="login-text">
            登录成功
        </div>
    </div>
    <div v-if="loginFail" class="loginView">
        <div>
            <svg t="1705146836551" class="loginView-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4238" width="200" height="200">
                <path
                    d="M512 128c211.2 0 384 172.8 384 384s-172.8 384-384 384-384-172.8-384-384 172.8-384 384-384m0-64C262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448-198.4-448-448-448z"
                    fill="#f32759" p-id="4239"></path>
                <path d="M377.6 646.4m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#f32759" p-id="4240"></path>
                <path d="M646.4 377.6m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#f32759" p-id="4241"></path>
                <path d="M377.6 377.6m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#f32759" p-id="4242"></path>
                <path d="M646.4 646.4m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#f32759" p-id="4243"></path>
                <path d="M353.6 625.152l271.552-271.552 45.248 45.248-271.552 271.552z" fill="#f32759" p-id="4244"></path>
                <path d="M353.6 398.848l45.248-45.248 271.552 271.552-45.248 45.248z" fill="#f32759" p-id="4245"></path>
            </svg>
        </div>
        <div class="login-text">
            登录失败
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getAllCity } from '@/api/index';
import {
    getUserSameAccount, getLandSameAccount,
    postLandlordRegister, postUserRegister,
    postLandLogin, postUserLogin,
    postAutoUserLogin, postAutoLandLogin
}
    from '@/api/RegisterAndLogin';

import { getAllLeaderCityByProvince } from '@/api/PublishRoom'
import useStore from '@/utils/userInfo';
import useStore2 from '@/utils/landInfo';
import router from '@/router/router';
import { getConsumerAlertCount, getLandlordAlertCount } from '@/api/Alert';

let userInfoStore = useStore()
let landInfoStore = useStore2()

let showModal = ref(false)
let loginFlag = ref(true)
let userRegisterFlag = ref(true)
let userLoginFlag = ref(true)
let userInfoFlag = ref(false)

let teleUserLabel = ref()
let pwdUserLabel = ref()
let teleLandLabel = ref()
let pwdLandLabel = ref()

let teleUserRef = ref()
let pwdUserRef = ref()
let teleLandRef = ref()
let pwdLandRef = ref()

let teleUserInput = ref()
let teleLandInput = ref()

let province = ref()
let selectedProvince = ref("省份")
let selectProvinceBorder = ref()
let county = ref()
let selectedCounty = ref("市/县")
let selectCountyBorder = ref()

let name = ref()
let tele = ref()
let detailAddress = ref()
let pwd = ref()
let checkPwd = ref()

let nameRegisterInput = ref()
let checkRegisterBottom = ref()
let pwdRegisterInput = ref()
let checkPwdRegisterInput = ref()
let accountRegisterInput = ref()
let detailAddressRegisterInput = ref()

let registerSuccess = ref(false)
let loginSuccess = ref(false)
let loginFail = ref(false)

let avatar = ref()
let userName = ref()

let page1 = ref()
let page2 = ref()
let page3 = ref()

onMounted(() => {
    page1.value.style.color = "rgb(255, 109, 146)"
    page1.value.style.backgroundColor = "rgb(217, 237, 250)"

    // 获取省份
    getAllCity().then(
        res => {
            if (res.status == 200) {
                province.value = res.data
            }
        }
    )

    let at = localStorage.getItem('AT');
    let rt = localStorage.getItem('RT');
    let te = localStorage.getItem('TE');
    let ut = localStorage.getItem("UT")

    if (at != "" && at != undefined &&
        rt != "" && rt != undefined &&
        te != "" && te != undefined &&
        ut != "" && ut != undefined) {
        let decodeTE = decodeURIComponent(atob(te))
        let decodeUT = decodeURIComponent(atob(ut))
        let data = {
            tele: decodeTE
        }
        if (decodeUT == "jinghong001") {
            postAutoUserLogin(data, at).then(
                res => {
                    if (res.status == 200) {
                        if (res.data.code == "902") {
                            let userDetail = res.data.data
                            loginUserDetail(userDetail)
                        } else if (res.data.data == "5000") {
                            postAutoUserLogin(data, rt).then(
                                res => {
                                    if (res.status == 200 && res.data.code == "902") {
                                        let userDetail = res.data.data
                                        loginUserDetail(userDetail)
                                    }
                                }
                            )
                        }
                    }
                }
            )
        }
        if (decodeUT == "jinghong002") {
            postAutoLandLogin(data, at).then(
                res => {
                    if (res.status == 200) {
                        if (res.data.code == "902") {
                            let landDetail = res.data.data
                            loginLandDetail(landDetail)
                        } else if (res.data.data == "5000") {
                            postAutoLandLogin(data, rt).then(
                                res => {
                                    if (res.status == 200 && res.data.code == "902") {
                                        let landDetail = res.data.data
                                        loginLandDetail(landDetail)
                                    }
                                }
                            )
                        }
                    }
                }
            )
        }
    }
})

const PageSwitching = (selectedPage) => {
      [page1, page2, page3].forEach((page) => {
        if (page.value === selectedPage) {
            page.value.style.color = "rgb(255, 109, 146)"
            page.value.style.backgroundColor = "rgb(217, 237, 250)"
        } else {
            page.value.style.color = "rgb(243, 39, 90)"
            page.value.style.backgroundColor = "rgb(245, 251, 255)"
        }
      });
    };

// 跳转至个人中心
function toPersonalPage() {
    if (decodeURIComponent(atob(localStorage.getItem('UT'))) == "jinghong001") {
        router.push("/consumer")
    } else if (decodeURIComponent(atob(localStorage.getItem('UT'))) == "jinghong002") {
        router.push("/landlord")
    }
}

// 用户登录成功后各种赋值
function loginUserDetail(data) {
    avatar.value = data.consumer.img_url
    userName.value = data.consumer.consumer_name
    loginSuccess.value = true
    showModal.value = false
    userInfoFlag.value = true

    localStorage.setItem('AT', data.accessToken);
    localStorage.setItem('RT', data.refreshToken);

    userInfoStore.userId = data.consumer.id
    userInfoStore.userName = data.consumer.consumer_name
    userInfoStore.userStatus = data.consumer.consumer_status
    userInfoStore.userCounty = data.consumer.county
    userInfoStore.userImgUrl = data.consumer.img_url
    userInfoStore.userLoginStatus = data.consumer.login_status
    userInfoStore.userMoney = data.consumer.money
    userInfoStore.userProvince = data.consumer.province
    userInfoStore.userPwd = data.consumer.pwd
    userInfoStore.userQq = data.consumer.qq
    userInfoStore.userRegisterTime = data.consumer.register_time
    userInfoStore.userTele = data.consumer.tele
    userInfoStore.userWechat = data.consumer.wechat
    userInfoStore.loginFlag = '1'

    startPolling()

    let TE = data.consumer.tele
    localStorage.setItem('TE', btoa(encodeURIComponent(TE)));

    let UT = "jinghong001"
    localStorage.setItem('UT', btoa(encodeURIComponent(UT)));

    setTimeout(() => {
        loginSuccess.value = false
    }, 4500);
}

let pollingInterval;
// 轮询获取通知数
function startPolling() {
    // 设置轮询间隔（毫秒为单位），例如，每5分钟
    const pollingIntervalTime = 5 * 1000;

    pollingInterval = setInterval(() => {
        getAlertNum();
    }, pollingIntervalTime);

    // 初始调用getAlert
    getAlertNum();
}

let AlertNum = ref()
// 获取用户通知数
function getAlertNum() {
    let ut = localStorage.getItem("UT")
    let decodeUT = decodeURIComponent(atob(ut))
    if (decodeUT == "jinghong001") {
        let token = localStorage.getItem('AT')
        let consumerId = userInfoStore.userId
        let data = {
            ConsumerId: consumerId
        }
        getConsumerAlertCount(data, token).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == 902) {
                        AlertNum.value = res.data.data
                    }
                }
            }
        );
    }
    if (decodeUT == "jinghong002") {
        let token = localStorage.getItem('AT')
        let LandlordId = landInfoStore.landId
        let data = {
            LandlordId: LandlordId
        }
        getLandlordAlertCount(data, token).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == 902) {
                        AlertNum.value = res.data.data
                    }
                }
            }
        );
    }

}

function toAlert() {
    if (decodeURIComponent(atob(localStorage.getItem('UT'))) == "jinghong001") {
        router.push("/consumer/Alert")
    } else if (decodeURIComponent(atob(localStorage.getItem('UT'))) == "jinghong002") {
        router.push("/landlord/Alert")
    }
}

// 商家登录成功后各种赋值
function loginLandDetail(data) {
    avatar.value = data.landlord.img_url
    userName.value = data.landlord.landlord_name
    loginSuccess.value = true
    showModal.value = false
    userInfoFlag.value = true

    localStorage.setItem('AT', data.accessToken);
    localStorage.setItem('RT', data.refreshToken);

    landInfoStore.landId = data.landlord.id
    landInfoStore.landTele = data.landlord.tele
    landInfoStore.landPwd = data.landlord.pwd
    landInfoStore.landName = data.landlord.landlord_name
    landInfoStore.landQq = data.landlord.qq
    landInfoStore.landWechat = data.landlord.wechat
    landInfoStore.landProvince = data.landlord.province
    landInfoStore.landCounty = data.landlord.county
    landInfoStore.landStatus = data.landlord.landlord_status
    landInfoStore.landMoney = data.landlord.money
    landInfoStore.landLoginStatus = data.landlord.login_status
    landInfoStore.landRegisterTime = data.landlord.register_time
    landInfoStore.landImgUrl = data.landlord.img_url
    landInfoStore.landAddress = data.landlord.address
    landInfoStore.landIntroduce = data.landlord.introduce
    landInfoStore.loginFlag = '1'

    startPolling()

    let TE = data.landlord.tele
    localStorage.setItem('TE', btoa(encodeURIComponent(TE)));

    let UT = "jinghong002"
    localStorage.setItem('UT', btoa(encodeURIComponent(UT)));

    setTimeout(() => {
        loginSuccess.value = false
    }, 4500);
}

// 用户登录
function userLogin() {
    // 使用正则表达式验证手机号码格式
    const regex = /^1[3456789]\d{9}$/;
    if (!regex.test(teleUserRef.value)) {
        // 如果手机号码格式不正确，提示并清空输入框
        teleUserInput.value.style.borderColor = "rgb(243, 39, 90)"
        teleUserRef.value = ''
        return
    } else {
        teleUserInput.value.style.borderColor = "rgb(165, 149, 149)"
    }

    // 消除密码的特殊字符
    if (pwdUserRef.value != '' && pwdUserRef.value != undefined) {
        let pwd = pwdUserRef.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        if (teleUserRef.value != '' && teleUserRef.value != undefined) {
            let data = {
                tele: teleUserRef.value,
                pwd: pwd
            }
            postUserLogin(data).then(
                res => {
                    if (res.status == "200") {
                        if (res.data.code == "902") {
                            let userDetail = res.data.data
                            loginUserDetail(userDetail)
                        }  else {
                            loginFail.value = true
                            setTimeout(() => {
                                loginFail.value = false
                            }, 4500);
                        }
                    }
                }
            )
        }
    }
}

// 商家登录
function landLogin() {
    // 使用正则表达式验证手机号码格式
    const regex = /^1[3456789]\d{9}$/;
    if (!regex.test(teleLandRef.value)) {
        // 如果手机号码格式不正确，提示并清空输入框
        teleLandInput.value.style.borderColor = "rgb(243, 39, 90)"
        teleLandRef.value = ''
        return
    } else {
        teleLandInput.value.style.borderColor = "rgb(165, 149, 149)"
    }
    // 消除密码的特殊字符
    if (pwdLandRef.value != '' && pwdLandRef.value != undefined) {
        let pwd = pwdLandRef.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");

        if (teleLandRef.value != '' && teleLandRef.value != undefined) {
            let data = {
                tele: teleLandRef.value,
                pwd: pwd
            }
            postLandLogin(data).then(
                res => {
                    if (res.status == "200") {
                        if (res.data.code == "902") {
                            let landDetail = res.data.data
                            loginLandDetail(landDetail)
                        }  else {
                            loginFail.value = true
                            setTimeout(() => {
                                loginFail.value = false
                            }, 4500);
                        }
                    }
                }
            )
        }
    }


}

// 当账号input失去焦点，自动发送到后端检查是否重复
function checkSameAccount() {
    if (tele.value != "" && tele.value != undefined) {
        const pattern = /^[1][3-9]\d{9}$/;
        if (pattern.test(tele.value)) {
            let data = {
                tele: tele.value
            }
            if (userRegisterFlag.value) {
                getUserSameAccount(data).then(
                    res => {
                        if (res.status == 200) {
                            if (res.data.Code != "902" && res.data.data != "500") {
                                localStorage.setItem("acc", res.data.data)
                                accountRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
                            } else {
                                accountRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
                                tele.value = ''
                            }
                        }
                    }
                )
            } else {
                getLandSameAccount(data).then(
                    res => {
                        if (res.status == 200) {
                            if (res.data.Code != "902" && res.data.data != "500") {
                                localStorage.setItem("acc", res.data.data)
                                accountRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
                            } else {
                                accountRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
                                tele.value = ''
                            }
                        }
                    }
                )
            }

        } else {
            accountRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
            tele.value = ''
        }
    }
    checkAllValue()
}

// 选择省份
function selectProvince(value) {
    selectedProvince.value = value
    selectProvinceBorder.value.style.display = "none"
    if (selectedCounty.value != "市/县") {
        selectedCounty.value = "市/县"
    }

    let data = {
        province: selectedProvince.value
    }
    // 获取当前省份的城市
    getAllLeaderCityByProvince(data).then(
        res => {
            if (res.status == 200) {
                county.value = res.data
            }
        }
    );
}

// 选择城市
function selectCounty(cou) {
    selectedCounty.value = cou
    selectCountyBorder.value.style.display = "none"
    checkAllValue()
}

// 显示选择省份列表
function showSelectProvince() {
    selectProvinceBorder.value.style.display = "flex"
    selectProvinceBorder.value.focus()
}

// 显示选择城市列表，当省份未选择时无法显示
function showSelectCounty() {
    if (selectedProvince.value != "省份") {
        // county.value = province.value[selectedProvince.value]
        selectCountyBorder.value.style.display = "flex"
        selectCountyBorder.value.focus()
    }
}

// 选择省份列表失去焦点自动隐藏
function selectProvinceBorderBlur() {
    selectProvinceBorder.value.style.display = "none"
}

// 选择城市列表失去焦点自动隐藏
function selectCountyBorderBlur() {
    selectCountyBorder.value.style.display = "none"
}

// 打开登录模态框
function openLoginModal() {
    showModal.value = true;
    loginFlag.value = true
}

// 打开注册模态框
function openRegisterModal() {
    showModal.value = true;
    loginFlag.value = false

    setTimeout(() => {
        // 隐藏省份和城市的列表
        selectProvinceBorder.value.style.display = "none"
        selectCountyBorder.value.style.display = "none"
    }, 0.2);

}

// 关闭模态框
function closeModal() {
    showModal.value = false
}

// 用户账号获得焦点
function teleUserFocus() {
    teleUserLabel.value.style.fontSize = '13px'
    teleUserLabel.value.style.top = '-10px'
    teleUserLabel.value.style.color = 'rgb(243, 39, 90)'
}

// 用户账号失去焦点
function teleUserBlur() {
    if (teleUserRef.value == "" || teleUserRef.value == undefined) {
        teleUserLabel.value.style.fontSize = '15px'
        teleUserLabel.value.style.top = '5px'
        teleUserLabel.value.style.color = 'rgb(152, 155, 158)'
    }
}

// 用户密码失去焦点
function pwdUserFocus() {
    pwdUserLabel.value.style.fontSize = '13px'
    pwdUserLabel.value.style.top = '-10px'
    pwdUserLabel.value.style.color = 'rgb(243, 39, 90)'
}

// 用户密码失去焦点
function pwdUserBlur() {
    if (pwdUserRef.value == "" || pwdUserRef.value == undefined) {
        pwdUserLabel.value.style.fontSize = '15px'
        pwdUserLabel.value.style.top = '5px'
        pwdUserLabel.value.style.color = 'rgb(152, 155, 158)'
    }
}

// 商家账号获得焦点
function teleLandFocus() {
    teleLandLabel.value.style.fontSize = '13px'
    teleLandLabel.value.style.top = '-10px'
    teleLandLabel.value.style.color = 'rgb(243, 39, 90)'
}

// 商家账号账号失去焦点
function teleLandBlur() {
    if (teleLandRef.value == "" || teleLandRef.value == undefined) {
        teleLandLabel.value.style.fontSize = '15px'
        teleLandLabel.value.style.top = '5px'
        teleLandLabel.value.style.color = 'rgb(152, 155, 158)'
    }
}

// 商家密码获得焦点
function pwdLandFocus() {
    pwdLandLabel.value.style.fontSize = '13px'
    pwdLandLabel.value.style.top = '-10px'
    pwdLandLabel.value.style.color = 'rgb(243, 39, 90)'
}

// 商家密码失去焦点
function pwdLandBlur() {
    if (pwdLandRef.value == "" || pwdLandRef.value == undefined) {
        pwdLandLabel.value.style.fontSize = '15px'
        pwdLandLabel.value.style.top = '5px'
        pwdLandLabel.value.style.color = 'rgb(152, 155, 158)'
    }
}

// 切换不同登录入口
function showLogin() {
    if (userLoginFlag.value) {
        userLoginFlag.value = false
    } else {
        userLoginFlag.value = true
    }

    teleUserRef.value = ''
    pwdUserRef.value = ''
    teleLandRef.value = ''
    pwdLandRef.value = ''
}

// 用户注册
function userRegister() {
    if (userRegisterFlag.value) {
        userRegisterFlag.value = false
    } else {
        userRegisterFlag.value = true
    }

    // 切换注册全部重置
    name.value = ''
    tele.value = ''
    detailAddress.value = ''
    pwd.value = ''
    checkPwd.value = ''
    selectedProvince.value = "省份"
    selectedCounty.value = "市/县"

    nameRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
    detailAddressRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
    checkPwdRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
    pwdRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
    accountRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
}

// 前往登录页面
function toLogin() {
    loginFlag.value = true
}

// 前往注册页面
function toRegister() {
    loginFlag.value = false

    // 隐藏省份和城市的列表
    selectProvinceBorder.value.style.display = "none"
    selectCountyBorder.value.style.display = "none"

    // 注册的确认按钮，信息未全部正确填写则失去事件并改变颜色
    checkRegisterBottom.value.style.pointerEvents = "none"
    checkRegisterBottom.value.style.backgroundColor = "rgb(252, 115, 149)"
}

// 检查昵称格式是否正确
function checkNameValue() {
    if (name.value != "" && name.value != undefined) {
        const regex = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/; // 匹配字母、数字和中文字符
        if (name.value.length > 20 || !regex.test(name.value)) {
            name.value = ''
            nameRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
        } else {
            nameRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
        }
    }
    checkAllValue()
}

// 检查注册密码是否格式正确
function checkPwdValue() {
    if (pwd.value != undefined && pwd.value != "") {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 匹配至少8个字符的字母和数字
        if (pwd.value.length <= 8 || !regex.test(pwd.value)) {
            pwd.value = ''
            pwdRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
        } else {
            pwdRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
        }
    }
    checkAllValue()
}

// 检查两个密码是否一样
function checkSamePwd() {
    if (checkPwd.value != undefined && checkPwd.value != "") {
        if (checkPwd.value == pwd.value) {
            checkPwdRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
        } else {
            checkPwd.value = ''
            checkPwdRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
        }
    }
    checkAllValue()
}

// 检查详细地址是否填写
function checkDetail() {
    if (detailAddress.value != '' && detailAddress.value != undefined) {
        detailAddressRegisterInput.value.style.borderColor = "rgb(165, 149, 149)"
    } else {
        detailAddressRegisterInput.value.style.borderColor = "rgb(243, 39, 90)"
    }
    checkAllValue()
}

// 检查所有信息是否填写完整
function checkAllValue() {
    if (!userRegisterFlag.value) {
        if (name.value != '' && name.value != undefined &&
            tele.value != '' && tele.value != undefined &&
            selectedProvince.value != "省份" && selectedCounty.value != "市/县" &&
            detailAddress.value != '' && detailAddress.value != undefined &&
            pwd.value != '' && pwd.value != undefined &&
            checkPwd.value != '' && checkPwd.value != undefined) {

            // 注册的确认按钮，信息全部正确填写则恢复
            checkRegisterBottom.value.style.pointerEvents = "auto"
            checkRegisterBottom.value.style.backgroundColor = "rgb(243, 39, 90)"
        } else {
            // 注册的确认按钮，信息未全部正确填写则失去事件并改变颜色
            checkRegisterBottom.value.style.pointerEvents = "none"
            checkRegisterBottom.value.style.backgroundColor = "rgb(252, 115, 149)"
        }
    } else {
        if (name.value != '' && name.value != undefined &&
            tele.value != '' && tele.value != undefined &&
            selectedProvince.value != "省份" && selectedCounty.value != "市/县" &&
            pwd.value != '' && pwd.value != undefined &&
            checkPwd.value != '' && checkPwd.value != undefined) {

            // 注册的确认按钮，信息全部正确填写则恢复
            checkRegisterBottom.value.style.pointerEvents = "auto"
            checkRegisterBottom.value.style.backgroundColor = "rgb(243, 39, 90)"
        } else {
            // 注册的确认按钮，信息未全部正确填写则失去事件并改变颜色
            checkRegisterBottom.value.style.pointerEvents = "none"
            checkRegisterBottom.value.style.backgroundColor = "rgb(252, 115, 149)"
        }
    }
}

// 点击注册
function checkRegister() {
    let registerToken = localStorage.getItem('acc');
    if (userRegisterFlag.value) {
        let consumer = {
            consumer_name: name.value + "",
            tele: tele.value + "",
            pwd: pwd.value + "",
            province: selectedProvince.value + "",
            county: selectedCounty.value + ""
        }
        postUserRegister(consumer, registerToken).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == 901 && res.data.data == true) {
                        name.value = ''
                        tele.value = ''
                        detailAddress.value = ''
                        pwd.value = ''
                        checkPwd.value = ''
                        selectedProvince.value = "省份"
                        selectedCounty.value = "市/县"
                        checkAllValue()
                        registerSuccess.value = true
                        loginFlag.value = true
                        setTimeout(() => {
                            registerSuccess.value = false
                        }, 4500);
                    }
                }
            }
        )
    } else {
        let landlord = {
            landlord_name: name.value + "",
            tele: tele.value + "",
            pwd: pwd.value + "",
            province: selectedProvince.value + "",
            county: selectedCounty.value + "",
            address: detailAddress.value + ""
        }
        postLandlordRegister(landlord, registerToken).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == 901 && res.data.data == true) {
                        name.value = ''
                        tele.value = ''
                        detailAddress.value = ''
                        pwd.value = ''
                        checkPwd.value = ''
                        selectedProvince.value = "省份"
                        selectedCounty.value = "市/县"
                        checkAllValue()
                        registerSuccess.value = true
                        loginFlag.value = true
                        setTimeout(() => {
                            registerSuccess.value = false
                        }, 4500);
                    }
                }
            }
        )
    }
}

function toIndex() {
    router.push("/")
}
</script>

<style scoped>
.sidebarIndex {
    /* width: 200px; */
    min-width: 100px;
    height: 100%;
    background-color: rgb(245, 251, 255);
    /* z-index: 10; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebarIndex a {
    height: 100%;
}

.sidebarIndex-item{
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.5rem;
    color: rgb(243, 39, 90);
    /* border-bottom: 1px solid rgb(189, 201, 252); */
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.sidebarIndex-item:hover{
    color: rgb(255, 109, 146);
    background-color: rgb(217, 237, 250);
    cursor: pointer;
}

.header {
    width: 100%;
    height: 100px;
    background-color: rgb(245, 251, 255);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    /* position: fixed; */
    /* justify-content: center; */
}

.header-logo {
    position: relative;
    display: flex;
    align-items: center;
    left: 30px;
    cursor: pointer;
}

.header-logo-img {
    width: 55px;
    height: 55px;
}

.header-logo-font {
    margin-left: 20px;
    font-size: 1.8rem;
    font-weight: 700;
    /* color: rgb(74, 182, 122); */
    color: rgb(243, 39, 90);
    text-align: center;
    /* text-shadow: 0 0.18rem 0.2rem #1b1b1b; */
    letter-spacing: .4rem;
    font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
}

.header-user {
    position: relative;
    right: 10px;
    min-width: 200px;
    max-width: 400px;
    width: auto;
    height: 60px;
    background-color: rgb(243, 39, 90);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 15px;
    box-shadow: 0 3px 8px rgb(196, 187, 187), 0 5px 5px rgb(240, 222, 227);
    overflow: hidden;
}

.header-user-div {
    position: relative;
    min-width: 200px;
    max-width: 400px;
    width: auto;
    height: 60px;
    background-color: rgb(243, 39, 90);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 15px;
    overflow: hidden;
}

.userInfo-nameInfo {
    margin-left: 20px;
}

.userInfo-nameInfo-text {
    font-size: 0.5rem;
    font-weight: 800;
    color: rgb(255, 255, 255);
}

.userInfo-nameInfo-name {
    cursor: pointer;
    color: #f1f1f1;
    font-weight: 800;
    text-decoration: underline;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.avatar {
    cursor: pointer;
    width: 48px;
    height: 48px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 20px;
}

.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.header-user span {
    color: white;
}

.header-user-login,
.header-user-register {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 49%;
    cursor: pointer;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.header-user-login:hover,
.header-user-register:hover {
    background-color: rgb(221, 36, 82);
}

.Modal-view {
    position: absolute;
    /* background-color: aqua; */
    width: 100%;
    height: 100%;
    z-index: 9999;
}

.overlay {
    position: absolute;
    z-index: 13;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}

.Modal-view-content {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgb(255, 255, 255);
    z-index: 14;
    width: 400px;
    /* height: 380px; */
    border-radius: 20px;
}

.checkView {
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
    animation: moveElement 0.5s, hideElement 4s forwards;
}

@keyframes moveElement {
    from {
        top: 0%;
    }

    to {
        top: 7%;
    }
}

@keyframes hideElement {
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

.checkView-icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkView-text {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    color: rgb(243, 39, 90);
}

.Modal-view-content-close {
    margin-top: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
    color: rgb(136, 145, 153);
}

.Modal-view-content-close div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
}

.Modal-view-content-close div:hover {
    border-radius: 15px;
    background-color: rgb(243, 39, 90);
    color: #ffffff;
    overflow: hidden;
}

.Modal-view-conten-userLogin {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

.Modal-view-conten-userLogin-title,
.Modal-view-conten-userLogin-register-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 800;
    color: rgb(243, 39, 90);
    margin-top: 15px;
}

.Modal-view-conten-userLogin-account,
.Modal-view-conten-userLogin-pwd,
.Modal-view-conten-userLogin-text,
.Modal-view-conten-userLogin-loginButton,
.Modal-view-conten-userLogin-register-name,
.Modal-view-conten-userLogin-register-tele,
.Modal-view-conten-userLogin-register-address {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 25px;
    position: relative;
}

.Modal-view-conten-userLogin-account-icon,
.Modal-view-conten-userLogin-pwd-icon,
.Modal-view-conten-userLogin-register-name-icon,
.Modal-view-conten-userLogin-register-tele-icon,
.Modal-view-conten-userLogin-register-address-icon,
.Modal-view-conten-userLogin-register-pwd-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.Modal-view-conten-userLogin-account input,
.Modal-view-conten-userLogin-pwd input,
.Modal-view-conten-userLogin-register-name input,
.Modal-view-conten-userLogin-register-tele input,
.Modal-view-conten-userLogin-register-pwd input {
    width: 220px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(165, 149, 149);
    outline: none;
    font-size: 15px;
    padding-left: 15px;
    color: rgb(63, 64, 65);
}

.Modal-view-conten-userLogin-account-div,
.Modal-view-conten-userLogin-pwd-div {
    position: relative;
}

.Modal-view-conten-userLogin-account label,
.Modal-view-conten-userLogin-pwd label {
    background-color: #ffffff;
    position: absolute;
    font-size: 15px;
    top: 5px;
    left: 3px;
    color: rgb(152, 155, 158);
    padding-left: 10px;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
    pointer-events: none;
}


.Modal-view-conten-userLogin-text {
    font-size: 15px;
    color: rgb(84, 86, 88);
}

.Modal-view-conten-userLogin-loginButton {
    margin-top: 15px;
}

.Modal-view-conten-userLogin-loginButton div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100px;
    background-color: rgb(243, 39, 90);
    color: white;
    border-radius: 10px;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
    cursor: pointer;
}

.Modal-view-conten-userLogin-landlordLogin {
    margin-top: 20px;
    margin-left: -200px;
    font-size: 15px;
    color: rgb(32, 141, 243);
    cursor: pointer;
}

.Modal-view-conten-userLogin-registerButton {
    margin-top: 5px;
    margin-left: -200px;
    font-size: 15px;
    color: rgb(32, 141, 243);
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 25px;
}

.Modal-view-conten-userLogin-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    -ms-transition: all 0.4s;
}

.Modal-view-conten-userLogin-register-address {
    align-items: flex-start;
}

.Modal-view-conten-userLogin-register-address-item2 {
    display: flex;
}

.Modal-view-conten-userLogin-register-address-item2-province1,
.Modal-view-conten-userLogin-register-address-item2-province2 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 5px 0px 5px;
    height: 30px;
    border-radius: 5px;
    color: rgb(104, 99, 99);
    border: 1px solid rgb(165, 149, 149);
    width: 100px;
    position: relative;
    cursor: pointer;
    transition: all 0.4s;
    -ms-transition: all 0.4s;
}

.Modal-view-conten-userLogin-register-address-item2-province1:hover,
.Modal-view-conten-userLogin-register-address-item2-province2:hover {
    border: 1px solid rgb(250, 0, 96);
}

.Modal-view-conten-userLogin-register-address-item2-province1 {
    margin-right: 15px;
}

.Modal-view-conten-userLogin-register-address-item2-province1-value,
.Modal-view-conten-userLogin-register-address-item2-province2-value {
    position: absolute;
    background-color: #ffffff;
    top: 33px;

    border-radius: 5px;
    color: rgb(78, 73, 73);
    border: 1px solid rgb(165, 149, 149);
    width: 100px;
    padding: 0px 5px 0px 5px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
    outline: none;
}

.Modal-view-conten-userLogin-register-address-item2-province1-value-item,
.Modal-view-conten-userLogin-register-address-item2-province2-value-item {
    width: calc(100% - 10px);
    cursor: pointer;
    display: flex;
    /* justify-content: center; */
    padding-left: 10px;
    align-items: center;
}

.Modal-view-conten-userLogin-register-address-item2-province1-value-item:hover,
.Modal-view-conten-userLogin-register-address-item2-province2-value-item:hover {
    background-color: #f0eeee;
}

.Modal-view-conten-userLogin-register-address-item1 textarea {
    color: rgb(0, 0, 0);
    border: 1px solid rgb(165, 149, 149);
    border-radius: 5px;
    margin-top: 20px;
    width: calc(100% - 5px);
    height: 50px;
    padding-top: 5px;
    padding-left: 5px;
    outline: none;
    resize: none;
}

.Modal-view-conten-userLogin-register-pwd {
    display: flex;
}

.Modal-view-conten-userLogin-register-pwd input,
.Modal-view-conten-userLogin-register-pwd svg {
    margin-top: 20px;
}

.Modal-view-conten-userLogin-register-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100px;
    background-color: rgb(243, 39, 90);
    color: white;
    border-radius: 10px;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
    cursor: pointer;
    margin-top: 15px;
}

.Modal-view-conten-userLogin-register-bottom {
    font-size: 15px;
    margin-left: -200px;
    margin-top: 10px;
    color: rgb(32, 141, 243);
}

.Modal-view-conten-userLogin-register-bottom-toLogin {
    margin-top: 5px;
    margin-bottom: 20px;
    text-decoration: underline;
    cursor: pointer;
    width: auto;
}

.Modal-view-conten-userLogin-register-bottom-userRegister,
.Modal-view-conten-userLogin-register-bottom-landlordRegister {
    cursor: pointer;
    width: auto;
}

.Modal-view-conten-userLogin-register-address-item2-province1-key,
.Modal-view-conten-userLogin-register-address-item2-province2-key {
    display: flex;
    /* justify-content: center; */
    padding-left: 10px;
    align-items: center;
    width: 100%;
}

.loginView {
    left: 50%;
    top: 7%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgb(255, 255, 255);
    z-index: 99999;
    width: 200px;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: moveElement2 0.5s, hideElement2 4s forwards;
}

.login-text {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    color: rgb(243, 39, 90);
    font-weight: 800;
    z-index: 101;
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

.loginView-icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-user-border {
    position: relative;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    right: 100px;
    min-width: 200px;
    max-width: 400px;
    width: auto;
}

.user-alert {
    display: flex;
    position: relative;
    width: 60px;
    justify-content: center;
    cursor: pointer;
}

.alertNum {
    background-color: var(--main-color);
    height: 20px;
    width: auto;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    position: relative;
    top: -7px;
    left: -9px;
}

.user-alert-icon {
    width: 30px;
    height: 30px;
}
</style>