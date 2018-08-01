import config from '../config';
import Storage from '../storage';
import * as baseManager from './BaseService';


/**
 * 获取签到信息 当月
 * @param {*} param 
 * @param {*} callBack 
 */
export function getSinginList(param, callback){
    let request_url = config.base_url + config.hour_get_singin_list;
    config.request(request_url, 'POST', {}, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)}
        else{callback(null)}
    }, e=>{callback(null)})
}

/**
 * 签到
 * @param {*} params 
 * @param {*} callBack 
 */
export function sendSingin(params, callback){
    let request_url = config.base_url + config.hour_singin;
    config.request(request_url, 'POST', {}, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)}
        else{callback(null)}
    }, e=>{callback(null)});
}

/**
 * 获取新闻列表
 * @param {*} callback 
 */
export function getNewsList(params, callback){
    let request_url = config.base_url + config.hour_cms_list;
    config.request(request_url, 'POST', params , data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)}
        else{callback(null)}
    }, e=>callback(null));
}
/**
 * 阅读任务统计接口
 * @param {*} callback 
 */
export function rederNum(callback){
    let request_url = config.base_url + config.hour_cms_read;
    config.request(request_url, 'POST', {} , data=>{
        if(baseManager.codeEq10000(data)){
            callBack(data)}
        else{callBack(null)}
    }, e=>callback(null));
}

/**
 * 获取我的任务列表
 * @param {*} callback 
 */
export function getTaskList(callback){
    let request_url = config.base_url + config.hour_user_task_list;
    config.request(request_url, 'POST', {} , data=>{
        if(baseManager.codeEq10000(data)){           
            callback(data)
        }else{
            callback(null)
        }
    }, e=>{callback(null)});
}

/**
 * 领取任务
 * @param {*} params 
 * @param {*} callBack 
 */
export function doTask(task, callback){
    let request_url = config.base_url + config.hour_user_get_task;
    let params = {
        taskId: task.id
    }
    config.request(request_url, 'POST', params , data=>{
        if(baseManager.codeEq10000(data)){
            callback(data)}
        else{callback(null)}
    }, e=>callback(null));
}

/**
 * 刷新积分
 */
export function refreshIntegral(callback){
    let request_url = config.base_url + config.hour_integral;
    config.request(request_url, 'POST', {}, data=>{
        if(config.SUCCESS == data.code){
            let array = data.data;
            if(array.length > 0){
                let result = array[0];
                global.user.integral = result.integral;
                Storage._sava(config.USER, global.user);
                callback ? callback() : '';
            }
        }
    }, e=>{})
}