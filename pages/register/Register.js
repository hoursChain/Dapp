import React, {Component} from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native';
import Text from '../../component/T_Text';
import StatusBar from '../../component/T_StatusBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StyleUtils from '../StyleUtils';
import Storage from '../../storage';
import BlueButton from '../../component/T_Blue_Button';
import Progress from '../../component/T_ProgressBar';
/**
 * 注册或登录
 */
export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            yaoqingma:'',
            isRegister: true
        }
    }
    render(){
        let content_width = config.width * 0.9;

        let yqmView = this.state.isRegister ? this.renderYaoQingMa() : <View></View>;

        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor, {paddingTop: 50}]}>
                <StatusBar />
                <Text style={{width:content_width, color: config.black_color , fontSize: 16}}>{this.state.isRegister ? '注册' : '登录'}</Text>
                <TextInput value={this.state.phone} onChangeText={(text)=>{this.setState({phone: text})}} style={{marginTop: 10, width: content_width, height: 35, padding:0, fontSize: 12}} placeholder='请填写手机号码' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_width}, StyleUtils.space]}></View>

                {yqmView}

                <TouchableOpacity onPress={()=>{
                    this.setState({
                        isRegister: !this.state.isRegister
                    })
                }} style={{width:content_width,flexDirection:'row-reverse'}}>
                    <Text style={{textAlign:'right', fontSize: 12, color:config.blue_color, padding: 8}}>{this.state.isRegister ? '已经拥有账户去登录！' : '没用账户去注册！'}</Text>
                </TouchableOpacity>

                <BlueButton title='发送验证码' txtColor={config.white_color} onPress={()=>{this.sendPhone()}} width={content_width}/>

                <View style={{width: content_width, flexDirection:'row', marginTop: 10}}>
                <Text style={{color:config.black_color, fontSize: 12}}>您已经阅读并同意Hour的</Text>
                <TouchableOpacity onPress={()=>{
                    Actions.webMessage({'title':'服务协议', 'uri': config.base_url + config.hour_app_serviceAgreement_html})
                }}>
                    <Text style={{color:config.black_color, fontSize: 12, color: config.blue_color}}>隐私和服务协议</Text>
                </TouchableOpacity>
                </View>
                

                <Progress ref='progress' />
                <Toast ref='toast'/>
            </View>
        );
    }

    renderYaoQingMa(){
        let content_width = config.width * 0.9;
        return(
            <View>
                <TextInput value={this.state.yaoqingma} onChangeText={(text)=>{this.setState({yaoqingma: text})}} style={{marginTop: 10, width: content_width, height: 35, padding:0, fontSize: 12}} placeholder='请输入邀请码' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_width}, StyleUtils.space]}></View>
            </View>
        );
    }


    /**
     * 发送手机号到
     */
    sendPhone(){
        Keyboard.dismiss();
        setTimeout(()=>{
            if(this.state.isRegister){  
                if(this.validateMobile()) {
                    if(config.validateMobile(this.state.phone)){
                        Actions.validateCode({'phone': this.state.phone,'code': this.state.yaoqingma});
                    }else{      
                        this.refs.toast.show('请输入正确的手机号');
                    }
                }                                   
            }else{
                if(config.validateMobile(this.state.phone)){
                    Actions.validateCode({'phone': this.state.phone});
                }else{      
                    this.refs.toast.show('请输入正确的手机号');  
                }
            }           
        }, 50);       
    }

    validateMobile(){
        if(this.state.yaoqingma.length > 6 || this.state.yaoqingma.length < 6){
            this.refs.toast.show('邀请码格式不正确');  
            return false;
        }
        return true;
    }

    componentDidMount() {      
        SplashScreen.hide();            
        this.loadUser();
    }

    loadUser(){
        this.refs.progress.show();
        Storage._load(config.USER, user=>{
            this.refs.progress.hidden();
            if(user){
                global.user = user;
                this.loadWalletAddress(); //原本必须创建一个钱包 现在可以先进入界面后 创建钱包
                // Actions.main({...global.user});   
            }else{
                this.refs.progress.hidden(); 
            }
        });
    }

    loadWalletAddress(){
        Storage._load(config.WALLET_ADDRESS, (data)=>{  
            this.refs.progress.hidden();                           
            setTimeout(()=>{
                if(data){
                    Actions.main({...global.user}); 
                }else{
                    Actions.createWalletOne();
                }
            }, 100)
        });
    }




    //组件将被卸载  
  componentWillUnmount(){ 
    //重写组件的setState方法，直接返回空
    this.setState = (state,callback)=>{
      return;
    };  
}
}