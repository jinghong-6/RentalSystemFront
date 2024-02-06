import { createRouter, createWebHashHistory } from "vue-router"
import View from '@/components/View.vue'
import MainIndex from '@/components/Index/MainIndex.vue'
import Contact from '@/components/Index/Contact.vue'
import House from '@/components/Index/House.vue'
import Recommend from '@/components/Index/Recommend.vue'
import NotFound from '@/components/404.vue';

import MainHouse from '@/components/Index/House/MainHouse.vue'
import Room from '@/components/Index/House/Room.vue'
import OrderRoom from '@/components/Index/House/OrderRoom.vue'

import Admin from '@/components/Admin/Admin.vue'
import AdminMydata from '@/components/Admin/Mydata.vue'
import AdminRole from '@/components/Admin/Role.vue'
import AdminRoomCenter from '@/components/Admin/RoomCenter.vue'
import AdminAlertView from '@/components/Admin/AlertView.vue'
import AdminAlert from '@/components/Admin/Alert/Alert.vue'
import AdminAlertList from '@/components/Admin/Alert/AlertList.vue'
import AdminConsumer from '@/components/Admin/Role/Consumer.vue'
import AdminLandlord from '@/components/Admin/Role/Landlord.vue'

import Consumer from '@/components/Consumer/Consumer.vue'
import ConsumerOrders from '@/components/Consumer/Orders.vue'
import ConsumerMyData from '@/components/Consumer/MyData.vue'
import ConsumerAlertView from '@/components/Consumer/AlertView.vue'
import ConsumerAlert from '@/components/Consumer/Alert/Alert.vue'
import ConsumerAlertList from '@/components/Consumer/Alert/AlertList.vue'
import ConsumerCollection from '@/components/Consumer/Collection.vue'
import ConsumerOrderBegin from '@/components/Consumer/Orders/OrderBegin.vue'
import ConsumerOrderCompete from '@/components/Consumer/Orders/OrderCompete.vue'
import ConsumerOrderCompeted from '@/components/Consumer/Orders/OrderCompeted.vue'
import ConsumerOrderEnd from '@/components/Consumer/Orders/OrderEnd.vue'
import ConsumerOrderNopay from '@/components/Consumer/Orders/OrderNopay.vue'
import ConsumerComment from '@/components/Consumer/Comment.vue'
import ConsumerCommentNotRated from '@/components/Consumer/Comment/NotRated.vue'
import ConsumerCommentRated from '@/components/Consumer/Comment/Rated.vue'

import Landlord from '@/components/Landlord/Landlord.vue'
import MyData from '@/components/Landlord/MyData.vue'
import LandlordOrders from '@/components/Landlord/Orders.vue'
import PublishRoom from '@/components/Landlord/PublishRoom.vue'
import RoomCenter from '@/components/Landlord/RoomCenter.vue'
import EditRoomView from '@/components/Landlord/EditRoomView.vue'
import LandlordOrderBegin from '@/components/Landlord/Orders/OrderBegin.vue'
import LandlordOrderCompete from '@/components/Landlord/Orders/OrderCompete.vue'
import LandlordOrderCompeted from '@/components/Landlord/Orders/OrderCompeted.vue'
import LandlordOrderEnd from '@/components/Landlord/Orders/OrderEnd.vue'
import LandlordOrderNopay from '@/components/Landlord/Orders/OrderNopay.vue'
import LandlordComment from '@/components/Landlord/Comment.vue'
import LandlordCommentNotRated from '@/components/Landlord/Comment/NotRated.vue'
import LandlordCommentRated from '@/components/Landlord/Comment/Rated.vue'
import LandlordAlert from '@/components/Landlord/Alert/Alert.vue'
import LandlordAlertList from '@/components/Landlord/Alert/AlertList.vue'
import LandlordAlertView from '@/components/Landlord/AlertView.vue'

import pay from '@/components/pay.vue'

import { postAutoUserLogin, postAutoLandLogin }
    from '@/api/RegisterAndLogin';

