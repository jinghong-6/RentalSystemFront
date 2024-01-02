import { request } from "@/utils/request";

export function postAddOrder(data, token) {
    return request({
        url: '/Order/addOrder',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getOrder(data) {
    return request({
        url: '/Order/getOrder',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function payOrder(data) {
    return request({
        url: '/Order/payOrder',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getBeginOrderC(data,token) {
    return request({
        url: '/Order/getBeginOrderC',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getCompleteOrderC(data,token) {
    return request({
        url: '/Order/getCompleteOrderC',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getCompletedOrderC(data,token) {
    return request({
        url: '/Order/getCompletedOrderC',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getEndOrderC(data,token) {
    return request({
        url: '/Order/getEndOrderC',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getNoPayOrderC(data,token) {
    return request({
        url: '/Order/getNoPayOrderC',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getBeginOrderL(data,token) {
    return request({
        url: '/Order/getBeginOrderL',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}
export function getCompleteOrderL(data,token) {
    return request({
        url: '/Order/getCompleteOrderL',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}
export function getCompletedOrderL(data,token) {
    return request({
        url: '/Order/getCompletedOrderL',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}
export function getEndOrderL(data,token) {
    return request({
        url: '/Order/getEndOrderL',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}
export function getNoPayOrderL(data,token) {
    return request({
        url: '/Order/getNoPayOrderL',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function checkOrder(data,token) {
    return request({
        url: '/Order/checkOrder',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getPaySuccessOrFailed(data,token) {
    return request({
        url: '/Order/getPayOutcome',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getNotRatedOrderByConsumerId(data,token) {
    return request({
        url: '/Order/CNotRated',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getRatedOrderByConsumerId(data,token) {
    return request({
        url: '/Order/CRated',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getNotRatedCommentOrderByLandlordId(data,token) {
    return request({
        url: '/Order/LNotRated',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getRatedCommentOrderByLandlordId(data,token) {
    return request({
        url: '/Order/LRated',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function setOrderComment(data,token) {
    return request({
        url: '/comment/setComment',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function setOrderGrades(data,token) {
    return request({
        url: '/Order/setGrades',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getCommentByUUID(data,token) {
    return request({
        url: '/comment/uuid',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getUserInfoForMyData(data,token) {
    return request({
        url: '/user/Info/getUserInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getLandInfoForMyData(data,token) {
    return request({
        url: '/land/Info/getUserInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}