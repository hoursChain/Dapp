import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Text from '../../component/T_Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import CheckBox from '../../component/T_CheckBox';
import BlueButton from '../../component/T_Blue_Button';
import * as walletManager from '../../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressBar from '../../component/T_ProgressBar';
import * as encryption from '../../utils/encryption';

import StatusBar from '../../component/T_StatusBar';
/**
 * 创建钱包第一个界面获取昵称密码
 */
export default class CreateWalletOne extends Component{

    constructor(props){
        super(props);
        this.state = {
            nickName: '',
            passWord: '',
            rePassWord:'',
            isPassWord: true,
            isRePassWord: true
        }
    }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar />
                <KeyboardAwareScrollView> 
                <View style={styles.top_content}>
                    <Text style={styles.top_content_txt}> ○ 密码用于保护私钥和交易授权，强度非常重要</Text>
                    <Text style={styles.top_content_txt}> ○ HOUR不存储密码，请务必牢记</Text>
                </View>
                
                <View style={styles.content}>
                <TextInput value={this.state.nickName} onChangeText={(text)=>{this.setState({nickName: text})}} style={{width: config.width * 0.9, height: 35, padding:0}} placeholder='钱包名称' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                <View style={styles.space}></View>
                <View style={{width: config.width * 0.9, height: 35,marginTop: 4, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TextInput secureTextEntry={this.state.isPassWord} value={this.state.passWord} onChangeText={(text)=>{this.setState({passWord: text})}} style={{width: config.width * 0.7, height: 35, padding:0}} placeholder='密码' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                    <TouchableOpacity onPress={()=>{this.setState({isPassWord:!this.state.isPassWord})}}><Image style={{width: 15, height: 15, marginRight: 10}} source={this.state.isPassWord ? require('./../../../images/eye_close.png') : require('./../../../images/eye_open.png')} /></TouchableOpacity>
                </View>
                <View style={styles.space}></View>
                <View style={{width: config.width * 0.9, height: 35,marginTop: 4, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TextInput secureTextEntry={this.state.isRePassWord} value={this.state.rePassWord} onChangeText={(text)=>{this.setState({rePassWord: text})}} style={{width: config.width * 0.7, height: 35, padding:0}} placeholder='重复密码' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                    <TouchableOpacity onPress={()=>{this.setState({isRePassWord:!this.state.isRePassWord})}}><Image style={{width: 15, height: 15, marginRight: 10}} source={this.state.isRePassWord ? require('./../../../images/eye_close.png') : require('./../../../images/eye_open.png')} /></TouchableOpacity>
                </View>
                <View style={styles.space}></View>
                
               

                <View style={[styles.content, {width: config.width * 0.9,alignItems:'center', flexDirection:'row'}]}>
                <CheckBox ref='isClick' isClick={true} text='我已阅读'/>
                    <TouchableOpacity onPress={()=>{
                        Actions.webMessage({'title':'服务协议', 'uri': config.base_url + config.hour_app_serviceAgreement_html})
                    }}>
                    <Text style={{color:config.blue_color, fontSize: 13,}}>服务及隐私条款</Text>
                    </TouchableOpacity>
                </View>
    
                <BlueButton title='创建钱包' txtColor={config.white_color}  onPress={()=>{                   
                    this.createWallet();   
                    
                    // let s = 'U2FsdGVkX18w2YSymc6cOK4jCBRYs34loTikE5B5WrdtQa25vzLDEFpJ9GVh+vTtkYqUAYRP+GN7E0mHhGKaQUNe4upSu3SqxDXhmmAgPz8cZCCzDA+4+YnzqNQn0beM';

                    // alert(encryption.mysendJIEmi(s));


                }} style={[styles.content, {backgroundColor: config.blue_color, padding: 8, borderRadius: 5}]}>
                </BlueButton>
                

                <BlueButton title='导入钱包' backgroundColor='transparent' txtColor={config.blue_color} onPress={()=>{
                    Actions.push('ImportWallet');
                }} style={[styles.content, {backgroundColor: 'transparent', padding: 8, borderRadius: 5}]}>
                </BlueButton>

                </View>
                </KeyboardAwareScrollView>
                <Toast ref='toast' />
                <ProgressBar ref='progress' />
            </View>
            
        );
    } 
    
    createWallet(){
        if(this.state.passWord != this.state.rePassWord){
            this.refs.toast.show('密码不一致');
            return;
        }
        if(!this.refs.isClick.isClick()){
            this.refs.toast.show('请同意服务及隐私条款');
            return;
        }
        if(walletManager.checkNickNameAndPassWord(this.state.nickName, this.state.passWord)){
            this.refs.progress.setModalVisible(true);
            walletManager.createWallet(this.state.nickName, this.state.passWord, (data)=>{
                this.refs.progress.setModalVisible(false);
                if(data){
                    if(config.WALLET_SUCCESS == data.error){
                        Actions.createWalletTwo({'wallet': data.data});
                    }else{
                        this.refs.toast.show(data.message);
                    }
                }else{
                    this.refs.toast.show('服务器有点忙，稍后再试');
                }
            })
        }else{
            this.refs.toast.show('钱包名和密码不能少于6位'); 
        }
    }

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: config.white_color,
        alignItems: 'center',
    },
    top_content:{
        width: config.width,
        backgroundColor: config.blue_color,
        padding: 8
    },
    top_content_txt:{
        color: config.white_color
    },
    content:{
        width: config.width,
        alignItems: 'center',
        marginTop: 10,
    },
    space:{
        width: config.width * 0.9,
        height: 1 * config.pixel,
        backgroundColor: config.space_color
    }
})