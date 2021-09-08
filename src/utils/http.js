import axios from "axios";
import qs from 'qs';


const baseUrl = 'http://127.0.0.1:8086';


// get post请求封装
export function get(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + url, {params: param}).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl + url, qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        }).catch((error) => {
            reject(error)
        })
    })
}