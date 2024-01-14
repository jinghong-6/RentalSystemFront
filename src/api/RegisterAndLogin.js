import { request } from "@/utils/request";

export function getUserSameAccount(data) {
    return request({
        url: '/user/Register/SameAccount',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getLandSameAccount(data) {
    return request({
        url: '/land/Register/SameAccount',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function postUserRegister(data, token) {
    return request({
        url: '/user/Register',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function postLandlordRegister(data, token) {
    return request({
        url: '/land/Register',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function postUserLogin(data) {
    return request({
        url: '/user/Login',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function postLandLogin(data) {
    return request({
        url: '/land/Login',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function postAutoUserLogin(data, token) {
    return request({
        url: '/user/AutoLogin',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function postAutoLandLogin(data, token) {
    return request({
        url: '/land/AutoLogin',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function postAdminLogin(data) {
    return request({
        url: '/admin/Login',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getAdminInfo(data, token) {
    return request({
        url: '/admin/Info/getAdminInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

