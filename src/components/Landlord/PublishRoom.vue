<template>
    <div class="PublishRoom">
        <div class="PublishRoom-border">
            <div class="PublishRoom-border-title">发布民宿</div>
            <div class="PublishRoom-border-RoomTitle">
                <div class="PublishRoom-border-RoomTitle-title">
                    民宿名称
                    <span>(5个字符以上，100个字符以下)</span>
                </div>
                <div class="PublishRoom-border-RoomTitle-input">
                    <input type="text" name="" id="" v-model="HouseName">
                </div>
            </div>
            <div class="PublishRoom-border-synopsis">
                <div class="itemTitle">
                    民宿简介
                    <span>(对该民宿的简介，5个字符以上，1000个字符以内)</span>
                </div>
                <div class="PublishRoom-border-synopsis-input">
                    <textarea name="" id="" cols="30" rows="10" v-model="HouseSynopsis"></textarea>
                </div>
            </div>
            <div class="PublishRoom-border-price">
                <div class="itemTitle">
                    设定价格
                    <span>(设置每晚所需租金，大于0，小于999999)</span>
                </div>
                <div class="PublishRoom-border-price-input">
                    <input type="text" placeholder="元" v-model="priceValue" @blur="priceBlur">
                </div>
            </div>
            <div class="PublishRoom-border-date">
                <div class="itemTitle">
                    设置起始日期
                    <span></span>
                </div>
                <div class="PublishRoom-border-date-border">
                    <div class="room-right-pay-date">
                        <div class="room-right-pay-date-begin" @click="showCheckDate('1')">{{ beginDate }}</div>
                        <span>至</span>
                        <div class="room-right-pay-date-end" @click="showCheckDate('2')">{{ endDate }}</div>
                        <div class="date-check" v-if="showCheckDateFlag">
                            <div class="date-check-dateTitle">
                                <div class="date-check-dateTitle-left" @click="previousMonth">
                                    <svg t="1691306337449" class="date-check-dateTitle-icon" viewBox="0 0 1024 1024"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8403" width="200"
                                        height="200">
                                        <path
                                            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                                            p-id="8404" fill="#707070"></path>
                                    </svg>
                                </div>
                                <div class="date-check-dateTitle-date">{{ currentYear }}-{{ currentMonth }}</div>
                                <div class="date-check-dateTitle-right" @click="nextMonth">
                                    <svg t="1691306384364" class="date-check-dateTitle-icon" viewBox="0 0 1024 1024"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9006" width="200"
                                        height="200">
                                        <path
                                            d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
                                            p-id="9007" fill="#707070"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="date-check-week">
                                <div class="date-check-week-item">日</div>
                                <div class="date-check-week-item">一</div>
                                <div class="date-check-week-item">二</div>
                                <div class="date-check-week-item">三</div>
                                <div class="date-check-week-item">四</div>
                                <div class="date-check-week-item">五</div>
                                <div class="date-check-week-item">六</div>
                            </div>
                            <div class="date-check-days">
                                <div class="date-check-days-item" v-for="(day, index) in datesArray" ref="selectedDay"
                                    @click="getDay(index)">
                                    {{ day }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="PublishRoom-border-banner">
                <div class="itemTitle">
                    设置轮播图
                    <span>(至少3张图片，最多8张，默认首张为首页宣传图)</span>
                </div>
                <div class="PublishRoom-border-banner-upload">

                    <img v-for="url in previewUrls" :key="url" :src="url" alt="Preview">

                    <span>+
                        <div>添加图片</div>
                        <input type="file" id="file-input" accept="image/*" @change="handleFileSelect" multiple>
                    </span>
                </div>
            </div>
            <div class="PublishRoom-border-type">
                <div class="itemTitle">
                    房源类型
                    <span>(必须选择一个房源类型)</span>
                </div>
                <div class="PublishRoom-border-type-items">
                    <div class="PublishRoom-border-type-items-item" v-for="(roomType, index) in RoomType" ref="roomTypeDom"
                        @click="getRoomType(index)">
                        <svg t="1691066938512" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2928" width="200" height="200">
                            <path
                                d="M848 539.648a32.128 32.128 0 0 1 24.874667 31.189333v412.885334a32.085333 32.085333 0 0 1-32 32h-253.824a32.085333 32.085333 0 0 1-32-32v-217.557334H470.613333v217.557334a32.085333 32.085333 0 0 1-32 32H183.125333a32.085333 32.085333 0 0 1-32-32v-412.885334a31.957333 31.957333 0 0 1 63.488-5.717333c0.426667 2.517333 0.384 3.157333 0.512 5.717333v380.885334H406.613333v-217.557334a32.085333 32.085333 0 0 1 32-32h148.437334a32.170667 32.170667 0 0 1 32 32v217.557334h189.824v-380.885334a32.256 32.256 0 0 1 33.450666-31.957333c2.858667 0.256 2.858667 0.256 5.674667 0.768z"
                                p-id="2929" fill="#8a8a8a"></path>
                            <path
                                d="M774.698667 267.989333l228.224 226.730667c0.768 0.853333 1.578667 1.664 2.304 2.56a31.786667 31.786667 0 0 1 7.04 22.613333 32.341333 32.341333 0 0 1-32.682667 29.482667 32.170667 32.170667 0 0 1-16.384-4.949333c-2.602667-1.664-3.114667-2.261333-5.418667-4.309334L507.690667 92.842667 57.386667 540.117333l-2.56 2.304c-0.938667 0.64-1.834667 1.365333-2.816 2.005334a32.170667 32.170667 0 0 1-23.296 4.394666 32.341333 32.341333 0 0 1-25.856-32.384 32.170667 32.170667 0 0 1 5.077333-16.341333c1.664-2.602667 2.304-3.114667 4.352-5.418667L485.12 25.045333c0.853333-0.725333 1.621333-1.536 2.517333-2.218666a31.701333 31.701333 0 0 1 11.818667-6.016c2.858667-0.768 3.626667-0.725333 6.570667-1.024h3.328c1.109333 0.128 2.218667 0.170667 3.328 0.341333a31.744 31.744 0 0 1 12.373333 4.736c2.474667 1.621333 2.986667 2.218667 5.205333 4.181333l179.541334 178.432c-0.042667-28.928 0.213333-57.856 0.853333-86.741333a32 32 0 0 1 62.037333-9.557333c1.152 3.072 1.92 9.557333 1.92 9.557333l0.085334 151.253333z"
                                p-id="2930" fill="#8a8a8a"></path>
                        </svg>
                        <div class="PublishRoom-border-type-items-item-text">{{ roomType }}</div>
                    </div>
                </div>
            </div>
            <div class="PublishRoom-border-facility">
                <div class="itemTitle">
                    基础设施
                    <span>(至少选择一个基础设施)</span>
                </div>
                <div class="PublishRoom-border-facility-items-items">
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[0], $event)">
                        <svg t="1691906668820" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4424" width="200" height="200">
                            <path
                                d="M926.634667 294.912a32 32 0 1 1-39.936 50.005333C780.512 260.128 649.824 213.333333 512.053333 213.333333c-137.813333 0-268.544 46.826667-374.752 131.669334a32 32 0 1 1-39.936-50.005334C214.784 201.194667 359.562667 149.333333 512.053333 149.333333c152.437333 0 297.173333 51.818667 414.581334 145.578667z m-235.413334 298.133333a32 32 0 0 1-38.442666 51.178667A233.418667 233.418667 0 0 0 512.021333 597.333333c-51.541333 0-100.48 16.629333-140.8 46.912a32 32 0 1 1-38.442666-51.157333A297.408 297.408 0 0 1 512.021333 533.333333c65.504 0 127.893333 21.184 179.2 59.722667z m128-149.344a32 32 0 0 1-38.442666 51.168C703.829333 437.066667 610.378667 405.333333 512.032 405.333333c-98.368 0-191.850667 31.754667-268.8 89.578667a32 32 0 1 1-38.453333-51.157333C292.736 377.664 399.669333 341.333333 512.032 341.333333c112.32 0 219.242667 36.309333 307.189333 102.368zM512 853.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
                                fill="#8a8a8a" p-id="4425"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[0] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[1], $event)">
                        <svg t="1691907321675" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5884" width="200" height="200">
                            <path
                                d="M343.488 724.288l-9.152 9.472c-7.616 7.936-45.632 48.768-45.632 75.584 0 29.952 24.512 54.336 54.72 54.336s54.72-24.32 54.72-54.336c0-26.752-38.016-67.648-45.632-75.584l-9.024-9.472zM581.568 724.288l-9.152 9.472c-7.616 7.936-45.632 48.768-45.632 75.584 0 29.952 24.512 54.336 54.72 54.336s54.72-24.32 54.72-54.336c0-26.752-38.016-67.648-45.632-75.584l-9.024-9.472zM463.552 884.672l-9.088 9.472c-7.616 7.936-45.632 48.768-45.632 75.584 0 29.952 24.512 54.272 54.72 54.272s54.72-24.32 54.72-54.336c0-26.752-38.016-67.584-45.632-75.584l-9.088-9.408zM701.696 884.672l-9.152 9.472c-7.616 7.936-45.632 48.768-45.632 75.584 0 29.952 24.576 54.272 54.784 54.272s54.72-24.32 54.72-54.336c0-26.752-38.016-67.584-45.632-75.584l-9.088-9.408zM819.712 724.288l-9.088 9.472c-7.616 7.936-45.632 48.768-45.632 75.584 0 29.952 24.512 54.336 54.72 54.336s54.72-24.32 54.72-54.336c0-26.752-38.016-67.648-45.632-75.584l-9.088-9.472z"
                                fill="#8a8a8a" p-id="5885"></path>
                            <path
                                d="M960.64 538.304c3.328-15.68 4.992-31.36 4.992-47.296 0-151.424-133.952-273.6-316.48-301.248l-19.904-29.504V47.296C629.248 21.184 607.936 0 581.568 0H47.68C21.376 0 0 21.184 0 47.296v922.24c0 26.112 21.376 47.296 47.68 47.296s47.68-21.184 47.68-47.296V94.592h438.592v69.76l-14.272 22.4c-187.904 20.864-343.104 153.856-343.104 304.256 0 19.008 2.368 38.336 6.656 56.896-25.28 14.976-44.032 36.48-44.032 60.416v29.12c0 29.312 30.912 52.288 70.272 52.288h744.192c39.424 0 70.272-23.04 70.272-52.352V608.32c0.064-29.76-28.8-55.808-63.296-70.016zM533.056 338.432C380.928 384.512 335.936 486.848 334.08 491.2c-6.528 16.256-22.464 26.88-40.32 26.88l-15.36-2.752c-23.04-9.216-33.856-34.368-25.088-56.384 5.888-14.656 62.976-145.088 254.208-203.072l12.736-1.92c19.2 0 35.904 12.224 41.664 30.4 6.912 23.04-6.08 47.104-28.864 54.08z"
                                fill="#8a8a8a" p-id="5886"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[1] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[2], $event)">
                        <svg t="1691907477969" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7615" width="200" height="200">
                            <path
                                d="M1024 736V160c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h348c2.2 0 4 1.8 4 4v108H260c-2.2 0-4 1.8-4 4v40c0 2.2 1.8 4 4 4h504c2.2 0 4-1.8 4-4v-40c0-2.2-1.8-4-4-4H640V772c0-2.2 1.8-4 4-4h348c17.7 0 32-14.3 32-32zM576 880H448v-96c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v96zM64 688V208c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v480c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16z"
                                p-id="7616" fill="#8a8a8a"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[2] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[3], $event)">
                        <svg t="1691907568008" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="8921" width="200" height="200">
                            <path
                                d="M789.333333 752.384l78.848-45.525333a21.333333 21.333333 0 1 1 21.333334 36.949333L810.666667 789.333333l78.848 45.525334a21.333333 21.333333 0 0 1-21.333334 36.949333L789.333333 826.282667V917.333333a21.333333 21.333333 0 0 1-42.666666 0v-91.050666l-78.848 45.525333a21.333333 21.333333 0 1 1-21.333334-36.949333L725.333333 789.333333l-78.848-45.525333a21.333333 21.333333 0 0 1 21.333334-36.949333L746.666667 752.384V661.333333a21.333333 21.333333 0 0 1 42.666666 0v91.050667zM149.333333 85.333333h725.333334a85.333333 85.333333 0 0 1 85.333333 85.333334v256a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334z m0 42.666667a42.666667 42.666667 0 0 0-42.666666 42.666667v256a42.666667 42.666667 0 0 0 42.666666 42.666666h725.333334a42.666667 42.666667 0 0 0 42.666666-42.666666V170.666667a42.666667 42.666667 0 0 0-42.666666-42.666667H149.333333z m64 234.666667h597.333334a21.333333 21.333333 0 0 1 0 42.666666H213.333333a21.333333 21.333333 0 0 1 0-42.666666zM158.933333 664.533333a21.333333 21.333333 0 0 1 12.416-40.810666c61.44 18.688 94.378667 103.36 42.304 163.264-34.304 39.445333-28.586667 90.773333 2.090667 114.56a21.333333 21.333333 0 0 1-26.133333 33.706666c-49.877333-38.613333-58.709333-118.144-8.170667-176.277333 30.357333-34.88 11.178667-84.181333-22.506667-94.442667z m298.666667 0a21.333333 21.333333 0 0 1 12.416-40.810666c61.44 18.688 94.378667 103.36 42.304 163.264-34.304 39.445333-28.586667 90.773333 2.090667 114.56a21.333333 21.333333 0 0 1-26.133334 33.706666c-49.877333-38.613333-58.709333-118.144-8.170666-176.277333 30.357333-34.88 11.178667-84.181333-22.506667-94.442667z m-149.333333 4.053334a21.333333 21.333333 0 0 1 12.416-40.832c61.44 18.709333 94.378667 103.381333 42.304 163.264-34.304 39.466667-28.586667 90.794667 2.090666 114.56a21.333333 21.333333 0 1 1-26.133333 33.728c-49.877333-38.613333-58.709333-118.144-8.170667-176.277334 30.357333-34.901333 11.178667-84.202667-22.506666-94.464z"
                                fill="#8a8a8a" p-id="8922"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[3] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[4], $event)">
                        <svg t="1691907637760" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="10164" width="200" height="200">
                            <path
                                d="M256 64h512a85.333333 85.333333 0 0 1 85.333333 85.333333v725.333334a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333V149.333333a85.333333 85.333333 0 0 1 85.333333-85.333333z m0 42.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v725.333334a42.666667 42.666667 0 0 0 42.666667 42.666666h512a42.666667 42.666667 0 0 0 42.666667-42.666666V149.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H256z m-42.666667 362.666666h597.333334v42.666667H213.333333v-42.666667z m106.666667-213.333333a21.333333 21.333333 0 0 1 21.333333 21.333333v85.333334a21.333333 21.333333 0 0 1-42.666666 0v-85.333334a21.333333 21.333333 0 0 1 21.333333-21.333333z m0 341.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v85.333333a21.333333 21.333333 0 0 1-42.666666 0v-85.333333a21.333333 21.333333 0 0 1 21.333333-21.333334z"
                                fill="#8a8a8a" p-id="10165"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[4] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[5], $event)">
                        <svg t="1691907664325" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="11454" width="200" height="200">
                            <path
                                d="M853.333333 213.333333V170.666667a42.666667 42.666667 0 0 0-42.666666-42.666667H213.333333a42.666667 42.666667 0 0 0-42.666666 42.666667v42.666666h682.666666z m0 42.666667H170.666667v597.333333a42.666667 42.666667 0 0 0 42.666666 42.666667h597.333334a42.666667 42.666667 0 0 0 42.666666-42.666667V256zM213.333333 85.333333h597.333334a85.333333 85.333333 0 0 1 85.333333 85.333334v682.666666a85.333333 85.333333 0 0 1-85.333333 85.333334H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334z m298.666667 746.666667c-141.376 0-256-114.624-256-256s114.624-256 256-256 256 114.624 256 256-114.624 256-256 256z m211.818667-230.4a138.666667 138.666667 0 0 1-224.597334-5.866667l-0.362666 0.213334a96 96 0 0 0-168.32 92.224c60.352 97.792 187.946667 130.453333 288.128 72.597333A213.013333 213.013333 0 0 0 723.84 601.6zM696.746667 469.333333c-58.922667-102.037333-189.397333-137.002667-291.413334-78.08a213.205333 213.205333 0 0 0-106.602666 178.133334 138.666667 138.666667 0 0 1 231.381333-3.84l0.341333-0.213334a96 96 0 1 0 166.293334-96z"
                                fill="#8a8a8a" p-id="11455"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[5] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[6], $event)">
                        <svg t="1691907726169" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="12910" width="200" height="200">
                            <path
                                d="M840.21 270.58c0-16.56-5.72-41.51-32.98-66.27-17.6-15.99-42.01-30.05-72.55-41.78-58.99-22.67-136.8-35.15-219.08-35.15s-160.08 12.48-219.08 35.15c-30.54 11.74-54.95 25.79-72.55 41.78-27.24 24.76-32.97 49.71-32.97 66.27 0 18.81 7.25 46.2 40.55 72.69 2.65 3.17 5.99 5.83 9.89 7.72l2.23 1.08c8.71 5.79 18.46 11.27 29.17 16.39V445c0 60.38 23.51 117.14 66.21 159.83 42.69 42.69 99.46 66.21 159.83 66.21h28.37c60.38 0 117.14-23.51 159.83-66.21 42.69-42.69 66.21-99.46 66.21-159.83v-74.14c56.44-25.67 86.92-60.43 86.92-100.28zM527.25 611.05h-28.37c-91.55 0-166.04-74.48-166.04-166.04V395.4l167.5 81.38a29.994 29.994 0 0 0 26.28-0.02l166.67-81.42v49.69c0 91.53-74.48 166.02-166.04 166.02z m-90.01-231.64h151.92l-75.75 37.01-76.17-37.01z m283.92-60H310.05c-13.42-5.61-24.97-11.7-34.44-18.17-0.39-0.26-0.78-0.52-1.18-0.76-0.37-0.29-0.75-0.58-1.14-0.85-14.16-10.16-22.29-20.74-22.29-29.05 0-13.08 20.73-34.25 67.05-52.05 52.29-20.09 122.45-31.16 197.56-31.16s145.26 11.07 197.56 31.16c46.32 17.8 67.05 38.97 67.05 52.05-0.01 12.71-18.7 31.92-59.06 48.83z"
                                p-id="12911" fill="#8a8a8a"></path>
                            <path
                                d="M529.48 231.91l-17.27-35-17.28 35-38.64 5.62 27.96 27.25-6.6 38.48 34.56-18.17 34.55 18.17-6.6-38.48 27.96-27.25z"
                                p-id="12912" fill="#8a8a8a"></path>
                            <path
                                d="M804.09 895.6H222.84c-16.57 0-30-13.43-30-30v-41.85c0-37.88 12.34-73.74 34.73-100.98 23.8-28.94 55.95-44.88 90.54-44.88h64.72c22.98 0 45.48 7.3 65.07 21.11l65.31 46.04 66.66-46.44c19.45-13.55 41.76-20.71 64.51-20.71h64.45c34.59 0 66.74 15.94 90.54 44.88 22.4 27.24 34.73 63.1 34.73 100.98v41.85c-0.01 16.57-13.44 30-30.01 30z m-551.25-60H774.1v-11.85c0-24.01-7.49-46.34-21.08-62.87-12.19-14.82-27.89-22.99-44.2-22.99h-64.45c-10.43 0-20.87 3.44-30.21 9.94l-83.91 58.45c-10.36 7.21-24.12 7.18-34.43-0.1l-82.49-58.15c-9.42-6.64-19.96-10.15-30.5-10.15h-64.72c-16.31 0-32.01 8.16-44.2 22.99-13.59 16.53-21.08 38.85-21.08 62.87v11.86z"
                                p-id="12913" fill="#8a8a8a"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[6] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[7], $event)">
                        <svg t="1691907783053" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="14078" width="200" height="200">
                            <path
                                d="M84.531232 830.070172c39.439244 0 61.258179-19.548218 80.508615-36.797068 18.030655-16.154935 32.272008-28.915563 61.254086-28.915563 26.676569 0 37.19411 10.861372 51.751664 25.892717 17.179264 17.74106 38.560224 39.819914 86.135776 39.819914 46.218648 0 69.861114-21.156856 88.855724-38.154995 17.20587-15.396665 30.795377-27.557636 60.794621-27.557636 29.626761 0 41.410132 11.377118 57.719586 27.125801 17.803481 17.192567 39.962154 38.58683 86.292342 38.58683 45.607734 0 70.263274-20.072151 92.015693-37.781488 19.167548-15.60542 34.308387-27.930119 63.707974-27.930119 30.254048 0 42.234917 12.938684 57.404408 29.321816 15.014972 16.213263 33.700543 36.390815 69.88772 36.390815 11.048637 0 20.007683-8.958022 20.007683-20.007683s-8.958022-20.007683-20.007683-20.007683c-17.874089 0-26.187429-8.081049-40.527019-23.565718-16.471137-17.786085-39.030945-42.146912-86.765109-42.146912-43.629683 0-67.719334 19.61064-88.971357 36.914748-19.763113 16.090467-35.372625 28.797883-66.75231 28.797883-30.163997 0-42.668799-12.072967-58.497299-27.358091-17.698081-17.08819-39.7227-38.35454-85.514629-38.35454-45.288462 0-68.682265 20.933775-87.478354 37.754882-17.455557 15.618723-31.242562 27.957749-62.171991 27.957749-30.623461 0-41.850154-11.594059-57.389058-27.641547-16.426111-16.9613-36.868699-38.071084-80.497359-38.071084-44.286646 0-68.500117 21.696138-87.956238 39.128159-16.57756 14.853289-29.670763 26.584472-53.80544 26.584472-11.04966 0-20.007683 8.958022-20.007683 20.007683S73.481571 830.070172 84.531232 830.070172z"
                                fill="#8a8a8a" p-id="14079"></path>
                            <path
                                d="M940.859441 918.430616c-17.874089 0-26.187429-8.081049-40.527019-23.565718-16.471137-17.788132-39.030945-42.148959-86.765109-42.148959-43.629683 0-67.719334 19.612687-88.971357 36.916794-19.763113 16.090467-35.372625 28.797883-66.75231 28.797883-30.163997 0-42.666752-12.072967-58.497299-27.358091-17.698081-17.08819-39.7227-38.356586-85.514629-38.356586-45.288462 0-68.682265 20.933775-87.478354 37.754882-17.455557 15.620769-31.242562 27.959795-62.171991 27.959795-30.623461 0-41.850154-11.594059-57.389058-27.641547-16.426111-16.963347-36.868699-38.07313-80.497359-38.07313-44.286646 0-68.500117 21.696138-87.956238 39.128159-16.57756 14.853289-29.671787 26.586518-53.80544 26.586518-11.04966 0-20.007683 8.958022-20.007683 20.007683s8.958022 20.007683 20.007683 20.007683c39.439244 0 61.258179-19.550265 80.508615-36.799114 18.030655-16.154935 32.272008-28.915563 61.254086-28.915563 26.676569 0 37.19411 10.861372 51.750641 25.894763 17.180288 17.74106 38.559201 39.819914 86.136799 39.819914 46.218648 0 69.861114-21.156856 88.85777-38.154995 17.203824-15.398712 30.795377-27.559683 60.792575-27.559683 29.626761 0 41.410132 11.377118 57.719586 27.125801 17.803481 17.192567 39.962154 38.588877 86.292342 38.588877 45.608757 0 70.263274-20.072151 92.015693-37.782511 19.167548-15.60542 34.308387-27.932166 63.707974-27.932166 30.254048 0 42.234917 12.94073 57.404408 29.321816 15.013949 16.213263 33.700543 36.392862 69.88772 36.392862 11.048637 0 20.007683-8.958022 20.007683-20.007683S951.908078 918.430616 940.859441 918.430616z"
                                fill="#8a8a8a" p-id="14080"></path>
                            <path
                                d="M337.723791 719.883631c11.048637 0 19.954471-8.958022 19.954471-20.007683l0-96.517217 347.924107 0 0 96.517217c0 11.048637 8.905834 20.007683 19.954471 20.007683s19.954471-8.958022 19.954471-20.007683L745.511311 320.715419c0-61.531402 18.711154-116.436896 52.429093-154.603147 34.485419-39.036062 83.115999-59.668984 140.366911-59.668984 11.04966 0 19.995403-8.958022 19.995403-20.007683 0-11.04966-8.981559-20.007683-20.031219-20.007683-69.053726 0-127.96137 25.309432-170.262802 73.190953-40.183188 45.484937-62.407352 109.799732-62.407352 181.096545l0 1.234107-347.924107 0 0-1.234107c0-61.531402 18.563798-116.436896 52.281737-154.603147 34.485419-39.036062 82.968643-59.668984 140.219555-59.668984 11.04966 0 20.015869-8.958022 20.015869-20.007683 0-11.04966-8.942673-20.007683-19.99131-20.007683-69.053726 0-127.882576 25.309432-170.184007 73.190953-40.183188 45.484937-62.249763 109.799732-62.249763 181.096545l0 379.160529C317.76932 710.925608 326.675154 719.883631 337.723791 719.883631zM705.60237 361.858468l0 201.591321-347.924107 0 0-201.591321L705.60237 361.858468z"
                                fill="#8a8a8a" p-id="14081"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[7] }}</div>
                    </div>
                    <div class="PublishRoom-border-facility-items-item" @click="selectedFacility(facilityArr[8], $event)">
                        <svg t="1691907835112" class="room-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="15451" width="200" height="200">
                            <path
                                d="M893.44 680.597333c-9.386667 63.957333-43.626667 122.56-90.581333 162.432l51.584 58.453334c3.498667 4.224 5.610667 10.538667 5.610666 16.149333a20.096 20.096 0 0 1-7.018666 15.424 20.117333 20.117333 0 0 1-15.424 6.314667c-5.610667 0-11.925333-2.816-16.128-7.018667l-52.608-60.309333a21.482667 21.482667 0 0 1-2.325334-3.434667C736.149333 885.973333 702.506667 896 667.904 896H360.149333c-32.085333 0-63.146667-7.36-91.605333-20.416l-48.128 56.064c-4.906667 5.610667-11.242667 7.722667-18.24 7.722667-6.314667 0-10.517333-2.112-14.72-6.314667a20.096 20.096 0 0 1-7.04-15.424c0-6.314667 2.133333-11.946667 6.314667-16.128l42.816-48.533333c-55.829333-39.765333-95.189333-103.125333-100.842667-172.8a85.376 85.376 0 0 1 0.213333-165.717334 20.565333 20.565333 0 0 1-0.917333-6.016V209.92C128 149.632 171.008 106.666667 230.656 106.666667c56.192 0 102.677333 51.968 102.677333 115.733333 0 11.776-10.410667 22.186667-22.186666 22.186667-12.501333 0-22.208-9.706667-22.208-22.186667 0-34.645333-23.594667-72.064-58.282667-72.064-35.370667 0-58.261333 23.552-58.261333 59.584v298.517333a20.266667 20.266667 0 0 1-0.32 3.562667H874.666667a85.333333 85.333333 0 0 1 18.773333 168.597333zM849.130667 682.666667H172.330667c10.602667 92.16 93.909333 169.621333 187.818666 169.621333h305.706667c84.565333 0 165.418667-78.293333 183.296-169.621333zM149.333333 554.666667a42.666667 42.666667 0 1 0 0 85.333333h725.333334a42.666667 42.666667 0 1 0 0-85.333333H149.333333z"
                                fill="#8a8a8a" p-id="15452"></path>
                        </svg>
                        <div class="PublishRoom-border-facility-items-item-text">{{ facilityArr[8] }}</div>
                    </div>
                </div>

            </div>
            <div class="PublishRoom-border-maxNum">
                <div class="itemTitle">
                    设定房间数
                    <span>(设置房间数，大于0，小于999999)</span>
                </div>
                <div class="PublishRoom-border-price-input">
                    <input type="text" placeholder="人" v-model="maxNum" @blur="priceBlur">
                </div>
            </div>
            <div class="PublishRoom-border-address">
                <div class="itemTitle">
                    民宿地址
                    <span>(必须填写完整)</span>
                </div>
                <div class="PublishRoom-border-facility-address-border">
                    <div class="PublishRoom-border-facility-address-border-input">
                        <div class="PublishRoom-border-facility-address-border-input-province" @click="showSelectCity('1')">
                            {{ selectedProvince }}
                            <span>(省/市)</span>
                        </div>
                        <div class="PublishRoom-border-facility-address-border-input-leader" @click="showSelectCity('2')">
                            {{ selectedLeaderCity }}
                            <span>(市)</span>
                        </div>
                        <div class="PublishRoom-border-facility-address-border-input-city" @click="showSelectCity('3')">
                            {{ selectedCity }}
                            <span>(县/区)</span>
                        </div>
                    </div>
                    <div class="PublishRoom-border-facility-address-border-select" ref="addressBorder">
                        <div class="PublishRoom-border-facility-address-border-select-item" v-for="CityItems in CityItems"
                            @click="selectCityFun(CityItems)">{{ CityItems }}</div>
                    </div>
                </div>
                <div class="PublishRoom-border-facility-address-border-detailAddress">
                    <input name="" id="" cols="30" rows="10" placeholder="详细地址......" v-model="detailAddr">
                </div>
            </div>
            <div class="check-buttom-border">
                <div class="check-buttom" @click="upLoad">确认发布</div>
            </div>

            <div class="PublishRoom-end"></div>
        </div>
        <div v-if="SaveSuccess" class="loginView">
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
                发布成功
            </div>
        </div>
        <div v-if="SaveFail" class="loginView">
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
                    <path d="M353.6 625.152l271.552-271.552 45.248 45.248-271.552 271.552z" fill="#f32759" p-id="4244">
                    </path>
                    <path d="M353.6 398.848l45.248-45.248 271.552 271.552-45.248 45.248z" fill="#f32759" p-id="4245"></path>
                </svg>
            </div>
            <div class="login-text">
                发布失败
            </div>
        </div>
    </div>
