import {Actions} from 'react-native-router-flux';
import Storage from '../storage';
import config from '../config';
/**
 * 
 * @param {*} code 
 */
export function codeEq10000(data){
    if(data && data.code && data.code == 10000){

        Storage._sava(config.USER, null);
        
        setTimeout(()=>{
            Actions.reset('register',{});
        }, 500);
        return false;
    }
    return true;
}

// /**
//  * 刷新积分
//  */
// export function refreshIntegral(){
//     let request_url = config.base_url + config.hour_integral;
//     config.request(request_url, 'POST', {}, data=>{
//         if(config.SUCCESS == data.code){
//             let array = data.data;
//             if(array.length > 0){
//                 let result = array[0];
//                 global.user.integral = result.integral;
//             }
//         }
//     }, e=>{})
// }