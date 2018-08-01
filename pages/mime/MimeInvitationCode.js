import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  ImageBackground
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import SytleUtils from '../StyleUtils';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as mimeManager from '../../service/MimeService';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode';

// let downUrl = (Platform.OS == 'android') ? 'http://www.hourschain.info/app/hours.apk' : 'http://www.hourschain.info/app/hours.apk';

/**
 * 我的邀请码
 */
export default class MimieInvitationCode extends Component{

    constructor(props){
        super(props);
        this.state = {
            downUrl:'http://www.hourschain.info/app/hours.apk'
        }
    }


    render(){
        return(
          <LinearGradient colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)',]} 
                    style={[{flex: 1,left: 0, bottom:0, padding: 8, alignItems:'center'}, SytleUtils.header]}>
                    <StatusBar blue/>
                <Text style={{color: config.white_color, fontSize: 32, marginBottom: 5,marginTop: 15,fontWeight: 'bold',}}>HOUR</Text>
                <Text style={{color: config.white_color, fontSize: 16, marginBottom: 5}}>带领您走进区块链新世界</Text>

            <ImageBackground source={require('./../../../images/code_bg.png')} resizeMode='cover'
            style={[{position:'absolute', left: config.width * 0.05, top: 100, bottom: 10, width: config.width * 0.9 , borderRadius: 8}]}>
                <View style={{flex: 1, alignItems:'center',}}>
                    <View style={{flex: 1,marginTop:8, padding: 8, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                          <Image style={{width: 75, height: 15, marginRight: 6}} source={require('./../../../images/code_left.png')} />
                          <Text style={{fontSize: 16, color:'#333333'}}>我的邀请码</Text>
                          <Image style={{width: 75, height: 15, marginLeft: 6}} source={require('./../../../images/code_right.png')} />
                    </View>
                    <View style={{flex: 2,marginTop:8, padding: 8, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                      <Text style={{color: config.blue_color, fontSize: 30,fontWeight: 'bold', textAlign:'center'}}>{this.props.inviteCode}</Text>
                   
                    </View>
                     <View style={{flex: 1,marginTop:8, padding: 8, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                          <Text style={{fontSize: 12,color:'#333333'}}>莫愁圈里无知己，天下谁人不识君</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <QRCode value={this.state.downUrl} size={130} bgColor={config.black_color} fgColor={config.white_color}/>
                </View>
            </ImageBackground>
            <Progress ref='progress'/>          
          </LinearGradient>
        )
    }


    componentWillMount(){
        this.getAPPUrl();
    }


    getAPPUrl(){
        // this.refs.progress.show();
        mimeManager.getAppUrl({},(Platform.OS == 'android') ? 'Android' : 'IOS', data=>{
            // this.refs.progress.hidden();
            if(data){
                if(30000 == data.code){
                    let array = data.data;
                    if(array && array.length > 0){
                        let result = array[0];
                        this.setState({
                            downUrl: result.url
                        })
                    }
                }
            }
        })
    }  
}