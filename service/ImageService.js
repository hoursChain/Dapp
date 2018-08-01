import {
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import config from '../config';
import * as baseManager from './BaseService';

const options = {
    title: '选择图片', 
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    chooseFromLibraryButtonTitle: '图片库', 
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high', 
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2, 
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: { 
        skipBackup: true, 
        path: 'images'
    }
};



 /**
  * 打开图片库
  */
export function launchImageLibrary(callBack){

    ImagePicker.launchImageLibrary(options, (response)=>{
        if (response.didCancel) {
            console.log('用户点击了取消');
        }
        else if (response.error) {
            console.log('ImagePicker 出错: ', response.error);
        }
        else{ 
            let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};  
            if (Platform.OS === 'ios') {
               source = {uri: response.uri.replace('file://', ''), isStatic: true};
            } else {
               source = {uri: response.uri, isStatic: true};
            }
            // source.fileName = response.fileName;
            // console.log('fileName:', response.fileName);
            callBack(source);
        }
    })
}
/**
 * 打开照相机
 */
export function launchCamera(callBack){
    ImagePicker.launchCamera(options, (response)=>{
        if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};  
            if (Platform.OS === 'ios') {
               source = {uri: response.uri.replace('file://', ''), isStatic: true};
            } else {
               source = {uri: response.uri, isStatic: true};
            }
            // source.fileName = response.fileName;
            // console.log('fileName:', response.fileName);
            callBack(source);
          }
    })

}

/** 
 * 使用fetch实现图片上传
 * @param {string} url  接口地址
 * @param {JSON} params body的请求参数
 * @return 返回Promise 
 *  注意：由于后台服务器配置的不同,let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'}中的type也可能是multipart/form-data formData.append("file", file)中的的file字段也可能是images
 */
export function uploadImage(url, params){
    return new Promise(function (resolve, reject) {
        let file = {uri: params.path.uri, type: 'multipart/form-data', name: 'image.jpg'};
        let formData = new FormData();
        formData.append("uploadfile", file);

        fetch(url,{
            method: 'POST',
            headers:{
                'Authorization': global.user.userid,
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body:formData
        }).then((response) => response.json()).then((responseData)=> {
                if(baseManager.codeEq10000(responseData)){
                    resolve(responseData);
                }else{
                    reject(null);
                } 
               
            }).catch((err)=> {
                reject(err);
            });
    });
}

/**
 * 获取用户上传集合
 * @param {*} callBack 
 */
export function getUploadList(params, callback){
    let request_url = config.base_url + config.ocr_get_upload_list;
    config.request(request_url,'POST', params ? params : {'start': 1, 'len': 4}, data=>{
        if(baseManager.codeEq10000(data)){
            callback(data);
        }else{
            callback(null);
        } 
    }, e=>callback(null))
}

