import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Text from '../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../config';
import SytleUtils from './StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../component/T_ProgressBar';
import Toast from 'react-native-easy-toast';


const top_heigh = (config.height * 0.45 - 75) > 141 ? config.height * 0.45 - 75 : 200;
const margin = Platform.select({
    ios:{
        marginTop: (config.height * 0.45 - 75) > 141 ? 40 : 80
    },
    android:{
        marginTop: 30
    }
})


/**
 *  APP 我的
 */
export default class Find extends Component{
    constructor(props){
      super(props);
      this.state = {

      }
      this.menuList = [
        {
          image:require('./../../images/sigin.png'),
          name: '签到',
          image2:require('./../../images/renwu.png'),
          name2: '任务',
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
                            <Text style={[styles.text_style, {fontSize: 17, fontWeight: 'bold',}]}>发现</Text>
                        </View>
                        <View style={[SytleUtils.row_item,{height: config.height * 0.35 / 2, marginTop: 5,width:config.width * 0.9,justifyContent:'space-between', alignItems:'center'}]}>
                            
                            <View style={[SytleUtils.row_item,{alignItems:'center'}]}>
                              <Image style={{width: 70, height: 70}}  source={require('./../../images/100_logo-09.png')}></Image>
                              <View style={{marginLeft: 16}}>
                                <Text style={[styles.text_style, {fontSize: 16,}]}>{this.props.userName ? this.props.userName : ''}</Text>
                                <Text style={[styles.text_style, {fontSize: 14,}]}>{this.props.integral}积分</Text>
                              </View>
                            </View>
                            <TouchableOpacity onPress={()=>{
                                Actions.invitationCode();
                            }}>
                            <Image style={{width: 60, height: 30}} source={require('./../../images/fenxiang.gif')} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>               
                </View>
                <View style={[styles.top_content_bottom]}>
                        <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color }]}>
                            {listItem}
                        </View>
                    </View>
                <View style={margin}> 
                    <View style={[SytleUtils.card, {borderRadius: 0, width:config.width, backgroundColor: config.white_color }]}>
                        <TouchableOpacity onPress={()=>{Actions.medicalCommunity({'callback': this.props.callback})}} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row'}]}>
                            <View style={[styles.content_item_left]}>
                                <Image style={styles.icon} resizeMode='contain'  source={require('./../../images/shequ.png')}></Image>
                                <Text style={[styles.content_item_txt,{fontSize: 12}]}>医疗社区</Text>
                            </View>
                            <View style={styles.content_item_right}>
                                {/* <View><Text numberOfLines={1} style={[styles.content_item_right_txt,{fontSize:20}]}>0}</Text></View> */}
                                {/* <View><Text style={styles.content_item_right_txt}>≈ ¥ 0</Text></View> */}
                            </View>
                        </TouchableOpacity>
                        {/* <View style={[SytleUtils.space, {width: config.width * 0.9}]}></View> 
                        <TouchableOpacity onPress={()=>{Actions.webMessage({title: '答题游戏', uri: config.base_url + config.hour_questionnaire})}} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row'}]}>
                            <View style={[styles.content_item_left]}>
                                <Image style={styles.icon} resizeMode='contain'  source={require('./../../images/game.png')}></Image>
                                <Text style={[styles.content_item_txt,{fontSize: 12}]}>答题游戏</Text>
                            </View>
                            <View style={styles.content_item_right}>
                                <View><Text numberOfLines={1} style={[styles.content_item_right_txt,{fontSize:20}]}>0}</Text></View>
                                <View><Text style={styles.content_item_right_txt}>≈ ¥ 0</Text></View>
                            </View>
                        </TouchableOpacity> */}

                        
                    </View>                
                   
                   
                </View>
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View> 
        );
      }



      renderItem(item, index){
         return(
            <View key={index} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row', alignItems: 'center', borderBottomColor:config.space_color, borderBottomWidth: 1 * config.pixel}]}>
                <TouchableOpacity onPress={()=>{Actions.signIn({integral: this.props.integral, callback: this.props.callback})}} style={{ borderRightWidth: 1 * config.pixel, borderRightColor: config.space_color, padding: 8, flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width: 20, height: 20,marginRight: 8}} resizeMode='contain'  source={item.image}></Image>
                    <Text style={[styles.top_content_bottom_view_text,{fontSize:16}]}>{item.name}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{Actions.mission({integral: this.props.integral, callback: this.props.callback})}} style={{padding: 8, flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width: 20, height: 20,marginRight: 8}} resizeMode='contain'  source={item.image2}></Image>
                    <Text style={[styles.top_content_bottom_view_text,{fontSize:16}]}>{item.name2}</Text>
                </TouchableOpacity>
            </View>
         );
      }

}

const styles = StyleSheet.create({
  top_content:{
      height: config.height * 0.35,
      alignItems:'center'
  },
  top_content_top:{
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
      width: 30,
      height: 30
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