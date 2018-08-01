import React, {Component} from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as walletManager from '../../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';
import Progress from '../../component/T_ProgressBar';

import StatusBar from '../../component/T_StatusBar';
/**
 * 转账
 */
export default class TransferAccounts extends Component{

    constructor(props){
        super(props);
        this.state = {
            toAddress:'',//发送方地址
            money:'',//发送金额
            marker:'',//备注
            aotuGasPrice:'21000', //自定义GasPrice
            aotuGas:'21000',//自定义Gas
            privateKey:'',//私钥
            formPassWord:'',//密码
        }
        this.moneyTag = 0.000000011;
    }

    reLoad(nextProps){
        if(nextProps.value){
            if(nextProps.value != this.state.toAddress){
                this.setState({
                    toAddress: nextProps.value
                })
            }
        }
        // if(nextProps.toAddress && nextProps.money){
        //     if(nextProps.toAddress != this.state.toAddress){
        //         this.setState({
        //             toAddress: nextProps.toAddress
        //         })
        //     }
        //     if(nextProps.money != this.state.money){
        //         this.setState({
        //             money: nextProps.money
        //         })
        //     }
        // }
    }

    componentWillReceiveProps(nextProps){
        this.reLoad(nextProps);
    }


    render(){

        let content_widht = config.width * 0.9;
        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
            <StatusBar />
                <View style={[{width: config.width}, StyleUtils.space]}></View>
                <KeyboardAwareScrollView>
                <TextInput value={this.state.toAddress} onChangeText={(text)=>{this.setState({toAddress: text})}} style={{marginTop: 10, width: content_widht, height: 35, padding:0, fontSize: 12}} placeholder='收款人钱包地址' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_widht}, StyleUtils.space]}></View>
                <TextInput value={this.state.money} onChangeText={(text)=>{this.setState({money: text})}} style={{marginTop: 4, width: content_widht, height: 35, padding:0, fontSize: 12}} keyboardType='numeric' placeholder='转账金额' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_widht}, StyleUtils.space]}></View>
                <TextInput value={this.state.marker} onChangeText={(text)=>{this.setState({marker: text})}} style={{marginTop: 4, width: content_widht, height: 35, padding:0, fontSize: 12}} placeholder='备注' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_widht}, StyleUtils.space]}></View>
                {/* <TextInput style={{marginTop: 4, width: content_widht, height: 35, padding:0, fontSize: 12}} placeholder='自定义Gas Price' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_widht}, StyleUtils.space]}></View> */}
                <TextInput value={this.state.aotuGas} onChangeText={(text)=>{this.setState({aotuGas: text})}} 
                style={{marginTop: 4, width: content_widht, height: 35, padding:0, fontSize: 12}} 
                keyboardType='numeric' 
                placeholder='自定义Gas(21000-210000之间)' placeholderTextColor='#666666' underlineColorAndroid="transparent" />          
                <Text style={{width: content_widht,fontSize: 12, marginTop: 4, marginBottom: 4}}>大约消耗  {this.state.aotuGas * this.moneyTag}eth</Text>
                <View style={[{width: content_widht}, StyleUtils.space]}></View>
                <TextInput value={this.state.formPassWord} onChangeText={(text)=>{this.setState({formPassWord: text})}} style={{marginTop: 4, width: content_widht, height: 35, padding:0, fontSize: 12}} placeholder='密码' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                <View style={[{width: content_widht}, StyleUtils.space]}></View>

                {/* <TextInput style={styles.textarea} 
                    value={this.state.privateKey} 
                    onChangeText={(text)=>{this.setState({privateKey: text})}}
                    multiline={true}
                    placeholder='私钥'
                    placeholderTextColor='#666666'  
                    underlineColorAndroid="transparent"/> */}


                {/* <Text style={{color:config.blue_color, fontSize: 12, marginTop: 10, width: content_widht}}>如何设置参数</Text> */}

                <TouchableOpacity onPress={()=>{this.transferAccounts()}}
                    style={{width: content_widht, backgroundColor: config.blue_color, marginTop: 10, borderRadius: 5,padding: 8, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:config.white_color, fontSize: 12}}>确定转账</Text>
                </TouchableOpacity>
                </KeyboardAwareScrollView>
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View>
        );
    }

    /**
     *  发起交易 hour 存在hour交易，不存在发起eth交易
     */
    transferAccounts(){
        if(this.verification()){
            this.refs.progress.setModalVisible(true);
           if(this.props.hour){
                this.transferAccountsHour();
           }else{
                this.transferAccountsEth();
           }
        }
    }

    transferAccountsEth(){
        walletManager.transferAccountsEth(this.props.wallet, this.state, (data)=>{
            this.refs.progress.setModalVisible(false);
            if(data){
                this.toast(data.message);
                setTimeout(()=>{
                    Actions.pop();
                }, 500)
                
            }else{
                this.toast('服务器忙，请稍后测试');
            }
        });
    }

    transferAccountsHour(){
        walletManager.transferAccountsHour(this.props.wallet, this.state, (data)=>{
            this.refs.progress.setModalVisible(false);
            if(data){
                this.toast(data.message);
                setTimeout(()=>{
                    Actions.pop();
                }, 500)
            }else{
                this.toast('服务器忙，请稍后测试');
            }
        });
    }


    /**
     * 验证必要参数
     */
    verification(){

        if(this.state.toAddress.length <= 0){
            this.toast('请输入收款人钱包地址');
            return false;
        }
        if(this.state.money.length <= 0){
            this.toast('请输转账金额');
            return false;
        }
        if(this.state.aotuGas < 21000){
            this.toast('gas最小21000');
            return false;
        }

        if(this.state.aotuGas > 210000){
            this.toast('gas最大210000');
            return false;
        }

        if(this.state.formPassWord.length <= 0){
            this.toast('请输入密码');
            return false;
        }



        if(this.props.hour){
            this.verificationHour();
        }else{
            this.verificationEth();
        }

        return true;
    }
    /**
     * send_hor_from为发送方地址；
        send_hor_to为接收方地址，加密1发送；
        send_hor_amount为发送hor数量，单位为hor，加密1发送；send_hor_key为发送方地址对应私钥；
        send_hor_gas 为gas数量，加密1发送；
        send_hor_text为备注信息；
        send_hor_contract_addr为hor的合约地址（hor币为：0xd9dAC7b72472376b60b6aee9cfa2498ccCdCB2A7），加密1发送；
        send_hor_password为用户输入密码，加密1发送；
        send_hor_abi: hour abi
     */
    verificationHour(){

    }
    /**
         * send_eth_from为发送方地址；
         * send_eth_to为接收方地址，加密1发送；
         * send_eth_amount为发送eth数量，单位为eth，加密1发送；
         * send_eth_key为发送方地址对应私钥；
         * send_eth_gas为gas数量，加密1发送；
         * send_eth_text为备注信息；
         * send_eth_password为用户输入密码，加密1发送；
    */
    verificationEth(){
       
    }

    toast(message){
        this.refs.toast.show(message);
    }
}
const styles = StyleSheet.create({
    textarea:{
        fontSize: 12,
        width: config.width * 0.9,
        height: 100,
        padding: 8,
        textAlignVertical:'top',
        borderWidth: 1 * config.pixel,
        borderColor: config.space_color,
        borderRadius: 8,
        marginTop: 15,
    }
})