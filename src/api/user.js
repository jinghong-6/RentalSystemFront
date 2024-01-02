import { request } from "@/utils/request";

export function PostChangeConsumerInfo(data,token) {
    return request({
        url: '/user/changeInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}

export function PostChangeLandlordInfo(data,token) {
    return request({
        url: '/land/changeInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}