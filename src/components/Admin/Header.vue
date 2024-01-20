<template>
    <div class="header">
        <div class="header-logo" @click="toIndex">
            <img src="../../assets/logo.png" class="header-logo-img" alt="">
            <div class="header-logo-font">惊鸿民宿·管理员后台</div>
        </div>
        <div class="header-user-border">
            <div class="header-user">
                <div v-if="!userInfoFlag" class="header-user-div">
                    <span class="header-user-login" @click="openLoginModal">登录</span>
                </div>
                <div v-if="userInfoFlag" class="header-user-div">
                    <div class="userInfo-nameInfo">
                        <div class="userInfo-nameInfo-name">{{ userName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="Modal-view" v-if="showModal">
        <div class="overlay"></div>
        <div class="Modal-view-content">
            <div class="Modal-view-conten-userLogin" v-show="userLoginFlag">
                <div class="Modal-view-conten-userLogin-title">管理员登录</div>
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
                <div class="Modal-view-conten-userLogin-text">欢迎回来</div>
                <div class="Modal-view-conten-userLogin-loginButton">
                    <div @click="adminLogin">
                        登录
                    </div>
                </div>
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
import { ref, onMounted, onBeforeUnmount, provide } from 'vue';
import router from '@/router/router';
import { postAdminLogin, getAdminInfo } from '@/api/RegisterAndLogin';
import useStore from '@/utils/adminInfo';
import bus from "@/utils/bus"
let userInfoStore = useStore()

let showModal = ref(true)
let userLoginFlag = ref(true)
let userInfoFlag = ref(false)

let teleUserLabel = ref()
let pwdUserLabel = ref()

let teleUserRef = ref()
let pwdUserRef = ref()

let teleUserInput = ref()

let loginSuccess = ref(false)
let loginFail = ref(false)

let userName = ref()

onBeforeUnmount(() => {
    localStorage.removeItem('aatt');
})

function adminLogin() {
    let data = {
        Account: teleUserRef.value,
        pwd: pwdUserRef.value
    }

    postAdminLogin(data).then(
        res => {
            if (res.status == "200") {
                console.log(res.data)
                if (res.data.code == "902") {
                    loginSuccess.value = true
                    let adminDetail = res.data.data
                    loginAdminDetail(adminDetail)
                    bus.emit('login', '1');
                    setTimeout(() => {
                        loginSuccess.value = false
                    }, 4500);
                } else {
                    loginFail.value = true
                    setTimeout(() => {
                        loginFail.value = false
                    }, 4500);
                }
            }
        }
    )
}

// 管理员登录成功后赋值
function loginAdminDetail(adminDetail) {
    userInfoStore.id = adminDetail.admin.id
    userInfoStore.admin_account = adminDetail.admin.admin_account
    userInfoStore.admin_name = adminDetail.admin.admin_name
    userInfoStore.money = adminDetail.admin.money

    localStorage.setItem('aatt', adminDetail.token);

    userName.value = userInfoStore.admin_name
    userInfoFlag.value = true

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

function toIndex() {
    router.push("/")
}
</script>

<style scoped>
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

.userInfo-nameInfo-name {
    cursor: pointer;
    color: #f1f1f1;
    font-weight: 800;
    text-decoration: underline;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.3rem;
}

.header-user span {
    color: white;
}

.header-user-login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
}

.header-user-login:hover {
    background-color: rgb(221, 36, 82);
}

.Modal-view {
    position: absolute;
    /* background-color: aqua; */
    width: 100%;
    height: 100%;
    z-index: 99999;
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

.Modal-view-conten-userLogin {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

.Modal-view-conten-userLogin-title {
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
.Modal-view-conten-userLogin-loginButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 25px;
    position: relative;
}

.Modal-view-conten-userLogin-account-icon,
.Modal-view-conten-userLogin-pwd-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.Modal-view-conten-userLogin-account input,
.Modal-view-conten-userLogin-pwd input {
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
    margin-bottom: 50px;
    background-color: rgb(243, 39, 90);
    color: white;
    border-radius: 10px;
    transition: all 0.2s;
    -ms-transition: all 0.2s;
    cursor: pointer;
}


.loginView {
    left: 50%;
    top: 7%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgb(255, 255, 255);
    z-index: 99999;
    width: 200px;
    /* height: 380px; */
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* animation: moveElement 0.5s, hideElement 4s forwards; */
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
</style>