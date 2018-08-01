import CryptoJS from 'crypto-js';
const key = "bGtqbGpvaWprMTI0MkAjQGFzZGZhc2RmYXNkZkBAI0Aj";
//解密2，手机端发送的无法解密
export function mysendJIEmi(message) {
   return ((CryptoJS.AES.decrypt(message,key)).toString(CryptoJS.enc.Utf8));
}

//加密2，手机端无法解密
export function mysendJIAmi(message) {
    return (CryptoJS.AES.encrypt(message, key).toString());
}

