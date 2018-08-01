import config from './../config';
import Storage from './../storage';
// /**
//  * 
//  * @param {导航对象} navigate 
//  * @param {参数} params 
//  */
// export function route(navigate, params){
//     if(navigate){
//         if(config.isJSON(params.nativeEvent.data)){
//             let data  = JSON.parse(params.nativeEvent.data);
//             navigate('Html', {url: data.url, title:data.title });
//         }else{
//             navigate('Html', {url: params.nativeEvent.data, title:'HOUR' });
//         }       
//     }
// }

/**
 * html 发送指令
 * @param {*} data 
 */
export function message(data, call){
    let d = JSON.parse(data);
    if(d.action && d.key){
        let action = d.action;
        let key = d.key;
        if(action == 'get'){
            Storage._load(key, function(value){
                alert('back', value);
                call(key, value);
            })
        }else if(action == 'add' && d.value){
            Storage._sava(key, d.value);  
        }else{
            console.log('postMessage', data);
        }
    }
   
}

function obj2string(o) {
    var r = [];
    if (typeof o == "string") {
        return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o) {
                r.push(i + ":" + obj2string(o[i]));
            }
            if ( !! document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) {
                r.push(obj2string(o[i]))
            }
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return o.toString();
}