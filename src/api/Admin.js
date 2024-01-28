import { request } from "@/utils/request";

export function getAllInfo(token) {
    return request({
        url: '/admin/getAllInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export function getHouseByAdmin(token) {
    return request({
        url: '/admin/getHouse',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export function UpdateAdminHouse(data,token) {
    return request({
        url: '/admin/UpdateHouse',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data:data
    })
}

export function getAllConsumer(token) {
    return request({
        url: '/admin/getAllConsumer',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export function changeConsumerStatus(data,token) {
    return request({
        url: '/admin/updateConsumer',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data:data
    })
}

export function getAllLandlord(token) {
    return request({
        url: '/admin/getAllLandlord',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export function changeLandlordStatus(data,token) {
    return request({
        url: '/admin/updateLandlord',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data:data
    })
}