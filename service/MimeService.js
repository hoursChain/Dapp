import config from '../config';
import * as baseManager from './BaseService';

/**
 * 创世用户认证
 */
export function idCardMessage(idCard, callback){
    let request_url = config.base_url + config.hour_id_card;
    let params = idCard ? {
        'cart':idCard
    } : {
        'cart':''
    };
    config.request(request_url, 'POST', params, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)
        }else{
            callback(null)
        }   
    }, e=>{callback(null)});
}

/**
 * 用户基本信息
 * @param {*} user 
 * @param {*} callback 
 */
export function userBaseMessage(user, callback){
    let request_url = config.base_url + config.hour_user_base;
    let params = {
        userName: user.nickName,
        sex: user.sex, //1 男
        birthday: user.brithday,
        hight: user.hight,
        weight: user.weight
    };
    config.request(request_url, 'POST', params, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)
        }else{
            callback(null)
        } 
    }, e=>{callback(null)});

}
/**
 * 获取用户基本信息
 */
export function getUserBaseMessage(callback){
    let request_url = config.base_url + config.hour_get_user_base;   
    config.request(request_url, 'POST', {'a':1}, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)
        }else{
            callback(null)
        } 
    }, e=>{callback(null)});
}

/**
 * 获取邀请码信息
 */
export function getUserCode(callback){
    let request_url = config.base_url + config.hour_get_user_code;
    config.request(request_url, 'POST', {}, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)
        }else{
            callback(null)
        } 
    }, e=>{callback(null)});
}


/**
 * Android 检查版本
 * @param {*} callback 
 */
export function checkApk(params, callback){
    let request_url = config.base_url + config.hour_check_apk;
    config.request(request_url, 'POST', params, data=>{callback(data), e=>{callback(null)}})
}

/**
 *
 * 获取app url 地址 
 * @export
 * @param {*} params
 * @param {*} os 当前系统表示
 * @param {*} callback
 */
export function getAppUrl(params, os, callback){
    let request_url = config.base_url + config.hour_app_url + os;
    config.request(request_url, 'POST', params, data=>{callback(data), e=>{callback(null)}})
}




