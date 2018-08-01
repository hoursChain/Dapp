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
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import TCheckBox from '../../component/T_CheckBox';
import Alert from '../../component/T_Alert';
import SelectView from '../../component/T_ScrollSelectView';
import SelectData from '../../component/T_SelectDate';
import BlueButton from '../../component/T_Blue_Button';

import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';

import Storage from '../../storage';
import * as mimeManager from '../../service/MimeService';

import StatusBar from '../../component/T_StatusBar';

/**
 * 个人信息
 */
export default class PersonalInformation extends Component{
    constructor(props){
        super(props);
        let date = new Date();

        let month = date.getMonth() + 1;
        let day =  date.getDate();
        month = month < 10 ? ('0'+month) : month;
        day = day < 10 ? ('0'+day) : day;


        this.state = {
            nickName: '',
            sex: 1, //1 男
            brithday: date.getFullYear() + '-' + month + '-' + day,
            hight: '100',
            weight: '50',
            isNvClick: true
        }
    }
    render(){
        let content_width = config.width * 0.9
        let isNv = this.state.sex == 2 ? true : false;



        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
            <StatusBar />
                <View style={[{width: config.width}, StyleUtils.space]}></View>
                <View style={{flexDirection: 'row', width:content_width, alignItems:'center', marginTop: 30}}>
                    <Text style={{fontSize: 14, color: config.black_color, width: 50, marginRight: 10}}>用户名:</Text>
                    <TextInput value={this.state.nickName} onChangeText={(text)=>{this.setState({nickName: text})}} style={{width: content_width - 60, padding:0, fontSize: 12, borderBottomWidth: 1 * config.pixel, borderColor: config.space_color}} placeholder='' placeholderTextColor='#666666' underlineColorAndroid="transparent" />
                </View>
                <View style={{flexDirection: 'row', width:content_width, alignItems:'center', marginTop: 20}}>
                    <View style={{flexDirection: 'row', width:50, alignItems:'center', marginRight: 10}}>
                       
                        <Text style={{fontSize: 14, color: config.black_color}}>性别:</Text>
                    </View>
                    
                    <View style={{paddingBottom:4, borderBottomWidth: 1 * config.pixel, borderColor: config.space_color, flexDirection: 'row', width: content_width - 60, alignItems:'center'}}>
                        <TCheckBox isClick={isNv} ref='nv' callback={()=>{
                            this.refs.nv.setClick(true);
                            this.refs.nan.setClick(false);

                            this.setState({
                                sex: 2
                            })

                        }} style={{marginRight: 6}} text='女'/> 
                        <TCheckBox isClick={!isNv} callback={()=>{
                            this.refs.nv.setClick(false);
                            this.refs.nan.setClick(true);

                            this.setState({
                                sex: 1
                            })
                        }} ref='nan' text='男'/>
                    </View>  
                </View>

                 <View style={{flexDirection: 'row', width:content_width, alignItems:'center', marginTop: 20}}>
                    <View style={{flexDirection: 'row', width:50, alignItems:'center', marginRight: 10}}>               
                        <Text style={{fontSize: 14, color: config.black_color}}>生日:</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{this.refs.birthday.setModalVisible(true)}} style={{paddingBottom:4, borderBottomWidth: 1 * config.pixel, borderColor: config.space_color, flexDirection: 'row', width: content_width - 60, alignItems:'center'}}>
                        <Text style={{fontSize: 14, color: '#666666'}}>{this.state.brithday}</Text>
                    </TouchableOpacity>  
                </View>


                 <View style={{flexDirection: 'row', width:content_width, alignItems:'center', marginTop: 20}}>
                    <View style={{flexDirection: 'row', width:50, alignItems:'center', marginRight: 10}}>
                        
