import axios from 'axios';
import jsonp from 'jsonp';
import router from '../router';
import { BASE_URL } from '../config/const.js';
import loginHref from '../utils/loginHref.js';

const http = (type, url, data, headers) => {
    if(type == 'jsonp') {

        if (data) {
            let paramsArray = [];
            Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]));

            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
        }

        return new Promise(function (resolve, reject) {
            jsonp(BASE_URL + url, null, function (err, data) {
                err ? reject(err.message) : resolve(data);
            });
        })
        
    }else {
        const TOKEN = localStorage.getItem('token');
        const config = {
            //请求方法，默认是get方法
            method: type,
            //用来向服务器发送请求的url
            url: BASE_URL + url,
            //表明是否有跨域请求需要用到证书
            withCredentials: true,
            //请求超时设置，单位为毫秒
            //timeout: 6000,
            //发送自定义Headers头文件，头文件中包含了http请求的各种信息
            headers: headers || {
                // "Authorization": "Bearer " + TOKEN
            }
        }

        if(type == 'post') {
            config.data = data || {};
        }else if (type == 'get') {
            config.params = data || {};
        }else if(type == 'getUrl'){
            return BASE_URL;
        }

        return new Promise(function (resolve, reject) {
            axios(config)
            .then((response) => {
                resolve({status: response.status, data: response.data.result !== undefined ? response.data.result : response.data});
            })
            .catch(function (error) {
                //console.log(error)
                if(error.response.status == 401) {
                    let accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
                    localStorage.clear();
                    localStorage.accountInfo = JSON.stringify(accountInfo);
                    loginHref();
                }
                resolve({status:　error.response.status, message: error.response.data.error.message, code: error.response.data.error.code || 0 });
            });
        })
    }
}

export { http, BASE_URL };

export default {
    install: function(Vue) {
        Vue.prototype.$http = http;
    }
} 
