import config from '../config';
import qrImage from 'qr-image';
import {isAdmin} from '../models/validator';
import pathToRegexp from 'path-to-regexp';
import { history } from '../config'
import strings from "../constants/strings";


const BASE_URL = config.api;

export function generateUrl(url) {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        return url;
    }
    return joinUrl(BASE_URL, url);
}

export function joinUrl(host, spec) {
    return host + spec;
}

export function queryUrl(url, items) {
    let str = [];
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(items[key]));
        }
    }
    const query = str.join('&');
    if (query.length > 0) {
        return url + '?' + query;
    }
    return url;
}
export function renderTemplate(template) {
    const args = Array.prototype.slice.call(arguments, 1);
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' ? args[number] : match
    })
}

export function getDateTime(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.getFullYear() +
        '/' + pad(date.getMonth() + 1) +
        '/' + pad(date.getDate()) +
        ' ' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
    // return date.toLocaleString();
}

export function timeString_(time,interval) {
    if(time&&time>0&&time!=null){
        if(interval==true){
        	let hour=Math.floor(time/(60*60));
    		let minute=Math.floor((time%(60*60))/60);
    		let second=Math.floor((time%(60*60))%60);
    		return hour+":"+minute+":"+second
        }else{
        	let date = new Date(time * 1000);

	        //return date.toLocaleString('zh-CN', {hour12: false})
	        return date.Format('yyyy-MM-dd hh:mm:ss')
        }
    }else{
        return '-'
    }
}
//单位 分 -> 元
export function formatPrice(price) {
    return '￥' + priceFromDatabase(price);
}

//单位 分 -> 元
export function priceFromDatabases(price) {
    if (price == undefined) {
        return 0;
    }
    return (price / 100);
}

export function priceFromDatabase(price) {
    if (price == undefined) {
        return 0.00;
    }
    return (price / 100).toFixed(2);
}

export function priceToDatabase(price) {
    if (isNaN(price)) {
        return 0;
    }
     let priceArr = price.split('.');
     let numberPrice = 0;
     if (priceArr.length == 1) {
         numberPrice = Number(priceArr[0]) * 100;
     } else if (priceArr.length > 1) {
         if (priceArr[1].length == 0) {
             numberPrice = Number(priceArr[0]) * 100;
         } else if (priceArr[1].length == 1) {
             numberPrice = Number(priceArr[0]) * 100 + Number(priceArr[1]) * 10;
         } else if (priceArr[1].length >= 2) {
             numberPrice = Number(priceArr[0]) * 100 + Number(priceArr[1]);
         }
     }
    return numberPrice;
}

export function dataURLToBlob(dataurl) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

export function blobToDataURL(blob, callback) {
    let reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(blob);
}

export function getValue(obj, prop, defaultValue) {
    if (obj === undefined || obj[prop] === undefined) {
        return defaultValue;
    }
    return obj[prop];
}

export function getImageUrl(image, isBig = false) {
    if (image === undefined) {
        return undefined;
    }
    if (image.endsWith(".jpg") || image.endsWith('.png')) {
        return image;
    }
    if (isBig) {
        return image + '-500x500.jpg';
    }
    return image + '-200x200.jpg';
}
/**
 *  转换为数字类型
 * @param  {[type]} temperature [description]
 * @return {[type]}             [description]
 */
export function getNum(temperature) {
    if (temperature === undefined && !isNaN(temperature)) {
        return 0;
    }
    const t = Number(temperature);

    return t;
}

/**
 *  获取输入框值
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
export function getInputValue(input) {
    return input.value.trim();
}

/**
 *  1 表示开启  0 表示关闭
 * @param  {[type]} checked [description]
 * @return {[type]}         [description]
 */
export function getCheckState(checked) {
    return checked ? 1 : 0;
}

/**
 *  账单日期格式
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function billDateFormat(date) {
    const [year, month, day] = date.split('-');
    return year + '/' + month + '/' + day;
}

/**
 *  账单月份格式
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function billDateMonthFormat(date) {
    const [year, month] = date.split('-');
    return year + '/' + month;
}

/**
 *  账单打款状态
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function getBillStateName(value) {
    let state = '';
    switch (value) {
        case 1:
            state = strings.getString('remittance');
            break;
        case 0:
            state = strings.getString('non_remittance');
            break;
    }

    return state;
}


export function formatElectrical(value) {
    return (value / 1000).toFixed(3);
}


/**
 *  检测是否为非负数
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
export function checkIntegrity(num) {
    if (isNaN(num)) {
        return false;
    }

    if (parseFloat(num) >= 0) {
        return true;
    }

    return false;
}

/**
 *  是否为正整数
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
export function isPostiveInt(value) {
    const regx = /^[0-9]*[1-9][0-9]*$/;
    if (regx.test(value)) {
        return true;
    }
    return false;
}


export function uuid() {
    let d = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    let user = localStorage.getItem('com.saiyao.pages.user.pay');
    user = JSON.parse(user);
    return user;
}

export function timeString(time) {
    var date = new Date(time);
    return date.Format('yyyy/MM/dd hh:mm:ss');
}
export function getString(template, ...pattern) {
    let result = strings.getString(template)
    if (pattern.length == 0) {
        return result;
    }
    return result.replace(/{(\d+)}/g, (match, number) => pattern[number] !== undefined ? pattern[number] : match)
}
/**
 * 返回顶部
 */
export function scrollTop(){
    document.getElementById('contMain').scrollTop = 0;
}
/**
 * 时间格式
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 替换url {0}为id
 */
export function getReplUrl(url,id){
    var str = url;
    var str1 = str.replace('{0}', id);
    return str1;
}

/**
 * TabClick tab点击跳转
 * @param eve
 * @returns {*}
 */
export function tabClick(eve,pathname,action){
    const match = pathToRegexp('/admin/'+action+'/:uid').exec(pathname);
    if(eve == 2){
        //充值优惠
        if (isAdmin()) {
            if(match){
                history.push('/admin/recharge/'+match[1]);
            }
        }else{
            history.push('/recharge');
        }
    }else if(eve == 3){
        //充值记录
        if (isAdmin()) {
            if(match){
                history.push('/admin/rechargeRecords/'+match[1]);
            }
        }else{
            history.push('/rechargeRecords');
        }
    }else if(eve == 4){
        //消费记录
        if (isAdmin()) {
            if(match){
                history.push('/admin/costRecords/'+match[1]);
            }
        }else{
            history.push('/costRecords');
        }
    }else if(eve == 1){
        //消费记录
        if (isAdmin()) {
            if(match){
                history.push('/admin/cards/'+match[1]);
            }
        }else{
            history.push('/cards');
        }
    }
}

/**
 *  将文本转成二维码
 * @param text
 * @returns {string}
 */
export function getQRImage(text) {
    if (text == null) {
        return '';
    }
    let pngBuffer = qrImage.imageSync(text, {
        type: 'png',
        margin: 1
    });
    return 'data:image/png;base64,' + pngBuffer.toString('base64');
}