</template>
      
<script setup>
import { ref, onMounted } from 'vue';
import { getAllProvince, getAllLeaderCityByProvince, getAllCityByLeaderCity, PostBannerPhotos, getCityIdByCity, PostHouse } from '@/api/PublishRoom'
import { setToken } from '@/api/setToken'
import useStore2 from '@/utils/landInfo';
import router from '@/router/router';

let HouseName = ref()
let HouseSynopsis = ref()
let priceValue = ref('');
let maxNum = ref('')
let ReturnImgs = ref([]);
let FirstImg = ref('')
let detailAddr = ref('')
let AddrId = ref('')

let SaveSuccess = ref(false)
let SaveFail = ref(false)

let landInfoStore = useStore2()

let selectedImages = ref([]);
let previewUrls = ref([]);



let RoomType = ref()
let selectedRoomType = ref()
let roomTypeDom = ref()
let facilityArr = ref(['WIFI', '热水器', '电视', '空调', '冰箱', '洗衣机', '保安', '泳池', '浴缸'])
let selectedfacilityArr = ref([]);

let ProvinceArr = ref([])
let LeaderCityArr = ref([])
let CityArr = ref([])
let selectedProvince = ref("请选择")
let selectedLeaderCity = ref("请选择")
let selectedCity = ref("请选择")


