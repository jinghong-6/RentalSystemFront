import { request } from "@/utils/request";

export function getHouseById(id) {
    return request({
        url: '/house/getHouse/' + id,
        method: 'get'
    })
}

export function getHouseByLandlordId(data,token) {
    return request({
        url: '/house/LandlordId',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getIdByHouseIdAndConsumerId(data,token) {
    return request({
        url: '/collection',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getCollectionList(data,token) {
    return request({
        url: '/collection/getCollection',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function setCollection(data,token) {
    return request({
        url: '/collection/setCollection',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function delCollection(data,token) {
    return request({
        url: '/collection/delCollection',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function UpdateHouse(data,token) {
    return request({
        url: '/house/Update',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function getHouseComment(data) {
    return request({
        url: '/comment/HouseId',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function UpdateHouseStatus(data,token) {
    return request({
        url: '/house/UpdateStatus',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}