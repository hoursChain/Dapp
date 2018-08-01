import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import config from '../../config';
import sytleUtil from '../StyleUtils';
import BlueButton from '../../component/T_Blue_Button';
import * as walletManager from '../../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';
import Progress from '../../component/T_ProgressBar';
import Storage from '../../storage';

import StatusBar from '../../component/T_StatusBar';

export default class UpdatePassWord extends Component{

    constructor(props){
        super(props);
        this.state = {
            pass:'',
            old:'',
            privateKey: this.props.private_key
        }
    }

    render(){
        return(
            <View style={[sytleUtil.container, sytleUtil.whiteBackgroundColor]}>
            <StatusBar />
                <View style={[styles.space, sytleUtil.space]}></View>
                <TextInput value={this.state.old} onChangeText={(text)=>{this.setState({old: text})}} style={{marginTop: 10, width: config.width * 0.9, height: 35, padding:0}} placeholder='密码' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                <View style={[styles.space_sub, sytleUtil.space]}></View>
                <TextInput value={this.state.pass} onChangeText={(text)=>{this.setState({pass: text})}} style={{marginTop: 10, width: config.width * 0.9, height: 35, padding:0}} placeholder='新密码' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                <View style={[styles.space_sub, sytleUtil.space]}></View>
                <View style={{flexDirection:'row', width: config.width * 0.9, marginTop: 10}}>
                <Text style={{color: '#999999',fontSize: 12
            }}>忘记密码？导入助记词或私钥可重置密码</Text>
                <TouchableOpacity onPress={()=>{Actions.push('ImportWallet');}}>
                <Text style={{color:config.blue_color,fontSize: 12}}>马上导入</Text>
                </TouchableOpacity>
                </View>
                <BlueButton txtColor={config.white_color} title='更新' onPress={()=>{
                    this.updatePass();
                }}/>
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View>
        );
    }


    updatePass(){
        if(this.verification()){
            this.refs.progress.setModalVisible(true);
            walletManager.updatePassWord(this.state, (data)=>{
                if(data){
                    this.refs.progress.setModalVisible(false);
                    if(config.WALLET_SUCCESS == data.error){
                        this.refs.toast.show('更新成功');
                        Actions.pop();
                    }else{                       
                        this.refs.toast.show(data.message);
                    }
                }else{
                    this.refs.progress.setModalVisible(false);
                    this.refs.toast.show('服务器忙，稍后在试');
                }
            });
        }
    }

    verification(){
        if(!this.state.privateKey){
            this.refs.toast.show('缺少必要参数')
            return false;
        }
        if(this.state.old < 6){
            this.refs.toast.show('密码格式错误')
            return false;
        }
        if(this.state.pass < 6){
            this.refs.toast.show('密码最短6位')
            return false;
        }
        return true;
    }
}
const styles = StyleSheet.create({
    space:{
        width: config.width,
        marginBottom: 20,
    },
    space_sub:{
        width: config.width * 0.9,
      
    }
});