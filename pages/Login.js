import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Module
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';
import config from '../config';
import EditText from '../component/T_TextInput';
import CheckBox from '../component/T_CheckBox';
import Button from '../component/T_Button';
import ProgressBar from '../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast'

import * as loginSerivce from '../service/LoginService';

import StatusBar from '../component/T_StatusBar';
import Storage from '../storage';

const {width, height} = Dimensions.get('window');
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'})
    ]
})

export default class Login extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            phone: '',//手机号
            sms:'',//短信验证码
            code:'',//邀请码
            nick_name:'',//昵称
            display: 'none'
        }
        this.isClick = false;
        this.loginOrRegisterClick.bind(this);
        //display: none / flex 
    }

    shouldComponentUpdate(nextProps, nextState) {
        // // 登录完成,切成功登录
        // if (nextProps.isLogin) {
        //   this.props.navigation.dispatch(resetAction)
        //   return false;
        // }
        return true;
    }

    componentWillMount(){
       
    }

    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
        
        this.refs.progress.setModalVisible(true);
        Storage._load('user', user=>{
            this.refs.progress.setModalVisible(false);
            global.user = user;
            if(global.user != null){
                this.props.navigation.dispatch(resetAction);
            }
        });

    }


    renderRegisterView(){
        return(
            <View>
                <EditText style={styles.edit} placeholder='邀请码' onChangeText={(text)=>this.setState({
                    code: text
                })}/>
                <View style={styles.space}></View>
                <EditText style={styles.edit} placeholder='昵称' onChangeText={(text)=>this.setState({
                    nick_name: text
                })}/>
                <View style={styles.space}></View> 
                <View style={styles.checkBox_View}>
                    <CheckBox text="我已经阅读并同意《用户服务协议》" isClick={true}/>
                </View>
            </View>
        )
    }

    render(){

        var registerView = this.state.display == 'none' ? null : this.renderRegisterView();

        return (
            <KeyboardAvoidingView style={styles.container} behavior="position">
            <ProgressBar ref='progress'/>
            <Toast ref="toast"/>
            
            <StatusBar backgroundColor='rgb(120,154,249)' />
            <Image style={styles.icon} source={require('./../../images/login_top.jpg')} />
            
            <View style={styles.content_view}>
                <EditText style={styles.edit} placeholder='手机号码' 
                    onChangeText={(text)=>this.setState({
                        phone: text
                    })}/>
                <View style={styles.space}></View>
                <View style={styles.sms}>
                    <EditText style={styles.sms_input} placeholder='短信验证码' onChangeText={(text)=>this.setState({
                        sms: text
                    })}/>
                    <TouchableOpacity onPress={()=>{
                        
                        let reuslt = loginSerivce.checkSms(this.state.phone)
                        if(reuslt.code == 1){
                            this.refs.progress.setModalVisible(true);                     
                            loginSerivce.getSms({...this.state}, this.getSMS.bind(this));
                        }else{
                            this.refs.toast.show(reuslt.msg);
                        }
                        
                        
                    }}>
                    <Text style={styles.sms_yaoqing}>获取验证码</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.space}></View>

                {registerView}
                {/* <EditText style={[styles.edit,this.state.display]} placeholder='邀请码' onChangeText={(text)=>this.setState({
                    code: text
                })}/>
                <View style={[styles.space, this.state.display]}></View>
                <EditText style={[styles.edit,this.state.display]} placeholder='昵称' onChangeText={(text)=>this.setState({
                    nick_name: text
                })}/>
                <View style={[styles.space, this.state.display]}></View> 
                <View style={[styles.checkBox_View, this.state.display]}>
                    <CheckBox text="我已经阅读并同意《用户服务协议》" isClick={true}/>
                </View> */}

                <Button isH={true} text="开启时光门" onPress={()=>{

                    this.loginOrRegisterClick();

                    
                }}/>
                
            </View>

           
            </KeyboardAvoidingView>
        )
    }

    loginOrRegisterClick(){       
        if(this.state.display == 'none'){
            let result = loginSerivce.checkLogin(this.state.phone, this.state.sms);                                      
            if(result.code == 1){  
                this.refs.progress.setModalVisible(true);                     
                loginSerivce.login({...this.state}, this.registerCallBack.bind(this));
            }else{
                this.refs.toast.show(result.msg);
            }
        }else{
            let result = loginSerivce.checkRegisterParams(this.state.phone, this.state.sms, this.state.nick_name);                                      
            if(result.code == 1){  
                this.refs.progress.setModalVisible(true);                     
                loginSerivce.register({...this.state}, this.registerCallBack.bind(this));
            }else{
                this.refs.toast.show(result.msg);
            }
        }

        
    }


    registerCallBack(data){
        this.refs.progress.setModalVisible(false);
        if(null == data){

        }else {
            if(data.status == config.SUCCESS){
                global.user = data.data;
                Storage._sava('user', data.data);

                this.props.navigation.dispatch(resetAction);
            }else{
                this.refs.toast.show(data.msg);
            }
        }
    }

    getSMS(data){
        this.isClick = false;
       
        this.refs.progress.setModalVisible(false);
        if(null == data){
            this.refs.toast.show('发送请求失败');
        }else{
            if(data.status == config.SUCCESS){
                this.refs.toast.show('发送请求成功');
                if(data.data){                    
                    // alert(data.data.isUser);
                    let isHaveUser = JSON.parse(data.data);
                    
                    if(isHaveUser.isUser == 0){//新用户注册
                        this.setState({
                            display:'flex'
                        });
                    }else if(isHaveUser.isUser == 1){//老用户登录
                        this.setState({
                            display:'none'
                        });
                    } 
                }                              
            }else{
                this.refs.toast.show(data.msg);
            } 
        }
       
    }


}
const styles = StyleSheet.create({
    container: {  
      alignItems: 'center',
      backgroundColor: config.white_color
    },
    icon:{
        width: width,
        height: height * 0.35
    },
    content_view:{
        width: width,
        height: height * (1 - 0.35),
        alignItems:'center'
    },
    edit:{
        width: width * 0.85, padding: 2, fontSize: 13, marginTop: 15, height:40
    },
    space:{
        width: width * 0.85, height: 1 * config.pixel, backgroundColor: config.space_color
    },
    checkBox_View:{
        width: width * 0.85, marginTop: 15
    },
    sms:{
        width: width * 0.85, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',marginTop: 15
    },
    sms_input:{
        width: width * 0.65, fontSize: 13, height:40
    },
    sms_yaoqing:{
      fontSize: 13,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      padding: 8,
      color: config.blue_color,
      backgroundColor: 'transparent',
      borderRadius: 20,
      borderColor:config.blue_color,
      borderWidth: 1 * config.pixel
    }
});
