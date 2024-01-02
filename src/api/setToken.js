import { request } from "@/utils/request";

export function setToken(data, token) {
    return request({
        url: '/setToken',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}