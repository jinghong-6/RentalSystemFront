import { request } from "@/utils/request";

export function getAllProvince(token) {
    return request({
        url: '/city/allProvince',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export function getAllLeaderCityByProvince(data) {
    return request({
        url: '/city/allLeaderCity',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getAllCityByLeaderCity(data, token) {
    return request({
        url: '/city/allCityByLeaderCity',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function PostBannerPhotos(formData, token) {
    return request({
        url: '/file/upload',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'multipart/form-data'
        },
        data: formData
    })
}

export function PostHouse(data, token) {
    return request({
        url: '/house',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data
    })
}

export function getCityIdByCity(data, token) {
    return request({
        url: '/city/getId',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data
    })
}