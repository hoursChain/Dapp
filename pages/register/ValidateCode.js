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
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import * as registerManager from '../../service/LoginService';
import Toast, {DURATION} from 'react-native-easy-toast';
import Storage from '../../storage';
import Progress from '../../component/T_ProgressBar';
/**
 * 注册或登录
 */
export default class ValidateCode extends Component{

    constructor(props){
        super(props);
        this.state = {
            validateCode:[],
            input1:'',
            input2:'',
            input3:'',
            input4:'',
            input5:'',
            input6:'',
            number: 60
        }
    }

    doitValidateCode(text){
        if(text.length > 0){
            this.setState({
                input1: text
            });
            this.refs.input2.focus();
        } 
        this.isNullData(text);     
    }

    doitValidateCode2(text){
        if(text.length > 0){
            this.setState({
                input2: text
            });
            this.refs.input3.focus();
        } 
        this.isNullData(text);
    }

    doitValidateCode3(text){
        if(text.length > 0){
            this.setState({
                input3: text
            });
            this.refs.input4.focus();
        }
        this.isNullData(text);
        
    }

    doitValidateCode4(text){
        if(text.length > 0){
            this.setState({
                input4: text
            });
            this.refs.input5.focus();
        } 
        this.isNullData(text);
    }

    doitValidateCode5(text){
        if(text.length > 0){
            this.setState({
                input5: text
            });
            this.refs.input6.focus();
        }
        this.isNullData(text); 
    }

    doitValidateCode6(text){
        if(text.length > 0){
            this.setState({
                input6: text
            });
        } 
        this.isNullData(text);
    }

    isNullData(text){
        if(text.length == 0){
            this.setState({
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:''
            })
            this.refs.input.focus();
        }
        setTimeout(()=>{
            this.isSendMessage();
        }, 50);
        
    }

    isSendMessage(){ 
        if(this.state.input1 != '' && this.state.input2 != '' && this.state.input3 != '' && this.state.input4 != '' && this.state.input5 != '' && this.state.input6 != ''){
            Keyboard.dismiss();
            setTimeout(()=>{
                this.refs.progress.show();
                let code =  this.state.input1 + this.state.input2 + this.state.input3 + this.state.input4 + this.state.input5 + this.state.input6;
                registerManager.register({'phone': this.props.phone, 'sms': code, 'whoInviteCode': this.props.code}, (data)=>{
                    this.refs.progress.hidden();
                    if(data){
                        if(data.code == config.SUCCESS){
                            global.user = data.data[0];
                            
                            Storage._sava(config.USER, global.user);

                            // setTimeout(()=>{                               
                            //     Actions.main({...global.user});   
                            // }, 100)

                            Storage._load(config.WALLET_ADDRESS, (data)=>{
                                
                                setTimeout(()=>{
                                    if(data){
                                        Actions.main({}); 
                                    }else{
                                        Actions.createWalletOne();
                                    }
                                }, 100)
                            })

                            
                        }else{
                            this.refs.toast.show(data.msg);
                        }
                    }else{
                        this.refs.toast.show('发送数据失败');
                    }
                })
            }, 50);         
        }
    }

    isClickData(){
        if(this.state.input1 == ''){
            this.refs.input.focus();            
        }else if(this.state.input2 == ''){
            this.refs.input2.focus(); 
        }else if(this.state.input3 == ''){
            this.refs.input3.focus(); 
        }else if(this.state.input4 == ''){
            this.refs.input4.focus(); 
        }else if(this.state.input5 == ''){
            this.refs.input5.focus(); 
        }else if(this.state.input6 == ''){
            this.refs.input6.focus(); 
        }
    }