let CityItems = ref()
let addressBorder = ref()
let AddressFlag = ref()

onMounted(() => {
    RoomType.value = ['普通公寓', '别墅', '庄园豪宅', '小木屋', '乡野民宿', '景点民宿', '原生态']
    updateCalendar()
    getProvince()

})

// 获取所有省份
function getProvince() {
    let AT = localStorage.getItem("AT")
    // let TE = decodeURIComponent(atob(localStorage.getItem('TE')))
    // let data = {
    //     tele: TE
    // }
    getAllProvince(AT).then(
        res => {
            if (res.status == 200) {
                if (res.data.data != "500") {
                    ProvinceArr.value = res.data
                } else if (res.data.data == '5000') {
                    setToken()
                    getProvince()
                }
            }
        }
    )
}

// 获取省会
function getLeaderCity(city) {
    let AT = localStorage.getItem("AT")
    let TE = decodeURIComponent(atob(localStorage.getItem('TE')))
    let data = {
        tele: TE,
        province: city
    }
    getAllLeaderCityByProvince(data, AT).then(
        res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data.data != "500") {
                    LeaderCityArr.value = res.data
                } else if (res.data.data == '5000') {
                    setToken()
                    getLeaderCity()
                }
            }
        }
    )
}

// 获取地市
function getCity(city) {
    let AT = localStorage.getItem("AT")
    let TE = decodeURIComponent(atob(localStorage.getItem('TE')))
    let data = {
        tele: TE,
        LeaderCity: city
    }
    getAllCityByLeaderCity(data, AT).then(
        res => {
            if (res.status == 200) {
                if (res.data.data != "500") {
                    CityArr.value = res.data
                } else if (res.data.data == '5000') {
                    getToken()
                    getCity()
                }
            }
        }
    )
}

