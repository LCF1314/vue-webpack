import storage from './storage';
import config from '../config';
import { http } from '../apis/index.js'; // ajax
import { Message, MessageBox} from 'element-ui'
import $jquery from 'jquery';
// 日期选择
import DC from './date.js'


class lcf {
   
    constructor() {
        this.appEmptyPlaceholder = ''; // 表格等 为空时显示的占位符内容  之前为一 一
        this.storage = storage;
        this.config = config;
        this.$jquery = $jquery;
        this.commonInfo = JSON.parse(window.localStorage.getItem('commonInfo') || null);
        this.isAlterSerialNo = JSON.parse(window.localStorage.getItem('isAlterSerialNo') || null);
        this.browser = this._getBrowser(); // 当前浏览器
        this.OS = this._detectOS(); // 当前操作系统
        this.scrollWidth = this._getScrollWidth(); // 当前浏览器滚动条宽度
        this.$DC = new DC(); // 日期 dateChoice
    }
    getIp(cb){
        $jquery.ajax({
            url: 'http://freegeoip.net/json/',
            success: function(data){
                cb(data);
            },
            async:false,
            type: 'GET',
            dataType: 'JSON'
        })
    }
    // 判断是否有滚动条 direction = 'vertical' || 'horizontal' 方向 竖直 水平
    hasScrolled(el, direction = 'horizontal') {
        if(direction === "vertical") {
            return el.scrollHeight > el.clientHeight;
        }else if(direction === "horizontal") {
            return el.scrollWidth > el.clientWidth;
        }
    }

    // 获取浏览器滚动条宽度
    _getScrollWidth() {
        const cWidth = document.body.clientWidth || document.documentElement.clientWidth; // 页面可视区域宽度
        const iWidth = window.innerWidth; // 浏览器窗口大小
        return iWidth - cWidth;
    }

    // 获取浏览器
    _getBrowser() {
        const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串  
        const isOpera = userAgent.indexOf("Opera") > -1;  
        if (isOpera) {  
            return "Opera"  
        }; // 判断是否Opera浏览器  
        if (userAgent.indexOf("Firefox") > -1) {  
            return "FF";  
        }; // 判断是否Firefox浏览器  
        if (userAgent.indexOf("Chrome") > -1){  
            return "Chrome";  
        };  
        if (userAgent.indexOf("Safari") > -1) {  
            return "Safari";  
        }; // 判断是否Safari浏览器  
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {  
            return "IE";  
        }; // 判断是否IE浏览器  
    }

    // 获取操作系统
    _detectOS() {
        const sUserAgent = navigator.userAgent;
        const isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        const isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        const isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        const isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            const isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            const isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            const isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            const isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            const isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
        }
        return "other";
    }
    // 设置基础配置信息
    setCommonInfo(commonInfo, isAlterSerialNo) {
        this.commonInfo = commonInfo;
        window.localStorage.setItem('commonInfo', JSON.stringify(commonInfo));
        localStorage.setItem('userData', JSON.stringify(commonInfo.user));
        // 存储老版需要的参数
        localStorage.setItem('settingData', JSON.stringify(commonInfo.setting));
        localStorage.setItem('menuData', JSON.stringify(commonInfo.menu));
        localStorage.setItem('permissionData', JSON.stringify(commonInfo.permission));
        localStorage.setItem('extColumnData', JSON.stringify(commonInfo.extColumn));
        localStorage.setItem('columnSettingData', JSON.stringify(commonInfo.columnSetting));
        localStorage.setItem('infoGoodsSpecData', JSON.stringify(commonInfo.infoGoodsSpec));
        localStorage.setItem('columnWidth', JSON.stringify(commonInfo.columnWidth));
        // 有时不传第二个参数 例如: [列设置]
        if(isAlterSerialNo) {
            this.isAlterSerialNo = isAlterSerialNo;
            window.localStorage.setItem('isAlterSerialNo', JSON.stringify(isAlterSerialNo));
        }
    }

    // 时间格式化
    setFormatDate(date) {
        let _D = date ? new Date(date) : new Date();
        let _y = _D.getFullYear();
        let _m = _D.getMonth() + 1;
        let _d = _D.getDate();
     
        if(_m < 10) {
            _m = `0${_m}`
        }
        if(_d < 10) {
            _d = `0${_d}`
        }
        return `${_y}-${_m}-${_d}`
    }

    // 时间格式化分钟
    setFormatDateHours(date) {
        date = date.replace("T", " ").replace(/-/g, "/");
        return date;
    }
    // 获取本地ip
    getIPs(callback){
        let ip_dups = {};

        //compatibility for firefox and chrome
        let RTCPeerConnection = window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection;

        //bypass naive webrtc blocking
        if (!RTCPeerConnection) {
            let iframe = document.createElement('iframe');
            //invalidate content script
            iframe.sandbox = 'allow-same-origin';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            let win = iframe.contentWindow;
            window.RTCPeerConnection = win.RTCPeerConnection;
            window.mozRTCPeerConnection = win.mozRTCPeerConnection;
            window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
            RTCPeerConnection = window.RTCPeerConnection
                || window.mozRTCPeerConnection
                || window.webkitRTCPeerConnection;
        }

        //minimal requirements for data connection
        let mediaConstraints = {
            optional: [{RtpDataChannels: true}]
        };

        //firefox already has a default stun server in about:config
        //    media.peerconnection.default_iceservers =
        //    [{"url": "stun:stun.services.mozilla.com"}]
        let servers = undefined;

        //add same stun server for chrome
        if(window.webkitRTCPeerConnection)
            servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

        //construct a new RTCPeerConnection
        let pc = new RTCPeerConnection(servers, mediaConstraints);

        //listen for candidate events
        pc.onicecandidate = function(ice){

            //skip non-candidate events
            if(ice.candidate){

                //match just the IP address
                let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
                let ip_addr = ip_regex.exec(ice.candidate.candidate)[1];

                //remove duplicates
                if(ip_dups[ip_addr] === undefined)
                    callback(ip_addr);

                ip_dups[ip_addr] = true;
            }
        };

        //create a bogus data channel
        pc.createDataChannel("");

        //create an offer sdp
        pc.createOffer(function(result){

            //trigger the stun server request
            pc.setLocalDescription(result, function(){}, function(){});

        }, function(){});
    }

     // 时间格式化数字
    setFormatDateNum(date) {
        let _D = date ? new Date(date) : new Date();
        let _y = _D.getFullYear();
        let _m = _D.getMonth() + 1;
        let _d = _D.getDate();
        if(_m < 10) {
            _m = `0${_m}`
        }
        if(_d < 10) {
            _d = `0${_d}`
        }
        return +`${_y}${_m}${_d}`
    }

}

const $lcf = new lcf;
export { $lcf }
export default {
    install: function(Vue) {
        Vue.prototype.$lcf = $lcf;
        //Vue.prototype.$message = message;
    }
}