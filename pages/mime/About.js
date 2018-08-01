import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Platform,
  NativeModules
} from 'react-native';
import Text from '../../component/T_Text';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import StyleUtils from '../StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as mimeManager from '../../service/MimeService';
/**
 * 关于我们
 */
export default class About extends Component{

    render(){
        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor,{paddingTop: 20}]}>
                <StatusBar />
                <Image resizeMode='contain' style={{width: 70, height: 70, margin: 15}} source={require('./../../../images/150_logo.png')}/>
                <Text style={{width:config.width * 0.9, fontSize: 12, marginBottom: 15,}}>Hour是一款移动端轻钱包APP,它旨在为用户提供安全放心，简单好用，功能强大的数字资产钱包应用</Text>
                <View style={[{width: config.width}, StyleUtils.space]}></View>
                
                <TouchableOpacity onPress={()=>{
                    Actions.webMessage({'title':'服务协议', 'uri': config.base_url + config.hour_app_serviceAgreement_html})
        
                }} style={{height:40,  width:config.width * 0.9, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{color:'#333333', fontSize: 12, }}>服务协议</Text>
                    <Image resizeMode='contain' style={{width: 10, height: 10}} source={require('./../../../images/back_right_gray.png')} />
                </TouchableOpacity>
                <View style={[{width: config.width* 0.9}, StyleUtils.space]}></View>

                <TouchableOpacity  onPress={()=>{
                    Actions.webMessage({'title':'隐私协议', 'uri': config.base_url + config.hour_app_privacyAgreement_html})
        
                }} style={{height:40, width:config.width * 0.9, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{color:'#333333', fontSize: 12, }}>隐私协议</Text>
                    <Image resizeMode='contain' style={{width: 10, height: 10}} source={require('./../../../images/back_right_gray.png')} />
                </TouchableOpacity>
                <View style={[{width: config.width* 0.9}, StyleUtils.space]}></View>
                {/* <TouchableOpacity  onPress={()=>{
                    this.checkApk();
                }} style={{height:40, width:config.width * 0.9, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{color:'#333333', fontSize: 12, }}>检查新版本</Text>
                    <Image resizeMode='contain' style={{width: 10, height: 10}} source={require('./../../../images/back_right_gray.png')} />
                </TouchableOpacity>
                <View style={[{width: config.width* 0.9}, StyleUtils.space]}></View> */}
                <Toast ref='toast'/>
                <Progress ref='progress' />
            </View>
        )
    }

    /**
     * 检查APK版本
     */
    checkApk(){
        if(Platform.OS == 'android'){
            this.refs.progress.show();
            //获取当前APK版本 VersionCode和VersionName
            NativeModules.VersionModule.getVersionInfo(data=>{

                let new_data = JSON.parse(data)

                let params = {
                    'versionCode':new_data.versionCode,
                    'versionName':new_data.versionName
                }

                //与服务器版本判断是否一致
                mimeManager.checkApk(params, data1=>{
                    this.refs.progress.hidden();
                    if(data1){
                        if(30000 == data1.code){
                            let array = data1.data;
                            if(Array.isArray(array) && array.length > 0){
                                let result = array[0];
                                //开始下载最新APK
                                NativeModules.upgrade.upgrade(result.url);
                                this.refs.toast.show('发现新版本，开始下载中');  
                            }
                        }else{
                            this.refs.toast.show('当前为最新版本');  
                        }
                    }
                });
            }) 
        }else if(Platform.OS == 'ios'){
            NativeModules.upgrade.upgrade('1367305346',(msg) =>{
                if('YES' == msg) {  
                   //跳转到APP Stroe  
                   NativeModules.upgrade.openAPPStore('1367305346');  
                } else {  
                    this.refs.toast.show('当前为最新版本');  
                }  
            })
        }       
    }
}