// 展示城市
function showSelectCity(a) {
    AddressFlag.value = a
    if (a == '1') {
        CityItems.value = ProvinceArr.value
        addressBorder.value.style.display = 'flex'

    } else if (a == '2') {
        CityItems.value = LeaderCityArr.value
        addressBorder.value.style.display = 'flex'
    } else if (a == '3') {
        CityItems.value = CityArr.value
        addressBorder.value.style.display = 'flex'
    }
}

// 选择城市
function selectCityFun(city) {
    if (AddressFlag.value == '1') {
        selectedProvince.value = city
        addressBorder.value.style.display = 'none'
        getLeaderCity(city)
        AddrId.value = ''
    } else if (AddressFlag.value == '2') {
        selectedLeaderCity.value = city
        addressBorder.value.style.display = 'none'
        getCity(city)
        AddrId.value = ''
    } else if (AddressFlag.value == '3') {
        selectedCity.value = city
        addressBorder.value.style.display = 'none'
        let AT = localStorage.getItem("AT")
        let data = {
            cityZh: selectedCity.value,
            provinceZh: selectedProvince.value,
            leaderZh: selectedLeaderCity.value
        }
        getCityIdByCity(data, AT).then(
            res => {
                if (res.status == 200) {
                    console.log(res.data)
                    if (res.data != '' && res.data != undefined && res.data.code != '804') {
                        AddrId.value = res.data
                    } else {
                        AddrId.value = ''
                    }
                }
            }
        )
    }
}

