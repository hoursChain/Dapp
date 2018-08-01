import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Clipboard
} from 'react-native';
import Text from '../../component/T_Text';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import SytleUtils from '../StyleUtils';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as mimeManager from '../../service/MimeService';

/**
 * 邀请码
 */
export default class InvitationCode extends Component{

    constructor(props){
        super(props);
        this.state = {
            inviteCode:'',//邀请码
            oneProxySocre:'',
            twoProxySocre:'',
            oneProxy: 0,//一级积分
            twoProxy: 0,//二级积分
            isCopy: false
        }
    }

    render(){

      return(
            <View style={[SytleUtils.container]}>
                <StatusBar blue/>
                <Toast ref='toast' />
                <Progress ref='progress' />
                <View style={[{width: config.width, backgroundColor: config.blue_color, alignItems: 'center'}, SytleUtils.header,]}>

                      <Text style={{color: config.white_color, fontSize: 12, marginBottom: 5,marginTop: 15,}}>我的邀请码</Text>
                      <Text style={{color: config.white_color, fontSize: 20, marginBottom: 15,fontWeight: 'bold',}}>{this.state.inviteCode}</Text>
                      <TouchableOpacity onPress={()=>{
                          if(!this.state.isCopy){
                            Clipboard.setString(this.state.inviteCode);
                            this.refs.toast.show('复制成功');
                            this.setState({isCopy: true})
                          } 
                      }}>
                      <Text style={{textAlign:'center', padding: 4, width: 60, color: config.white_color, fontSize: 12, marginBottom: 10, borderRadius: 10, borderColor: config.white_color, borderWidth: 1 * config.pixel,}}>
                        {this.state.isCopy ? '已复制' : '复制'}
                      </Text>
                      </TouchableOpacity>
                </View>

                <View style={{flex: 1,width: config.width, marginTop: 8, marginBottom: 60, backgroundColor: config.white_color}}>
                    <View style={{marginTop:8, width: config.width, padding: 8, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                          <Image style={{width: 75, height: 15, marginRight: 6}} source={require('./../../../images/code_left.png')} />
                          <Text style={{fontSize: 16, fontWeight:'bold'}}>我的战绩</Text>
                          <Image style={{width: 75, height: 15, marginLeft: 6}} source={require('./../../../images/code_right.png')} />
                    </View>
                      

                    <View style={{marginTop:8, width: config.width, padding: 0, flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                          <View style={{width: config.width/2, padding: 4,alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize: 13}}>一级好友数{this.state.oneProxy}</Text>
                                <View style={{marginTop: 8,  padding:8, alignItems:'center', justifyContent:'center', backgroundColor: config.space_color, borderRadius: 8}}>
                                    <Text style={{fontSize: 12, color:'#333333'}}>一级好友数积分</Text>
                                    <Text style={{fontSize: 13}}>{this.state.oneProxySocre}</Text>
                                </View>
                          </View>

                          <View style={{width: config.width/2, padding: 4,alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize: 13}}>二级好友数{this.state.twoProxy}</Text>
                                <View style={{marginTop: 8,  padding:8, alignItems:'center', justifyContent:'center', backgroundColor: config.space_color, borderRadius: 8}}>
                                    <Text style={{fontSize: 12, color:'#333333'}}>二级好友数积分</Text>
                                    <Text style={{fontSize: 13}}>{this.state.twoProxySocre}</Text>
                                </View>
                          </View>
                    </View>

                    <View style={{marginTop:8, width: config.width,alignItems:'center', justifyContent:'center'}}>
                        <Text style={{width: config.width * 0.9,fontSize: 12, textAlign:'left',padding: 3}}>奖励规则</Text>
                        <Text style={{width: config.width * 0.9,fontSize: 12, textAlign:'left',padding: 3}}>每邀请一个用户成功注册，就会获取到邀请积分</Text>
                        <Text style={{width: config.width * 0.9,fontSize: 12, textAlign:'left',padding: 3}}>您邀请的好友，其邀请的好友完成注册。即二级好友</Text>
                        <Text style={{width: config.width * 0.9,fontSize: 12, textAlign:'left',padding: 3}}>Hour拥有法律范围内对活动的最终解释权</Text>
                    </View>
                </View>




                <LinearGradient colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)',]} 
                    style={{position:'absolute', width: config.width, height: 60, left: 0, bottom:0, padding: 8, alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{
                        Actions.mimieInvitationCode({...this.state});
                    }} style={{position:'absolute', width: config.width, height: 60, left: 0, bottom:0, padding: 8, alignItems:'center'}}>
                      <Text style={{color: config.white_color, fontSize: 14, marginBottom: 5,}}>生成邀请卡</Text>
                      <Text style={{color: config.white_color, fontSize: 12,}}>截图发给好友，并叮嘱其在注册时候填写邀请码</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
      )
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.refs.progress.show();
        mimeManager.getUserCode(data=>{
            this.refs.progress.hidden();
            if(data){
                if(config.SUCCESS == data.code){
                    let array = data.data;
                    if(array.length > 0){
                        let result = array[0];
                        this.setState({
                            ...result
                        })
                    }
                }else{
                    this.refs.toast.show(data.msg); 
                }
            }else{
                this.refs.toast.show('服务器忙请稍后再试');
            }
        });
    }
}