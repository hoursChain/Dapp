import React, {Component} from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    ListView,
    Platform
} from 'react-native';
import Text from '../component/T_Text';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../config';
import StatusBar from '../component/T_StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import StyleUtils from './StyleUtils';
import ImagePicker from 'react-native-image-picker';
import Alert from '../component/T_Alert';
import Progress from '../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import BlueButton from '../component/T_Blue_Button';

import ScrollView from '../component/T_ScrollView';

export default class Shop extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.menuList = [
          {
            image:require('./../../images/user_message.png'),
            name: '实名认证'
          },
          {
            image:require('./../../images/user_message.png'),
            name: '实名认证'
          },
          {
            image:require('./../../images/user_message.png'),
            name: '实名认证'
          },
          {
            image:require('./../../images/user_message.png'),
            name: '实名认证'
          }
        ];
  
  
      }


      render(){
          let imageWidth = config.width * 0.75 * 0.75;
          let imageHeight = 336 / 430 * imageWidth;
          
          return(
            <View style={[StyleUtils.container,StyleUtils.header, {alignItems:'center'}]}>
                <StatusBar />
                <View style={{width: config.width, backgroundColor: config.white_color, padding: 8,justifyContent:'center', alignItems:'center',height: (Platform.OS === 'ios') ? (config.isIphoneX() ? 64 : 44) : 34}}>
                    <Text style={{color:'#333333', fontSize: 17, fontWeight: 'bold', }}>积分商城</Text>
                </View>
                <View style={{width: config.width, backgroundColor: config.white_color, padding: 8,}}>
                    <Text style={{textAlign:'left', width: config.width * 0.9, color:'#333333', fontSize: 14}}>当前积分{global.user.integral}</Text>
                </View>
                <View style={{width: config.width, height: 140, backgroundColor: config.white_color,marginTop: 8}}>

                </View>
                <View style={{width: config.width, marginTop: 8, marginBottom: 8, padding: 8, backgroundColor: config.white_color}}>
                    <Text>AABBCC</Text>
                </View>
                <ScrollView>
                    <View style={{width: config.width, height: config.height * 2}}></View>
                </ScrollView>
            </View>
          )
      }

      /**
       * 商品分类
       */
      _renderSubType(){

      }

    //   /**
    //    * 商品
    //    */
    //   _renderSubTypeGoods(){

    //   }
      

}