const router = createRouter({
    history: createWebHashHistory(),
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: View,
            children: [
                {
                    path: '/index',
                    component: MainIndex
                },
                {
                    path: '/index/recommend',
                    component: Recommend
                },
                {
                    path: '/index/house',
                    component: House,
                    children: [
                        {
                            path: '/index/house',
                            component: MainHouse,
                        },
                        {
                            path: '/index/house/room/:id',
                            component: Room,
                        },
                        {
                            path: '/index/house/OrderRoom/:id',
                            component: OrderRoom
                        }
                    ]
                },
                {
                    path: '/index/contact',
                    component: Contact
                },
                {
                    path: '/consumer',
                    component: Consumer,
                    children: [
                        {
                            path: '/consumer',
                            component: ConsumerMyData
                        },
                        {
                            path: '/consumer/Orders',
                            component: ConsumerOrders,
                            children: [
                                {
                                    path: '/consumer/Orders',
                                    component: ConsumerOrderNopay,
                                },
                                {
                                    path: '/consumer/Orders/OrderBegin',
                                    component: ConsumerOrderBegin,
                                },
                                {
                                    path: '/consumer/Orders/OrderCompete',
                                    component: ConsumerOrderCompete,
                                },
                                {
                                    path: '/consumer/Orders/OrderCompeted',
                                    component: ConsumerOrderCompeted,
                                },
                                {
                                    path: '/consumer/Orders/OrderEnd',
                                    component: ConsumerOrderEnd,
                                },
                            ]
                        },
                        {
                            path: '/consumer/Comment',
                            component: ConsumerComment,
                            children: [
                                {
                                    path: '/consumer/Comment',
                                    component: ConsumerCommentNotRated,
                                },
                                {
                                    path: '/consumer/Comment/Rated',
                                    component: ConsumerCommentRated,
                                },
                            ]
                        },
                        {
                            path: '/consumer/Alert',
                            component: ConsumerAlertView,
                            children: [
                                {
                                    path: '/consumer/Alert',
                                    component: ConsumerAlertList,
                                },
                                {
                                    path: '/consumer/AlertView/:id',
                                    component: ConsumerAlert,
                                }
                            ]
                        },
                        {
                            path: '/consumer/Collection',
                            component: ConsumerCollection
                        },
                    ],
                    beforeEnter: (to, from, next) => {
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
                                                next()
                                            } else {
                                                next("/")
                                            }
                                        } else {
                                            next("/")
                                        }
                                    }
                                )
                            } else {
                                next("/")
                            }
                        }
                    }
                },
                {
                    path: '/landlord',
                    component: Landlord,
                    children: [
                        {
                            path: '/landlord',
                            component: MyData
                        },
                        {
                            path: '/landlord/Orders',
                            component: LandlordOrders,
                            children: [
                                {
                                    path: '/landlord/Orders',
                                    component: LandlordOrderNopay,
                                },
                                {
                                    path: '/landlord/Orders/OrderBegin',
                                    component: LandlordOrderBegin,
                                },
                                {
                                    path: '/landlord/Orders/OrderCompete',
                                    component: LandlordOrderCompete,
                                },
                                {
                                    path: '/landlord/Orders/OrderCompeted',
                                    component: LandlordOrderCompeted,
                                },
                                {
                                    path: '/landlord/Orders/OrderEnd',
                                    component: LandlordOrderEnd,
                                },
                            ]
                        },
                        {
                            path: '/landlord/Comment',
                            component: LandlordComment,
                            children: [
                                {
                                    path: '/landlord/Comment',
                                    component: LandlordCommentNotRated,
                                },
                                {
                                    path: '/landlord/Comment/Rated',
                                    component: LandlordCommentRated,
                                },
                            ]
                        },
                        {
                            path: '/landlord/PublishRoom',
                            component: PublishRoom
                        },
                        {
                            path: '/landlord/Alert',
                            component: LandlordAlertView,
                            children: [
                                {
                                    path: '/landlord/Alert',
                                    component: LandlordAlertList,
                                },
                                {
                                    path: '/landlord/AlertView/:id',
                                    component: LandlordAlert,
                                }
                            ]
                        },
                        {
                            path: '/landlord/RoomCenter',
                            component: RoomCenter,
                            children: [
                                {
                                    path: '/landlord/RoomCenter/:id',
                                    component: EditRoomView
                                }
                            ]
                        }
                    ],
                    beforeEnter: (to, from, next) => {
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
                            if (decodeUT == "jinghong002") {
                                postAutoLandLogin(data, at).then(
                                    res => {
                                        if (res.status == 200) {
                                            console.log(res.data.data)
                                            if (res.data.code == "902") {
                                                next()
                                            } else {
                                                next("/")
                                            }
                                        } else {
                                            next("/")
                                        }
                                    }
                                )
                            } else {
                                next("/")
                            }
                        }
                    }
                }
            ]
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: '/admin',
                    component: AdminMydata,
                },
                {
                    path: '/admin/Role',
                    component: AdminRole,
                    children: [
                        {
                            path: '/admin/Role',
                            component: AdminConsumer
                        },
                        {
                            path: '/admin/Role/Landlord',
                            component: AdminLandlord
                        }
                    ]
                },
                {
                    path: '/admin/RoomCenter',
                    component: AdminRoomCenter,
                },
                {
                    path: '/admin/Alert',
                    component: AdminAlertView,
                    children: [
                        {
                            path: '/admin/Alert',
                            component: AdminAlertList,
                        },
                        {
                            path: '/admin/AlertView/:id',
                            component: AdminAlert,
                        }
                    ]
                }
            ]
        },
        // 支付页，移动端
        {
            path: '/pay/:payInfo',
            name: '支付',
            component: pay,
        },
        // 404路由，放在最后一个
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound,
        }
    ]
})

export default router