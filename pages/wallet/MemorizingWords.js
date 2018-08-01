import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import config from '../../config';
import sytleUtil from '../StyleUtils';
import CheckBox from '../../component/T_CheckBox';
import BlueButton from '../../component/T_Blue_Button';
import * as walletManager from '../../service/welletService';
import Toast from '../../component/T_Toast';
import Progress from '../../component/T_ProgressBar';
import Storage from '../../storage';

/**
 * 助记词
 */
export default class MemorizingWords extends Component{

    constructor(props){
        super(props);
        this.state = {
            // zjc: 'wave illness exit surround anger couple deliver gesture story horror sudden this',//助记词
            key: "m/44'/60'/0'/0", //"m/44'/60'/0'",//
            name:'',//钱包名称
            pass:'',//密码
            zjc:''
        }
    }



    render(){
        return(
            <View style={[sytleUtil.container, sytleUtil.whiteBackgroundColor, styles.content_view]}>
                <ScrollView>
                <KeyboardAwareScrollView>
                <TextInput style={styles.textarea} value={this.state.zjc} onChangeText={(text)=>{this.setState({zjc: text})}}
                    multiline={true}
                    placeholder='助记词，空格分割'
                    placeholderTextColor='#999999'  
                    underlineColorAndroid="transparent"/>
                <TextInput editable={false} value={this.state.key} onChangeText={(text)=>{this.setState({key: text})}} style={{marginTop: 10, width: config.width * 0.9, height: 35, padding:0}} placeholder='' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                <View style={styles.space}></View>
                <TextInput value={this.state.name} onChangeText={(text)=>{this.setState({name: text})}} style={{marginTop: 10, width: config.width * 0.9, height: 35, padding:0}} placeholder='钱包名' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                <View style={styles.space}></View>
                <TextInput value={this.state.pass} onChangeText={(text)=>{this.setState({pass: text})}} style={{marginTop: 8, width: config.width * 0.9, height: 35, padding:0}} placeholder='密码' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                <View style={styles.space}></View>
                
                <View style={[{alignItems:'flex-start', width: config.width * 0.9, marginTop: 10}]}>
                <CheckBox ref='checkBox' isClick={true} text='我已阅读服务及隐私条款'/>
                </View>
                <BlueButton title='开始导入' txtColor={config.white_color}  onPress={()=>{
                    this.improtWallet();
                }} style={[styles.content, {backgroundColor: config.blue_color, padding: 8, borderRadius: 5}]}>
                </BlueButton>
                

                <BlueButton backgroundColor={config.white_color} title='什么是助记词' txtColor={config.blue_color} onPress={()=>{
                    Actions.webMessage({'title':'助记词', 'uri': config.base_url + config.hour_app_zjc_html})
                }} style={[styles.content, {backgroundColor: 'transparent', padding: 8, borderRadius: 5}]}>
                </BlueButton>
                </KeyboardAwareScrollView>
                </ScrollView>
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View>
        );
    }

    /**
     * 助记词导入钱包
     */
    improtWallet(){
        if(this.verification()){
            this.refs.progress.show();
            walletManager.importMemorizingWords(this.state,(data)=>{
                this.refs.progress.hidden();
                if(data){ 
                    if(config.WALLET_SUCCESS == data.error){
                        Storage._load(config.WALLET_ADDRESS, (address)=>{                           
                            if(address){
                                if(Array.isArray(address)){
                                    if(Array.isArray(address)){
                                        address.push(data.data);
                                        Storage._sava(config.WALLET_ADDRESS, address);  
                                    }
                                }
                            }else{
                                let array_wallet = [];
                                array_wallet.push(data.data);
                                Storage._sava(config.WALLET_ADDRESS, array_wallet);
                            }
                            this.refs.toast.show('钱包导入成功'); 
                            Actions.main();
                        })
                    }else{
                        setTimeout(()=>{this.refs.toast.show(data.message);}, 500);
                    }
                }else{
                    this.refs.toast.show('服务器忙，稍后再试');
                }
            });
        }
    }
    /**
     * 验证必要参数
     */
    verification(){
        if(this.state.zjc.length <= 10){
            this.refs.toast.show('请输入正确的助记词');
            return false;
        }
        if(this.state.name.length < 6){
            setTimeout(()=>{this.refs.toast.show('钱包名字最少需要6位');}, 50);
            
            return false;
        }
        if(this.state.pass.length < 6){
            this.refs.toast.show('钱包密码最少需要6位');
            return false;
        }
        if(this.state.key.length <= 0){
            this.refs.toast.show('缺少必要参数');
            return false;
        }
        if(!this.refs.checkBox.isClick()){
            this.refs.toast.show('请同意服务及隐私条款');
            return false;
        }
        return true;
    }


}

const styles = StyleSheet.create({
    content_view:{
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 20,
    },
    textarea:{
        width: config.width * 0.9,
        height: 100,
        padding: 8,
        textAlignVertical:'top',
        borderWidth: 1 * config.pixel,
        borderColor: '#999999',
        borderRadius: 8,
    },
    space:{
        width: config.width * 0.9,
        height: 1 * config.pixel,
        backgroundColor: config.space_color
    },
    content:{
        width: config.width * 0.9,
        alignItems: 'center',
        marginTop: 10,
    },
});