// 设置轮播图图片
function handleFileSelect(event) {
    let files = event.target.files;
    if (files.length > 0 && selectedImages.value.length < 8) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (selectedImages.value.length < 8) {
                selectedImages.value.push(file);
                previewUrls.value.push(URL.createObjectURL(file));
            }
        }
    }
}

// 处理价格和入住人数的数据格式
function priceBlur() {
    const value = Number(priceValue.value);
    if (isNaN(value) || value <= 0 || value >= 999999 || String(value).indexOf('.') != -1) {
        priceValue.value = '';
    } else {
        priceValue.value = value
    }
    const Numvalue = Number(maxNum.value);
    if (isNaN(Numvalue) || Numvalue <= 0 || Numvalue >= 999999 || String(Numvalue).indexOf('.') != -1) {
        maxNum.value = '';
    } else {
        maxNum.value = Numvalue;
    }
}

// 选择民宿类型
function getRoomType(index) {
    selectedRoomType.value = RoomType.value[index]
    for (let i = 0; i < RoomType.value.length; i++) {
        roomTypeDom.value[i].style.borderColor = 'rgb(172, 172, 172)'
    }
    roomTypeDom.value[index].style.borderColor = 'rgb(243, 39, 90)'
}

// 选择基础设施
function selectedFacility(text, e) {
    const index = selectedfacilityArr.value.indexOf(text);
    if (index === -1) {
        selectedfacilityArr.value.push(text);
        e.target.style.borderColor = 'rgb(243, 39, 90)'; // Change border color
        // console.log(e.target.style.borderColor)
    } else {
        selectedfacilityArr.value.splice(index, 1);
        e.target.style.borderColor = 'rgb(172, 172, 172)'; // Restore original color
        // console.log(e.target.style.borderColor)
    }
    // console.log(selectedfacilityArr.value)
}


