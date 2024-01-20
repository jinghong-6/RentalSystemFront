import { request } from "@/utils/request";

export function getAllInfo( token) {
    return request({
        url: '/admin/getAllInfo',
        method: 'post',
        headers: {
            'Authorization': token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}
