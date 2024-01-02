import { request } from "@/utils/request";

export function getAllCity(){
    return request({
        url: '/city/',
        method: 'get'
    })
}

export function getHouse(data){
    return request({
        url: '/house/List',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getHouseType(data){
    return request({
        url: '/house/List/Type',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getHouseSearch(data){
    return request({
        url: '/house/List/SearchValue',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getHouseCity(data){
    return request({
        url: '/house/List/City',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getHouseRand(data){
    return request({
        url: '/house/getHouse/rand',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}