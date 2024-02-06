<template>
    <div class="contact">
        <div class="contact-main">
            <div class="contact-main-title">
                <div class="contact-main-title-text">联系我们</div>
                <div class="contact-main-title-text text2">Please enter your question to contact the administrator</div>
            </div>
            <div class="contact-main-message">
                <div class="contact-main-message-name">
                    <div class="contact-main-message-name-text1">
                        昵称
                    </div>
                    <div class="contact-main-message-name-text2">
                        {{ name }}
                    </div>
                </div>
                <div class="contact-main-message-tele">
                    <div class="contact-main-message-tele-text1">
                        联系方式
                    </div>
                    <div class="contact-main-message-tele-text2">
                        {{ tele }}
                    </div>
                </div>
                <div class="contact-main-message-input">
                    <div class="contact-main-message-input-text1">
                        填写内容
                    </div>
                    <textarea class="contact-main-message-input-textarea" name="" id="" cols="30" rows="10"
                        v-model="message"></textarea>
                </div>
                <div class="checkButton" @click="sendMessage">SUBMIT</div>
            </div>
        </div>
    </div>
    <div v-if="!loginFlag" class="loginView">
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
            请登录
        </div>
    </div>
    <div v-if="!SendFlag" class="loginView">
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
            提交成功
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { sendInfoToAdmin } from '@/api/contact';
import router from '@/router/router';
import userStore from '@/utils/userInfo';
import landStore from '@/utils/landInfo';

let userInfoStore = userStore()
let landInfoStore = landStore()
let loginFlag = ref(true)
let SendFlag = ref(true)
let name = ref("")
let tele = ref("")
let message = ref("")

onMounted(() => {
    if (userInfoStore.userId == "" && landInfoStore.landId == "") {
        loginFlag.value = false
        setTimeout(() => {
            loginFlag.value = true
            // router.push("/")
            return
        }, 4500);
    } else {
        let ut = localStorage.getItem("UT")
        let decodeUT = decodeURIComponent(atob(ut))
        if (decodeUT == "jinghong001") {
            name.value = userInfoStore.userName
            tele.value = userInfoStore.userTele
        }
        if (decodeUT == "jinghong002") {
            name.value = landInfoStore.landName
            tele.value = landInfoStore.landTele
        }
    }
})

function sendMessage() {
    if (userInfoStore.userId == "" && landInfoStore.landId == "") {
        return
    }
    if (message.value != "") {
        let at = localStorage.getItem('AT');
        
        let ut = localStorage.getItem("UT")
        let decodeUT = decodeURIComponent(atob(ut))
        let user_type = ""
        let user_id = ""
        if (decodeUT == "jinghong001") {
            user_type = "1"
            user_id = userInfoStore.userId
        }
        if (decodeUT == "jinghong002") {
            user_type = "2"
            user_id = landInfoStore.landId
        }

        let data = {
            content:message.value,
            user_id:user_id,
            user_type:user_type
        }
        sendInfoToAdmin(data, at).then(
            res => {
                if (res.status == 200) {
                    console.log(res.data)
                    if (res.data.code == "904") {
                        message.value = ""
                        SendFlag.value = false
                        setTimeout(() => {
                            SendFlag.value = true
                        }, 4500);
                    }
                }
            }
        )
    }
}
</script>

<style scoped>
.contact {
    width: 100%;
    height: 100%;
    background-color: rgb(226, 226, 226);
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact-main {
    width: 55%;
    height: 98%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    /* 阴影设置 */
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contact-main-title {
    width: 100%;
    height: 25%;
    background-color: var(--main-blue);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.contact-main-title-text {
    color: white;
    font-size: 2.2rem;
    font-weight: 800;
    width: 90%;
}

.text2 {
    font-size: 1.5rem;
}

.contact-main-message {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.contact-main-message-name,
.contact-main-message-tele,
.contact-main-message-input {
    width: 100%;
    height: auto;
}

.contact-main-message-name-text1,
.contact-main-message-tele-text1,
.contact-main-message-input-text1 {
    font-weight: 800;
    font-size: 1.8rem;
    margin-bottom: 8px;
}

.contact-main-message-name-text2,
.contact-main-message-tele-text2 {
    width: calc(100% - 14px);
    height: 30px;
    border: 2px solid rgb(155, 155, 155);
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
    overflow: hidden;
    background-color: rgb(240, 239, 239);
    color: rgb(94, 94, 94);
}

.contact-main-message-input-textarea {
    width: calc(100% - 14px);
    max-height: 400px;
    min-height: 200px;
    height: 350px;
    border: 2px solid rgb(155, 155, 155);
    padding: 5px;
    border-radius: 3px;
    font-size: 1rem;
    outline: none;
    resize: none;
}

.checkButton {
    background-color: var(--main-color);
    color: white;
    font-size: 1.5rem;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.5s;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
}

.checkButton:hover {
    background-color: rgb(212, 69, 69);
}

.loginView {
    left: 50%;
    top: 13%;
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
        top: 13%;
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
</style>