let currentDate = ref(new Date())
let currentMonth = ref(0)
let currentYear = ref([])
let datesArray = ref([]);
let showCheckDateFlag = ref(false)
let selectedDay = ref()
let beginDate = ref("请选择")
let DateFlag = ref()
let endDate = ref("请选择")

// 日期上一个月
function previousMonth() {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
    updateCalendar();
}

// 日期下一个月
function nextMonth() {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1);
    updateCalendar();
}

// 更新当月日期
function updateCalendar() {
    currentMonth.value = currentDate.value.getMonth() + 1;
    currentYear.value = currentDate.value.getFullYear();
    // 月份第一天
    const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1);
    // 月份最后一天
    const lastDay = new Date(currentYear.value, currentMonth.value, 0);
    const daysInMonth = lastDay.getDate();
    // 第一天的偏移量
    const startOffset = firstDay.getDay();
    datesArray.value = Array.from({ length: 42 }, (_, index) => {
        if (index >= startOffset && index < startOffset + daysInMonth) {
            return index - startOffset + 1;
        } else {
            return '';
        }
    });
}

// 获得所点击的日期
function getDay(index) {
    let day = selectedDay.value[index].innerText

    if (DateFlag.value == "1") {
        beginDate.value = currentYear.value + "-" + currentMonth.value + "-" + day
        beginDate.value = setDate(beginDate.value)
        showCheckDateFlag.value = false
    } else if (DateFlag.value == "2") {
        endDate.value = currentYear.value + "-" + currentMonth.value + "-" + day
        endDate.value = setDate(endDate.value)
        showCheckDateFlag.value = false
    }

}

