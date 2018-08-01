import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Clipboard
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import config from '../../config';
import sytleUtil from '../StyleUtils';
import BlueButton from '../../component/T_Blue_Button';
import Alert from '../../component/T_Alert';
import * as walletManager from '../../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';
import Progress from '../../component/T_ProgressBar';
import Storage from '../../storage';
import * as encryption from '../../utils/encryption';

import StatusBar from '../../component/T_StatusBar';

export default class WalletDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            password: '',
            private_pass:''
        }
    }


    render(){     
        return(
            <View style={sytleUtil.container}>
            <StatusBar />
            <View style={[sytleUtil.space, styles.space]}></View>
            <View style={[sytleUtil.whiteBackgroundColor, styles.top_content]}>
                <Image style={styles.top_icon_style}  source={require('./../../../images/150_logo_shaow.png')}/>
                <Text style={[styles.top_wallet_txt,{fontSize: 16, fontWeight: 'bold',}]}>{this.props.eth} ETH</Text>
                <Text style={[styles.top_wallet_txt, {fontSize: 14, fontWeight: 'bold',}]}>{this.props.address}</Text>
            </View>
            <View style={[sytleUtil.whiteBackgroundColor, styles.top_content, {marginTop: 10, alignItems:'flex-start'}]}>
                <Text style={[styles.wallet_name_txt, {marginBottom: 10}, {fontSize: 12,}]}>钱包名</Text>
                <Text style={[styles.wallet_name_txt, {marginBottom: 6}, {fontSize: 12,}]}>{this.props.title}</Text>
                <View style={[sytleUtil.space,{width: config.width - 20}]}></View>
                <TouchableOpacity style={styles.space} onPress={()=>{
                    Actions.updatePassWord({...this.props});
                }}>
                <Text style={[styles.wallet_name_txt, {marginTop: 10}, {fontSize: 12,}]}>修改密码</Text>
                </TouchableOpacity>
            </View>
            <View style={[sytleUtil.whiteBackgroundColor, styles.top_content, {marginTop: 10, alignItems:'flex-start'}]}>
                <TouchableOpacity style={styles.space} onPress={()=>{
                    this.setState({
                        password:''
                    });
                    this.refs.private.setModalVisible(true);
                }}>
                <Text style={[styles.wallet_name_txt, {marginBottom: 6}, {fontSize: 12,}]}>导出私钥</Text>
                </TouchableOpacity>
                <View style={[sytleUtil.space,{width: config.width - 20}]}></View>
                <TouchableOpacity style={styles.space} onPress={()=>{
                     this.setState({
                        password:''
                    });
                    this.refs.privatekey.setModalVisible(true);
                }}>
                <Text style={[styles.wallet_name_txt, {marginTop: 10}, {fontSize: 12,}]}>导出KeyStore</Text>
                </TouchableOpacity>
            </View>
            <Alert change={(text)=>{this.setState({password: text})}} ref='privatekey' mode='password' confirm={()=>{
                setTimeout(() => {
                    this.exportKeyStore();
                }, 10);
            }}/>
            <Alert change={(text)=>{this.setState({password: text})}} ref='private' mode='password' confirm={()=>{
                setTimeout(() => {          
                   this.exportPrivateKey();
                }, 10);
            }}/>
            <Alert txt={this.state.private_pass} ref='message' mode='message' copy={()=>{Clipboard.setString(this.state.private_pass);this.refs.toast.show('复制成功')}}/>
            <Toast ref='toast'/>
            <Progress ref='progress' />
            </View>
        );
    }


    
    /**
     * 到处私钥
     */
    exportPrivateKey(){
        if(this.verification()){
            this.refs.progress.setModalVisible(true);
            walletManager.exportPrivateKey({password: this.state.password, private_key: this.props.private_key},(result)=>{
                this.refs.progress.setModalVisible(false);
                if(result){    
                    if(config.WALLET_SUCCESS == result.error){

                        this.setState({
                            private_pass: encryption.mysendJIEmi(result.data)
                        });

                        setTimeout(()=>{
                            this.refs.message.setModalVisible(true);
                        }, 500)

                    }else{
                        this.refs.toast.show(result.message);
                    }
                }else{                    
                    this.refs.toast.show('服务器有点忙，稍后再试');
                }
            });
        }
    }

    /**
     * 到处keyStore
     */
    exportKeyStore(){
        if(this.verification()){
            this.refs.progress.setModalVisible(true);
            walletManager.exportKeyStore({password: this.state.password, private_key: this.props.private_key}, (data)=>{
                this.refs.progress.setModalVisible(false);
                if(data){
                    if(config.WALLET_SUCCESS == data.error){
                        let params = encryption.mysendJIEmi(data.data);
                        Actions.exportKeyStore({keyStore: params});
                    }else{
                        this.refs.toast.show(data.message); 
                    }
                }else{                    
                    this.refs.toast.show('服务器有点忙，稍后再试');
                }
            });
        }
    }


    verification(){
        if(this.state.password<=0){
            this.refs.toast.show('请输入密码')
            return false;
        }
        return true;
    }



}
const styles = StyleSheet.create({
    space:{
        width: config.width
    },
    top_content:{
        width: config.width,
        alignItems: 'center',
        padding: 10,
    },
    top_icon_style:{
        width: 70,
        height: 70,
        marginTop: 10,
        marginBottom: 10,
    },
    top_wallet_txt:{
        color: config.black_color,
        fontSize: 15,
        marginBottom: 10
    },
    wallet_name_txt:{
        color: config.black_color,
        fontSize: 14
    }
});

