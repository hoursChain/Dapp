import React, { Component } from 'react';
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
import Storage from '../storage';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../config';
import StatusBar from '../component/T_StatusBar';
import SytleUtils from './StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../component/T_ProgressBar';
import * as walletManager from '../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';

const top_heigh = (config.height * 0.45 - 75) > 141 ? config.height * 0.45 - 75 : 200;
const margin = Platform.select({
    ios:{
        marginTop: (config.height * 0.45 - 75) > 141 ? 40 : 60
    },
    android:{
        marginTop: 30
    }
})

/**
 *  APP 我的
 */
export default class Mime extends Component{
    constructor(props){
      super(props);
      this.state = {

      }
      this.menuList = [
        {
          image:require('./../../images/user_renzheng.png'),
          name: 'HOUR用户认证'
        },
        {
          image:require('./../../images/user_message.png'),
          name: '个人信息'
        },
        // {
        //   image:require('./../../images/user_message_center.png'),
        //   name: '消息中心'
        // },
        {
          image:require('./../../images/user_about.png'),
          name: '关于我们'
        }
      ];


    }
    render() {
        let listItem = [];

        this.menuList.map((item, index)=>{
            listItem.push(
              this.renderItem(item, index)
            )
        })


        return (
          <View style={SytleUtils.container}>
                
                <View style={styles.top_content}>
                    <LinearGradient colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)',]} style={styles.top_content_top}>
                        <View style={[styles.top_row_style,SytleUtils.header]}>
                            <Text style={[styles.text_style,{fontSize: 17, fontWeight: 'bold',}]}>个人中心</Text>
                        </View>
                        <View style={[SytleUtils.row_item,{height: config.height * 0.35 / 2, marginTop: 10,width:config.width * 0.9,justifyContent:'space-between', alignItems:'center'}]}>
                            <View style={[SytleUtils.row_item,{alignItems:'center'}]}>
                              <Image style={{width: 70, height: 70}}  source={require('./../../images/100_logo-09.png')}></Image>
                              <View style={{marginLeft: 8}}>
                              <Text style={[styles.text_style,{fontSize: 16}]}>{this.props.userName ? this.props.userName : ''}</Text>
                              <Text style={[styles.text_style, {fontSize: 14}]}>{global.user.integral}积分</Text>
                              </View>
                            </View>
                            <Image style={{width: 10, height: 20}} resizeMode='contain'  source={require('./../../images/back_right_white.png')}></Image>
                        </View>
                    </LinearGradient>               
                </View>
                <View style={[styles.top_content_bottom]}>
                        <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color }]}>
                            {listItem}
                        </View>
                    </View>
                {/* <View style={{marginTop: 40}}> 
                    <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color }]}>
                        <View style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row'}]}>
                            <View style={[styles.content_item_left]}>
                                <Image style={styles.icon} resizeMode='contain'  source={require('./../../images/ETH.png')}></Image>
                                <Text style={styles.content_item_txt}>ETH</Text>
                            </View>
                            <View style={styles.content_item_right}>
                                <View><Text numberOfLines={1} style={[styles.content_item_right_txt,{fontSize:20}]}>{this.props.wallet.eth ? this.props.wallet.eth : 0}</Text></View>
                                <View><Text style={styles.content_item_right_txt}>≈ ¥ 0</Text></View>
                            </View>
                        </View>
                        <View style={[SytleUtils.space, {width: config.width * 0.9}]}></View>
                        <View style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row'}]}>
                        <View style={styles.content_item_left}>
                            <Image style={styles.icon}  source={require('./../../images/100_logo-09.png')}></Image>
                            <Text style={styles.content_item_txt}>HOUR</Text>
                        </View>
                        <View style={styles.content_item_right}>
                            <View><Text numberOfLines={1} style={[styles.content_item_right_txt,{fontSize:20}]}>{this.props.wallet.hour ? this.props.wallet.hour : 0}</Text></View>
                            <View><Text style={styles.content_item_right_txt}>≈ ¥ 0</Text></View>
                        </View>
                   </View>
                    </View>                
                   
                   
                </View> */}
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View> 
        );
      }

      renderItem(item, index){
         return(
            <TouchableOpacity onPress={()=>{this.itemOnPress(item.name)}} key={index} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row', alignItems: 'center', borderBottomColor:config.space_color, borderBottomWidth: 1 * config.pixel}]}>
              <View style={[SytleUtils.row_item,{alignItems:'center', padding: 8}]}>
              <Image style={{width: 20, height: 20,marginRight: 8}} resizeMode='contain'  source={item.image}></Image>
                <Text style={[styles.top_content_bottom_view_text,{fontSize:12}]}>{item.name}</Text>
              </View>
              <Image style={{width: 10, height: 10}} resizeMode='contain'  source={require('./../../images/back_right_gray.png')}></Image>
            </TouchableOpacity>
         );
      }

      itemOnPress(item){
          switch(item){
            case 'HOUR用户认证':
                Actions.realNameAuthentication();
                break;
            case '个人信息':
                Actions.personalInformation({callback: this.props.callback});
                break;
            case '消息中心':
                Actions.messageCenter();
                break;
            case '关于我们':
                Actions.about();
                break;
          }

      }

}

const styles = StyleSheet.create({
  top_content:{
      height: config.height * 0.35,
      alignItems:'center'
  },
  top_content_top:{
      width:config.width,
      height: top_heigh,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      alignItems:'center'
  },
  space:{
      height: 1 * config.pixel,
      width: config.width - config.width * 0.05,
      marginLeft: config.width * 0.025,
      // backgroundColor:config.space_color
  },
  icon:{
      width: 40,
      height: 40
  },
  content:{
      elevation: 3,
      width: config.width - config.width * 0.05,
      marginLeft: config.width * 0.025,
      borderRadius: 5,
      padding: 6,
      backgroundColor: config.white_color,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  content_item_left:{
      flexDirection: 'row',
      alignItems: 'center'
  },
  content_item_txt:{
      color: config.black_color,
      fontSize: 16,
      marginLeft: 8
  },
  content_item_right:{
      alignItems: 'center',
      justifyContent: 'center'
  },
  content_item_right_txt:{
      textAlign:'right',
      color: config.black_color
  },
  bottom_content:{

  },
  text_style:{
      // fontFamily: '.萍方-简 细体',
      color:config.white_color, 
  },
  top_row_style:{
      padding:8,
      width:config.width,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  top_content_bottom:{
      width: config.width,
      position: 'absolute',
      top:top_heigh - (config.height / 10) / 2,
     
      alignItems: 'center',
      bottom: 10
  },
  top_content_bottom_view:{
      height: config.height / 10 * 0.8,
      backgroundColor: config.white_color,
      borderRadius: 5,
      width: config.width * 0.9,
      padding: 6,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
  },
  top_content_bottom_view_text:{
      color:config.black_color,
      fontSize: 16,
  },
  list_view:{
      width: config.width - config.width * 0.05,
      marginLeft: config.width * 0.025,
  }

});