import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Platform,
  TextInput,
  Keyboard
} from 'react-native';

import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import StyleUtils from '../StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import BlueButtom from '../../component/T_Blue_Button';
import * as encryption from '../../utils/encryption';
import * as mimeManager from '../../service/MimeService';

/**
 * HOUR用户认证
 */
export default class RealNameAuthentication extends Component{

    constructor(props){
        super(props);
        this.state = {
            idCard: '',
            money:'',
            flag: false,
            dataList:[]
        }
    }

    render(){
        let content_width = config.width * 0.9;
        let view = []

        if(this.state.dataList.length > 0){
            view.push(
                <Text key={-1} style={{color:'#333333', fontSize: 12, width: content_width, padding: 8}}>
                    以查询到您的资产信息{this.state.dataList.length}条
                </Text>
            );
            view.push(
                <View key={-2} style={{flexDirection:'row',justifyContent:'space-between',  width: config.width * 0.9, alignItems:'center',height: 40, paddingBottom: 4}}>               
                <Text style={{fontSize: 12, padding: 8}}>数量</Text>
                <Text style={{fontSize: 12, padding: 8}}>状态</Text>
                </View>
            );

            this.state.dataList.map((item, index)=>{
                view.push(this.renderMoney(item, index));
            })
        }


        
        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
                <StatusBar />
                <Text style={{color:'#333333', fontSize: 12, width: content_width, padding: 8}}>
                    Hours用户，输入身份证号码。可以让Hours来确认您的身份。并可以显示您名下的资产
                </Text>
                <TextInput value={this.state.idCard} keyboardType='numeric'
                onChangeText={(text)=>{
                    this.setState({idCard: text})
                }} 
                style={{borderWidth: 1 * config.pixel, borderColor:config.space_color, 
                textAlign:'center', marginTop: 10, width: content_width * 0.75,  
                padding:8, fontSize: 12}} placeholder='请填写您的身份证号' 
                placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                

                <BlueButtom title='提交' txtColor={config.white_color} onPress={()=>{                  
                    if(this.verification()){
                        this.idCardMessage();
                    }
                }}/>

                {view}
                
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View>
        )
    }

    idCardMessage(){
        this.refs.progress.show()
        mimeManager.idCardMessage(this.state.idCard, data=>{
            this.refs.progress.hidden()
            if(data){
                if(config.SUCCESS == data.code){
                    let array = data.data;
                    if(array.length > 0){
                        this.setState({
                            dataList: array
                        })
                    }else{
                        
                        this.refs.toast.show('认证成功');                     
                    }
                    
                }else if(304 == data.code){

                }else{
                    this.refs.toast.show(data.msg);
                }
            }else{
                this.refs.toast.show('服务器忙,稍后再试');
            }
        });       
    }


    componentDidMount(){
        this.idCardMessage();
    }

    /**
     * 
     */
    renderMoney(item, index){
        return(
            <View key={index} style={{flexDirection:'row',justifyContent:'space-between', width: config.width * 0.9, alignItems:'center',height: 40, paddingBottom: 4}}>               
                <Text style={{fontSize: 12, padding: 8}}>{item.hoursNum} HOR</Text>
                <Text style={{fontSize: 12, padding: 8}}>{item.dataTag == 1 ? '锁定' : '已发放'}</Text>
            </View>
        )
    }


    verification(){
        Keyboard.dismiss();
        if(this.state.idCard.length < 6){
            this.refs.toast.show('身份证号有错误');
            return false;
        }
        return true;
    }

}
