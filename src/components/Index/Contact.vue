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
                        周志文
                    </div>
                </div>
                <div class="contact-main-message-tele">
                    <div class="contact-main-message-tele-text1">
                        联系方式
                    </div>
                    <div class="contact-main-message-tele-text2">
                        18876211796
                    </div>
                </div>
                <div class="contact-main-message-input">
                    <div class="contact-main-message-input-text1">
                        填写内容
                    </div>
                    <textarea class="contact-main-message-input-textarea" name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="checkButton">SUBMIT</div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref,onMounted } from 'vue';

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
}

.contact-main-message-name-text2,
.contact-main-message-tele-text2 {
    width: calc(100% - 14px);
    border: 2px solid rgb(155, 155, 155);
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
    overflow: hidden;
    background-color: rgb(240, 239, 239);
    color: rgb(94, 94, 94);
}

.contact-main-message-input-textarea{
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

.checkButton{
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

.checkButton:hover{
    background-color: rgb(212, 69, 69);
}
</style>