import fetch from 'dva/fetch';
import {queryUrl, getReplUrl} from '../utils/helper'
import {getAccessToken, clearValidator, loadValidator,clearValidatorGoLogin} from '../models/validator'
import { message } from 'antd';
import { history } from '../config'
import strings from '../constants/strings';
function parseJSON(response) {

  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 错误码返回
 */
export function apiErrorCode(code,message){
    return strings.getString('error_code_api_'+code);
}

/**
 *错误码过滤器
 */

function successResponse(data){
    try{
        // if (data.code == 1003 || data.code == 2002) {
        //     clearValidator();
        //     history.replace('/login')
        //     return data;
        // } else {
            if( data.code == 200){
                data.code = ''
            }
        if( data.code == 422){
            history.replace('/login')
            return
        }
        return data;
       // }
    }
    catch (error)
    {
        strings.getString('Error');
    }
}

/**
 * 网络连接失败
 */
function errorRequest(err){

    history.push('/login')
    return {
        code:-1,
        message:'网络请求失败:' + err
    }
    //message.error(strings.getString('network_error'));
}

function getTargetUrl(url) {
    if (typeof url === 'string' && ((url.indexOf('http://')==0) || (url.indexOf('https://')==0))) {
        return url
    }
    const key = typeof url === 'object' ? url.key: url
    let validator = loadValidator()
    const template = validator['urls'][key]
    if (template && typeof url === 'object' && url.args.length > 0) {
        return getReplUrl(template, url.args)
    }
    return template
}
function urlArgs(){
    var args = {};
    var query = window.location.search.substring(1);
    var pairs = query.split("&");
    for(var i = 0;i < pairs.length; i++){
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}
/**
 *判断当前用户信息是否过期
 *  1000*60*60*2.5 过期时间
 */
function getLocal_time(){
  try {
      let validator = loadValidator();
      if (validator) {
          let local_time = validator['local_time'];
          if (!local_time || (local_time && ((new Date().getTime() - Number(local_time)) > (1000 * 60 * 60 * 2.8)))) {
              var query=urlArgs();
              if(query&&query.data){
                return false
              }else{
                message.error(strings.getString('login_timeout'));
                clearValidatorGoLogin()
                return true
              }
          }
      }
  }
  catch (error) {
       console.log(error)
  }
  return false
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, items) {
    try {
        let target = url;
        // // if (!target) {
        // //     const data = {code: 2002};
        // //     return successResponse(data);
        // // }
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           // 'credentials': 'include',
           // 'Access-Control-Allow-Origin':'*',
            // 'Access-Control-Allow-Credentials':true,
            // "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
            // "Access-Control-Allow-Headers":"x-requested-with, accept, origin, content-type",
            // "X-Powered-By":' 3.2.1'
        };

        // if (items.isToken === undefined || items.isToken) {
        //     headers.Authorization = 'JWT ' + getAccessToken();
        // }
        //console.log(loadValidator())
        if(loadValidator() && loadValidator().token){
            headers.token = loadValidator().token;
        } else {
            if(location.pathname.indexOf('/preview/') <= -1){
                history.push('/login')
            }
        }

        headers = {...headers, ...items.headers};
        let data = {
            method: items.method,
            headers
        };

        //data.mode = 'no-cors';

        if (items.body) {
            if (data.method === 'post' || data.method === 'put') {
                if (items.body instanceof FormData) {
                    data.body = items.body;
                    delete headers['Content-Type']
                } else {
                    data.body = JSON.stringify(items.body || {});
                }
            } else {
                target = queryUrl(target, items.body);
            }
        }
         //console.log(data)


        // const defaultOptions = {
        //   credentials: 'include',
        // };
        //
        // const newOptions = { ...defaultOptions, ...items };
        //
        // newOptions.mode = 'no-cors';
        //
        // if (newOptions.method === 'post' || newOptions.method === 'put' || newOptions.method === 'delete') {
        //   if (!(newOptions.body instanceof FormData)) {
        //     newOptions.headers = {
        //       Accept: 'application/json, text/plain, */*',
        //       'Content-Type': 'application/json; charset=utf-8',
        //      // 'Access-Control-Allow-Origin':'*',
        //     //  'Access-Control-Allow-Credentials': true,
        //       ...newOptions.headers,
        //     };
        //     newOptions.body = JSON.stringify(newOptions.body);
        //     //newOptions.credentials =  'include'
        //   } else {
        //     // newOptions.body is FormData
        //     newOptions.headers = {
        //       Accept: 'application/json',
        //       ...newOptions.headers,
        //     };
        //   }
        // }


        return fetch(target, data)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => (successResponse(data)))
            .catch((err) => (errorRequest(err)));
    }
    catch(error){
        // console.log(error)
    }
}
