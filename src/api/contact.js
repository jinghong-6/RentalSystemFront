import { request } from "@/utils/request";

export function sendInfoToAdmin(data,token) {
    return request({
        url: '/adminAlert/insert',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
    })
}