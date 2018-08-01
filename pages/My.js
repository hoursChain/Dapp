import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, AppState, Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import StatusBar from '../component/T_StatusBar';
import config from '../config';
import SytleUtils from './StyleUtils';

import LinearGradient from 'react-native-linear-gradient';

import TabComponent from './../component/T_TabComponent';


//列表距离menu 距离
const marginTop = (Platform.OS == 'ios') ? (config.isIphoneX() ? 0 : 32) : 76;
//menu 距离 icon 距离
const nemuTop = (Platform.OS == 'ios') ? (config.isIphoneX() ? 170 : 150) : 130
/**
 * 我的
 */
export default class My extends Component{

    constructor(props){
        super(props);

        this.state = {
          
        }

        this.menuList = [
            {
                image:require('./../../images/3_14.png'),
                name: '数据资产'
            },
            {
                image:require('./../../images/3_17.png'),
                name: '账户设置'
            },
            {
                image:require('./../../images/3_26.png'),
                name: '我的钱包'
            },
            {
                image:require('./../../images/3_34.png'),
                name: '问题反馈'
            },
            // {
            //     image:require('./../../images/3_39.png'),
            //     name: '加入社区'
            // },
            // {
            //     image:require('./../../images/user_renzheng.png'),
            //     name: '认识星球'
            // },
            // {
            //   image:require('./../../images/user_renzheng.png'),
            //   name: 'HOUR用户认证'
            // },
            // {
            //   image:require('./../../images/user_message.png'),
            //   name: '个人信息'
            // },
            {
              image:require('./../../images/user_about.png'),
              name: '关于我们'
            }
          ];
    }

    render(){
        let listItem = [];

        this.menuList.map((item, index)=>{
            listItem.push(
              this.renderItem(item, index)
            )
        })
        
        return(
            
          <TabComponent colors={config.line_colors} backgroundColor={config.white_color}>   
          
                <View style={{flex: 3}}>        
                    <LinearGradient colors={config.line_colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{width: config.width, height: 150, paddingBottom: 15 ,backgroundColor: config.white_color}}>
                        <View style={[{paddingTop:8,width:config.width,flexDirection: 'row-reverse'}]}>
                            {/* <Image style={{width: 20, height: 20,marginRight: 16}} resizeMode='contain' source={require('./../../images/user_message_center.png')}></Image> */}
                        </View>
                        <View style={[{flexDirection: 'row',width:config.width, alignItems:'center', padding: 10}]}>                 
                            <Image style={{width: 70, height: 70, marginLeft:15}}  source={require('./../../images/100_logo-09.png')}></Image>
                            <View style={{marginLeft: 8}}>
                                <Text style={[{fontSize: 16, color: config.white_color}]}>{this.props.userName ? this.props.userName : ''}</Text>
                                <Text style={[{fontSize: 14, color: config.white_color}]}>原始用户</Text>
                            </View>  
                        </View> 
                    </LinearGradient>
                    
                </View>  
                <View style={[{flex: 7,marginTop: marginTop,paddingTop: 4, paddingBottom: 4, marginBottom: 16, alignItems:'center', backgroundColor: config.white_color,width: config.width}]}>
                    <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color}]}>
                        <ScrollView style={{width: config.width * 0.9}}>
                            {listItem}
                        </ScrollView>
                    </View>
                </View> 
                
                {/* 积分和算力界面 */}
                <View style={[SytleUtils.borderRadius, {padding: 4, flexDirection:'row', position:'absolute', top: nemuTop, left:0, marginLeft:config.width * 0.05 - 4,  width: config.width * 0.9 + 8, marginBottom:8}]}>
                    <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5 }]}>
                        <View key={0} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row', alignItems: 'center', borderBottomColor:config.space_color, borderBottomWidth: 1 * config.pixel}]}>
                            <View  style={{ borderRightWidth: 1 * config.pixel, borderRightColor: config.space_color, padding: 8, flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width: 20, height: 20,marginRight: 8}} resizeMode='contain'  source={require('./../../images/3_07.png')}></Image>
                                <Text style={[styles.top_content_bottom_view_text,{fontSize:16}]}>{this.props.integral ? this.props.integral : 0}</Text>
                            </View>
                                    
                            <View  style={{padding: 8, flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width: 20, height: 20,marginRight: 8}} resizeMode='contain'  source={require('./../../images/3_09.png')}></Image>
                                <Text style={[styles.top_content_bottom_view_text,{fontSize:16}]}>0</Text>
                            </View>
                        </View>
                    </View>
                </View>
          </TabComponent>  
          
        )
    }


    renderItem(item, index){
        return(
           <TouchableOpacity onPress={()=>{this.itemOnPress(item.name)}} key={index} style={[SytleUtils.cardItem,{justifyContent: 'space-between',flexDirection:'row', alignItems: 'center', borderBottomColor:config.space_color, borderBottomWidth: 1 * config.pixel}]}>
             <View style={[SytleUtils.row_item,{alignItems:'center', padding: 8}]}>
             <Image style={{width: 20, height: 20,marginRight: 8}} resizeMode='contain'  source={item.image}></Image>
               <Text style={[{color:config.black_color,fontSize: 16,fontSize:12}]}>{item.name}</Text>
             </View>
             {/* <Image style={{width: 10, height: 10}} resizeMode='contain'  source={require('./../../images/back_right_gray.png')}></Image> */}
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
            case '我的钱包':
               Actions.drawerOpen();
               break;
         }

     }

    

}

const top_heigh = (config.height * 0.45 - 75) > 141 ? config.height * 0.45 - 75 : 200;
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