    render(){
        let content_width = config.width * 0.9;
        let sub_code_width = content_width / 6 - 10;
        let sub_code_height = 4 / 3 * sub_code_width;

        let sendView = <View style={{width: content_width, flexDirection: 'row'}}><Text style={{width:content_width,color:'#666666', fontSize: 12, marginTop: 8}}>没有收到验证码？ 重新发送 {this.state.number}秒</Text></View>;
        if(this.state.number == 0){
            sendView = <TouchableOpacity onPress={()=>{this.sendPhone()}} style={{alignItems:'center', width: content_width, flexDirection: 'row'}}>
                        <Text style={{color:'#666666', fontSize: 12, marginTop: 8}}>没有收到验证码？</Text>
                        <Text style={{color: config.blue_color, fontSize: 12, marginTop: 8}}>重新发送</Text> 
                        </TouchableOpacity>;
        }


        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
                <StatusBar />
                <Progress ref='progress'/>
                <View style={[{width: config.width}, StyleUtils.space]}></View>
                <Text style={{width:content_width, color: config.black_color , fontSize: 16, marginTop: 20}}>输入验证码</Text>
                <Text style={{width:content_width,color:'#666666', fontSize: 12, marginTop: 8}}>验证码已发送至{this.props.phone}</Text>
            
                <View style={{marginTop: 10,  width: content_width, flexDirection: 'row', justifyContent:'space-around'}}>
                    <View style={{width: sub_code_width, height: sub_code_height, backgroundColor:'rgb(243, 243, 243)', justifyContent:'center', alignItems:'center'}}>
                    <TextInput value={this.state.input1} onChangeText={(text)=>{this.doitValidateCode(text)}} keyboardType='numeric' maxLength={1} autoFocus={true} ref='input' style={{textAlign:'center', width: sub_code_width, height: 35, padding:0, fontSize: 12}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                    </View>
                    <View style={{width: sub_code_width, height: sub_code_height, backgroundColor:'rgb(243, 243, 243)', justifyContent:'center', alignItems:'center'}}>
                    <TextInput value={this.state.input2} onChangeText={(text)=>{this.doitValidateCode2(text)}} ref='input2' keyboardType='numeric' maxLength={1} onFocus={()=>{this.isClickData()}} style={{textAlign:'center', width: sub_code_width, height: 35, padding:0, fontSize: 12}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                    </View>
                    <View style={{width: sub_code_width, height: sub_code_height, backgroundColor:'rgb(243, 243, 243)', justifyContent:'center', alignItems:'center'}}>
                    <TextInput value={this.state.input3} onChangeText={(text)=>{this.doitValidateCode3(text)}} ref='input3' keyboardType='numeric' maxLength={1} onFocus={()=>{this.isClickData()}} style={{textAlign:'center', width: sub_code_width, height: 35, padding:0, fontSize: 12}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                    </View>
                    <View style={{width: sub_code_width, height: sub_code_height, backgroundColor:'rgb(243, 243, 243)', justifyContent:'center', alignItems:'center'}}>
                    <TextInput value={this.state.input4} onChangeText={(text)=>{this.doitValidateCode4(text)}} ref='input4' keyboardType='numeric' maxLength={1} onFocus={()=>{this.isClickData()}} style={{textAlign:'center', width: sub_code_width, height: 35, padding:0, fontSize: 12}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                    </View>
                    <View style={{width: sub_code_width, height: sub_code_height, backgroundColor:'rgb(243, 243, 243)', justifyContent:'center', alignItems:'center'}}>
                    <TextInput value={this.state.input5} onChangeText={(text)=>{this.doitValidateCode5(text)}} ref='input5' keyboardType='numeric' maxLength={1} onFocus={()=>{this.isClickData()}} style={{textAlign:'center', width: sub_code_width, height: 35, padding:0, fontSize: 12}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                    </View>
                    <View style={{width: sub_code_width, height: sub_code_height, backgroundColor:'rgb(243, 243, 243)', justifyContent:'center', alignItems:'center'}}>
                    <TextInput value={this.state.input6} onChangeText={(text)=>{this.doitValidateCode6(text)}} ref='input6' keyboardType='numeric' maxLength={1} onFocus={()=>{this.isClickData()}} style={{textAlign:'center', width: sub_code_width, height: 35, padding:0, fontSize: 12}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                    </View>
                </View>



               {sendView}
                
                <Toast ref='toast'/>
            </View>
        );
    }


    componentDidMount() {
        this.sendPhone();
    }

    sendPhone(){
        
        this.setState({
             number: 60
        });

        let time = setInterval(()=>{
            let nn = --this.state.number;
            this.setState({
                number: nn
            })

            if(this.state.number == 0){
                clearInterval(time);
            }

        }, 1000);

        registerManager.getSms({'phone': this.props.phone}, (data)=>{
            if(data){
                if(data.code == config.SUCCESS){
                    this.refs.toast.show('短信请求已发出');
                }else{
                    this.refs.toast.show(data.msg);
                }
            }else{
                this.refs.toast.show('发送数据失败');
            }
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