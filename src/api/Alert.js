import { request } from "@/utils/request";

export function getConsumerAlertCount(data,token){
    return request({
        url: '/consumerAlert/getCount',
        method: 'post',
        headers: { 
            'Authorization':token,
            'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getConsumerAlertByConsumerId(data,token) {
    return request({
        url: '/consumerAlert',
        method: 'post',
        headers: { 
            'Authorization':token,
            'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function readAlertByConsumerIdAndAlertId(data,token) {
    return request({
        url: '/consumerAlert/read',
        method: 'post',
        headers: { 
            'Authorization':token,
            'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

export function getAlertByConsumerIdAndAlertId(data,token) {
    return request({
        url: '/consumerAlert/getAlert',
        method: 'post',
        headers: { 
            'Authorization':token,
            'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}