import { request } from "@/utils/request";

export function getConsumerSearchHistory(data, token) {
    return request({
        url: '/history',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data
    })
}