// 格式化日期，将2023-1-1为2023-01-01
function setDate(date) {
    const setdate = new Date(date);
    const setmonth = (setdate.getMonth() + 1).toString().padStart(2, '0');
    const setday = setdate.getDate().toString().padStart(2, '0');
    const formattedDate = `${currentYear.value}-${setmonth}-${setday}`;
    return formattedDate
}

// 显示日期选择框
function showCheckDate(a) {
    showCheckDateFlag.value = true

    if (a == "1") {
        DateFlag.value = "1"
    }
    if (a == "2") {
        DateFlag.value = "2"
    }
}

// 获取token
function getToken() {
    let RT = localStorage.getItem('RT')
    let TE = localStorage.getItem("TE")
    if (decodeURIComponent(atob(localStorage.getItem('UT'))) == "jinghong002") {
        let Name = useStore2.userName
        let data = {
            tele: TE,
            UT: decodeURIComponent(atob(localStorage.getItem('UT'))),
            Name: Name
        }
        setToken(data, RT).then(
            res => {
                if (res.status == 200) {
                    if (res.data.code == '904' && res.data.data != '500') {
                        localStorage.setItem('AT', res.data.data.accessToken);
                        localStorage.setItem('RT', res.data.data.refreshToken);
                    } else {
                        localStorage.setItem('AT', '');
                        localStorage.setItem('RT', '');
                        localStorage.setItem('UT', '');
                        localStorage.setItem('TE', '');
                    }
                }
            }
        )
    }
}

// 上传
function upLoad() {
    let AT = localStorage.getItem("AT");

    if (HouseName.value == '' || HouseName.value == undefined) {
        return
    }
    if (HouseSynopsis.value == '' || HouseSynopsis.value == undefined) {
        return
    }
    if (HouseSynopsis.value == '' || HouseSynopsis.value == undefined) {
        return
    }
    if (priceValue.value == '' || priceValue.value == undefined) {
        return
    }
    if (beginDate.value == '请选择' || beginDate.value == undefined) {
        return
    }
    if (endDate.value == '请选择' || endDate.value == undefined) {
        return
    }
    if (previewUrls.value.length < 3 || previewUrls.value == undefined) {
        return
    }
    if (selectedRoomType.value == '' || selectedRoomType.value == undefined) {
        return
    }
    if (selectedfacilityArr.value.length < 1 || selectedfacilityArr.value == undefined) {
        return
    }
    if (maxNum.value == '' || maxNum.value.length < 1 || maxNum.value == undefined) {
        return
    }
    if (selectedProvince.value == '请选择' || selectedLeaderCity.value == '请选择' || selectedCity.value == '请选择') {
        return
    }
    
    
    
    // 逐个上传选定的图片
    function uploadImage(index) {
        if (index >= selectedImages.value.length) {
            // 所有图片上传完成
            if (ReturnImgs.value.length != 0) {
                FirstImg.value = ReturnImgs.value[0]

                let data = {
                    landlord_id: landInfoStore.landId,
                    house_name: HouseName.value,
                    introduce: HouseSynopsis.value,
                    price: priceValue.value,
                    city_id: AddrId.value,
                    full_address: detailAddr.value,
                    firstImg: FirstImg.value,
                    img: ReturnImgs.value,
                    begin_time: beginDate.value,
                    end_time: endDate.value,
                    service: selectedfacilityArr.value,
                    type: selectedRoomType.value,
                    max_num: maxNum.value
                }

                PostHouse(data, AT).then(
                    res => {
                        if (res.status == 200) {
                            console.log(res.data)
                            if (res.data.code == '901') {
                                SaveSuccess.value = true

                                setTimeout(() => {
                                    SaveSuccess.value = false
                                    router.push("/landlord")
                                }, 4500);
                            } else {
                                SaveFail.value = true

                                setTimeout(() => {
                                    SaveFail.value = false
                                }, 4500);
                            }
                        }
                    }
                )
            }
            return;
        }

        // 创建一个FormData对象
        let formData = new FormData();

        // 将当前选择的图片文件设置到FormData中
        formData.set('file', selectedImages.value[index]);

        // 发送上传请求
        PostBannerPhotos(formData, AT).then(
            res => {
                if (res.status == 200) {
                    if (res.data.data != "500") {
                        // console.log(res.data);
                        ReturnImgs.value.push(res.data)
                    } else if (res.data.data == '5000') {
                        setToken();
                        upLoad();
                    } else {
                        return
                    }
                }

                // 递归调用，上传下一张图片
                uploadImage(index + 1);
            }
        );
    }

    // 开始上传第一张图片
    uploadImage(0);
    // console.log(ReturnImgs.value.length)

}

</script>
    