                        <Text style={{fontSize: 14, color: config.black_color}}>身高:</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{this.refs.height.setModalVisible(true)}} style={{paddingBottom:4, borderBottomWidth: 1 * config.pixel, borderColor: config.space_color, flexDirection: 'row', width: content_width - 60, alignItems:'center'}}>
                        <Text style={{fontSize: 14, color: '#666666'}}>{this.state.hight}</Text>
                    </TouchableOpacity>  
                </View>


                 <View style={{flexDirection: 'row', width:content_width, alignItems:'center', marginTop: 20}}>
                    <View style={{flexDirection: 'row', width:50, alignItems:'center', marginRight: 10}}>
                       
                        <Text style={{fontSize: 14, color: config.black_color}}>体重:</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{this.refs.weight.setModalVisible(true)}} style={{paddingBottom:4, borderBottomWidth: 1 * config.pixel, borderColor: config.space_color, flexDirection: 'row', width: content_width - 60, alignItems:'center'}}>
                        <Text style={{fontSize: 14, color: '#666666'}}>{this.state.weight}</Text>
                    </TouchableOpacity>  
                </View>

                <BlueButton title='保存' txtColor={config.white_color} onPress={()=>{
                    this.userBaseMessage();
                }} width={content_width}  />
                   

                <Alert ref='height' mode='diy' component={<SelectView selectIndex={this.state.hight} itemHeight={40} startNum={60} endNum={230} width={50} result={data=>{
                    this.setState({
                        hight: data
                    })
                }}/>} />
                <Alert ref='weight' mode='diy' component={<SelectView selectIndex={this.state.weight} itemHeight={40} startNum={30} endNum={230} width={50} result={data=>{
                    this.setState({
                        weight: data
                    })
                }}/>} />
                <Alert ref='birthday' mode='diy' component={this.renderBirthday()} />

                <Toast ref='toast'/>
                <Progress ref='progress' />
            </View>
        );
    }

    isNv(){
        this.refs.nv.setClick(true);
        this.refs.nan.setClick(false);
    }

    isNan(){
        this.refs.nv.setClick(false);
        this.refs.nan.setClick(true);
    }

    renderBirthday(){
        return(
            <View style={{height: 150, alignItems:'center',justifyContent:'center'}}>
                <SelectData result={(year, month, day)=>{
                    if(month < 1) month = 1;
                    month = month < 10 ? ('0' + month) : month;
                    day = day < 10 ? ('0' + day) : day;

                    this.setState({
                        brithday: year + '-' + month  + '-' + day
                    })
                }}/>
            </View>
        );
    }

    userBaseMessage(){
       if(this.verification()){
           this.refs.progress.show();
           mimeManager.userBaseMessage(this.state, data=>{
                this.refs.progress.hidden();
                if(data){
                    if(config.SUCCESS == data.code){
                        this.refs.toast.show(data.msg);
                        
                        global.user.userName = this.state.nickName;

                        Storage._sava(config.USER, global.user);

                        this.props.callback ? this.props.callback('user') : '';

                        // setTimeout(()=>{
                        //     Actions.pop();
                        // }, );
                       
                    }else{
                        this.refs.toast.show(data.msg);
                    }
                }else{
                    this.refs.toast.show('服务器忙，稍后再试');
                }
           });
       }
    }


    verification(){
        if(this.state.nickName.length < 3){
            this.refs.toast.show('昵称不能少于三位');
            return false;
        }

        return true;
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.refs.progress.show();
           mimeManager.getUserBaseMessage(data=>{
                this.refs.progress.hidden();
                if(data){
                    if(config.SUCCESS == data.code){
                        let array = data.data;
                        if(array.length > 0){
                            let result = array[0];
                            
                            this.setState({
                                nickName: result.userName,
                                birthday: result.birthday.split(' ')[0],
                                hight: result.hight,
                                sex: result.sex,
                                weight: result.weight
                            })

                            if(result.sex == 1){
                                this.isNan();
                            }else{
                                this.isNv();
                            }


                        }
                    }else{
                        this.refs.toast.show(data.msg);
                    }
                }else{
                    this.refs.toast.show('服务器忙，稍后再试');
                }
           });
    }
}