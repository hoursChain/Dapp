import config from '../config';
/**
 * 登录
 * @param {*} params 
 * @param {*} callBack 
 */
export function login(params, callBack){
    let service_params = {
        phone: params.phone
    }
    let request_url = config.base_url + config.login + params.sms;
    config.request(request_url, 'POST', service_params, data=>{
        callBack(data);
    }, e=>{
        callBack(null);
    });
}

export function checkLogin(phone, sms){
    let result = {
        code: -1,
        msg:''
    }

    if(!phone){
        result = {
            code: -1,
            msg:'请填写手机号'
        }
    }else if(!sms){
        result = {
            code: -1, msg:'请填写验证码'
        }
    }else if(!config.validateMobile(phone)){
        result = {
            code: -1, msg:'请填写正确的手机号'
        }
    }else{
        result = {
            code: 1, msg:''
        }
    }
    
    if(sms.length > 5){
        //去掉左右空格
        sms = sms.replace(/^\s+|\s+$/g,"");
        if(sms.length < 5){
            result = {
                code: -1, msg:'请填写正确的验证码'
            }
        }else{
            result = {
                code: 1, msg:''
            }
        }
    }else{
        result = {
            code: 1, msg:''
        }
    }
    return result;
}

/**
 * 
 * @param {手机号} phone 
 * @param {验证码} sms 
 * @param {昵称} nick_name 
 */
export function checkRegisterParams(phone, sms, nick_name){
    let result = {
        code: -1,
        msg:''
    }

    if(!phone){
        result = {
            code: -1,
            msg:'请填写手机号'
        }
    }else if(!sms){
        result = {
            code: -1, msg:'请填写验证码'
        }
    }else if(!nick_name){
        result = {
            code: -1, msg:'请填写昵称'
        }
    }else if(!config.validateMobile(phone)){
        result = {
            code: -1, msg:'请填写正确的手机号'
        }
    }else{
        result = {
            code: 1, msg:''
        }
    }
    
    if(sms.length > 5){
        //去掉左右空格
        sms = sms.replace(/^\s+|\s+$/g,"");
        if(sms.length < 5){
            result = {
                code: -1, msg:'请填写正确的验证码'
            }
        }else{
            result = {
                code: 1, msg:''
            }
        }
    }else{
        result = {
            code: 1, msg:''
        }
    }
    
    if(nick_name.length > 0){
        nick_name = nick_name.replace(/^\s+|\s+$/g,"");
        if(nick_name.length < 4){
            result = {
                code: -1, msg:'您的昵称字数太少'
            }
        }else{
            result = {
                code: 1, msg:''
            }
        }
    }
    else{
        result = {
            code: 1, msg:''
        }
    }
    return result;
}

/**
 * 
 * @param {参数} params 
 * @param {回调} callBack 
 */
export function register(params, callBack){
 
    let request_url = config.base_url + config.register + params.sms + '/' + params.whoInviteCode;
    
    config.request(request_url, 'POST',  params, data=>{
        callBack(data);
    }, e=>{
        callBack(null);
    });

}

export function checkSms(phone){

    let result = {
        code: -1,
        msg:''
    }

    if(!phone){
        result = {
            code: -1,
            msg:'请输入手机号码'
        }
    }else if(!config.validateMobile(phone)){
        result = {
            code: -1, msg:'请填写正确的手机号'
        }
    }else{
        result = {
            code: 1, msg:''
        }
    }

    return result;
}

export function getSms(params, callBack){
    
    //请求地址组装
    let request_url = config.base_url + config.get_sms + config.encryption(params.phone);

    //发送请求
    config.request(request_url, 'POST', params, data=>{
        callBack(data);
    }, e=>{
        callBack(null);
    });
}