<style scoped>
.PublishRoom {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.PublishRoom-border {
    width: 90%;
    height: 100%;
}

.PublishRoom-border-title {
    width: 100%;
    font-size: 2rem;
    font-weight: 800;
}

.PublishRoom-border-RoomTitle-title {
    margin-top: 50px;
    color: var(--main-blue);
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.PublishRoom-border-RoomTitle-title span {
    font-weight: normal;
    color: rgb(121, 121, 121);
    font-size: 0.8rem;
}

.PublishRoom-border-RoomTitle-input input {
    margin-top: 10px;
    width: calc(100% - 15px);
    height: 40px;
    font-size: 25px;
    color: rgb(105, 105, 105);
    border: 1px solid rgb(167, 167, 167);
    padding-left: 15px;
    background-color: rgb(243, 243, 243);
}

.PublishRoom-border-price-input input {
    margin-top: 10px;
    width: calc(100% - 15px);
    height: 40px;
    font-size: 25px;
    color: rgb(105, 105, 105);
    border: 1px solid rgb(167, 167, 167);
    padding-left: 15px;
    background-color: rgb(243, 243, 243);
}

.PublishRoom-border-RoomTitle-input input:focus,
.PublishRoom-border-price-input input:focus {
    outline: none;
}

.PublishRoom-border-synopsis-input textarea {
    resize: vertical;
    margin-top: 10px;
    padding-top: 10px;
    width: calc(100% - 15px);
    min-height: 200px;
    height: 200px;
    max-height: 1000px;
    font-size: 25px;
    color: rgb(105, 105, 105);
    border: 1px solid rgb(167, 167, 167);
    padding-left: 15px;
    background-color: rgb(243, 243, 243);
}

.PublishRoom-border-synopsis-input textarea:focus {
    outline: none;
}

.itemTitle {
    margin-top: 30px;
    color: var(--main-blue);
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.itemTitle span {
    font-weight: normal;
    color: rgb(121, 121, 121);
    font-size: 0.8rem;
}

.PublishRoom-border-banner {
    width: 100%;
}

.PublishRoom-border-banner-upload {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
}

/* .PublishRoom-border-banner-upload>div {
    margin-top: 10px;
    width: 10%;
    height: 100%;
    border: 2px solid rgb(172, 172, 172);
    aspect-ratio: 16/9;
    margin-right: 15px;
} */

.PublishRoom-border-banner-upload img {
    margin-top: 10px;
    width: 10%;
    height: 100%;
    border: 2px solid rgb(172, 172, 172);
    aspect-ratio: 16/9;
    margin-right: 15px;
}

.PublishRoom-border-banner-upload span {
    background-color: rgb(243, 243, 243);
    font-size: 4rem;
    color: rgb(151, 151, 151);

    margin-top: 10px;
    width: 10%;
    height: 100%;
    border: 2px solid rgb(172, 172, 172);
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    aspect-ratio: 16/9;


    position: relative;
}

.PublishRoom-border-banner-upload span input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.PublishRoom-border-banner-upload span div {
    font-size: 15px;
}

.PublishRoom-border-type-items {
    display: flex;
    flex-wrap: wrap;
}

.PublishRoom-border-facility-items-items {
    display: flex;
    flex-wrap: wrap;
}

.PublishRoom-border-type-items-item,
.PublishRoom-border-facility-items-item {
    display: flex;
    border: 2px solid rgb(172, 172, 172);
    width: auto;
    border-radius: 15px;

    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s;
    margin-right: 15px;
    flex-wrap: wrap;
    margin-bottom: 5px;

    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;
}

.room-icon {
    width: 25px;
    height: 25px;
}

.PublishRoom-border-type-items-item-text,
.PublishRoom-border-facility-items-item-text {
    color: rgb(133, 133, 133);
    margin-left: 5px;
    font-weight: 800;
    pointer-events: none
}

.PublishRoom-border-type-items-item svg,
.PublishRoom-border-facility-items-item svg {
    pointer-events: none
}

.PublishRoom-border-type-items-item:hover,
.PublishRoom-border-facility-items-item:hover {
    background-color: rgb(230, 229, 229);
}

.PublishRoom-border-facility-address-border {
    position: relative;
}

.PublishRoom-border-facility-address-border-input {
    display: flex;
}

.PublishRoom-border-facility-address-border-input-province,
.PublishRoom-border-facility-address-border-input-leader,
.PublishRoom-border-facility-address-border-input-city {
    border: 2px solid rgb(172, 172, 172);
    margin-right: 15px;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 1.1rem;
    border-radius: 10px;
    color: rgb(70, 70, 70);
    font-weight: 800;
    cursor: pointer;
    transition: all 1s;
}

.PublishRoom-border-facility-address-border-input-province:hover,
.PublishRoom-border-facility-address-border-input-leader:hover,
.PublishRoom-border-facility-address-border-input-city:hover {
    border: 2px solid var(--main-color);
}

.PublishRoom-border-facility-address-border-input-province span,
.PublishRoom-border-facility-address-border-input-leader span,
.PublishRoom-border-facility-address-border-input-city span {
    color: rgb(133, 133, 133);
    font-size: 0.9rem;
}

.PublishRoom-border-facility-address-border-select {
    position: relative;
    width: 25%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    padding-bottom: 15px;
    border: 1px solid rgb(145, 145, 145);
    background-color: white;
    margin-top: 10px;


    display: none;
}

.PublishRoom-border-facility-address-border-select-item {
    margin-top: 2px;
    font-size: 1.2rem;
    margin-right: 7px;
    color: rgb(107, 107, 107);
    cursor: pointer;
}

.PublishRoom-border-facility-address-border-select-item:hover {
    color: rgb(255, 73, 118);
}

.select-item-end {
    height: auto;
    margin-bottom: 25px;
}

.PublishRoom-border-facility-address-border-detailAddress {
    width: 100%;
}

.PublishRoom-border-facility-address-border-detailAddress input {
    margin-top: 10px;
    padding: 5px;
    padding-top: 10px;
    width: calc(100% - 15px) ! important;
    height: auto;
    font-size: 25px;
    color: rgb(105, 105, 105);
    border: 1px solid rgb(167, 167, 167);
    padding-left: 15px;
    background-color: rgb(243, 243, 243);
}

.PublishRoom-border-facility-address-border-detailAddress input:focus {
    outline: none;
}



.PublishRoom-end {
    height: 10px;
    margin-top: 50px;
    margin-bottom: 50px;
}




.room-right-pay-date {
    height: 25px;
    width: 400px;
    border: 1px solid rgb(190, 179, 201);
    margin-top: 25px;
    display: flex;
    padding: 5px;
    justify-content: space-around;
    color: rgb(114, 114, 114);
    position: relative;
    background-color: rgb(243, 243, 243);
}

.date-check {
    position: absolute;
    border: 1px solid rgb(190, 179, 201);
    height: 340px;
    width: 100%;
    margin-top: 30px;
    background-color: rgb(255, 255, 255);
    z-index: 20;
}

.date-check-dateTitle {
    margin-top: 15px;
    display: flex;
    color: black;
    justify-content: space-around
}

.date-check-dateTitle-icon {
    width: 25px;
    height: 25px;
}

.date-check-week {
    display: flex;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    justify-content: space-around;
}

.date-check-days {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
}

.date-check-days-item {
    flex-basis: 14.2857%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
}

.date-check-days-item:hover {
    background-color: var(--main-color);
    color: aliceblue;
}

.date-check-dateTitle-left,
.date-check-dateTitle-right {
    cursor: pointer;
}

.room-right-pay-date-begin,
.room-right-pay-date-end {
    cursor: pointer;
}

.check-buttom-border {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.check-buttom {
    font-size: 1.2rem;
    color: white;
    padding: 15px;
    background-color: var(--main-blue);
    border-radius: 5px;
    margin-top: 25px;
    cursor: pointer;
    transition: all 0.4s;
}

.check-buttom:hover {
    background-color: rgb(80, 132, 209);
}

.loginView {
    left: 50%;
    top: 9%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgb(240, 240, 240);
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
        top: 9%;
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