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
import Text from '../../component/T_Text';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import SytleUtils from '../StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';

import * as singinManager from '../../service/SinginService';
/**
 * 签到
 */
export default class SignIn extends Component{

    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            year : date.getFullYear(),
            month :  date.getMonth() + 1,
            day : date.getDate(),
            singinList:[]
        }

    }



    render(){
        let monthView = [];
        let monthDays = this._getDaysInMonth(this.state.year, this.state.month);
        let d = new Date();
        //获取当月第一天是周几
        d.setDate(1);
        let weekD1 = d.getDay();
        //获取当月最后一天是周几
        d.setDate(monthDays);
        let weekD2 = d.getDay();

        //补全前段
        for(let i = 0; i < weekD1; i++){
            monthView.push(
                this.renderDay(null, 'bre' + i, null)
            )
        }

        // let zuhe = this.state.year + this.state.month > 10 ? this.state.month : ('0' + this.state.month);
        
        //添加数据
        for(let i = 0; i < monthDays; i++){
            let zuhe =(i + 1) >= 10 ? (i + 1) : ('0' + (i+1));
            
            let style = {};
            let color = {};
            this.state.singinList.map((item)=>{                
                if(item.createDate.split('-')[2] == zuhe){
                    style = {
                        backgroundColor: config.blue_color,
                    }
                    color = {
                        color: config.white_color
                    }
                }
            })
            monthView.push(
                this.renderDay((i + 1), i, style, color)
            )
        }

        //补全后段
        for(let i = 0; i < weekD2; i++){
            monthView.push(
                this.renderDay(null, 'aft' + i, null)
            )
        }
        

        let renderDayWidth = config.width / 7 - 0.05;


        let marginTopStyle = {}

        let fontTopColor = {
            color:'#999999'
        }

        let dayColor = {}

        let bar = <StatusBar />

        if(this.props.noTitle){
            marginTopStyle = {
                paddingTop: (Platform.OS === 'ios') ? (config.isIphoneX() ? 84 : 64) : 54,
                backgroundColor: config.blue_color
            }

            fontTopColor = {
                color: config.white_color
            }

            dayColor = {
                color: config.white_color
            }

            bar = <StatusBar bar/>
        }


        

        return(
            <View style={[SytleUtils.container]}>
                {bar}
                <View style={[{width: config.width, backgroundColor: config.white_color, alignItems:'center'}, marginTopStyle]}>
                    <View style={{flexDirection: 'row', marginTop: 0, alignItems:'center'}}>
                        <Text style={[{color: config.blue_color, fontSize: 40, marginRight: 10}, dayColor]}>{this.state.singinList.length}</Text><Text style={[{color: '#333333'}, dayColor]}>天</Text>
                    </View>
                    <Text style={[{color: '#999999', fontSize: 12}, fontTopColor]}>{global.user.integral}      积分</Text>
                    <View style={{flexDirection:'row', padding: 8, alignItems:'center', justifyContent:'center', marginTop: 10}}>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>SUN</Text>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>MON</Text>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>TUE</Text>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>WED</Text>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>THU</Text>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>FRI</Text>
                        <Text style={[{color: '#999999', width: renderDayWidth, textAlign:'center', fontSize: 12}, fontTopColor]}>SAT</Text>
                    </View>
                </View>
                <View style={{width: config.width,  marginTop: 6, backgroundColor: config.white_color, alignItems:'center'}}>
                    <View style={{padding: 8, flexDirection: 'row', alignItems:'center'}}>
                        <Text style={{color: '#999999', marginRight: 6, fontSize: 12}}>{this.state.year}年{this.state.month}月</Text><View style={{flex:1, height: 1 * config.pixel, backgroundColor: config.space_color}}></View>
                    </View>
                    <View style={{flexDirection: 'row',  flexWrap:'wrap', paddingBottom: 8}}>
                            {monthView}        
                    </View>
                </View>
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View>
        );
    }

    renderDay(date, index, style, color){
        if(!color){color={color: '#999999'}}
        let renderDayWidth = config.width / 7 - 0.05;
        let subWidth = renderDayWidth * 0.95;

        let nowDay = (this.state.day == date) ? {borderWidth: 1 * config.pixel, borderColor: config.blue_color,} : {};

        let subView = date ? 
        <TouchableOpacity onPress={()=>{this.singin(date)}} style={{width:subWidth, height: subWidth, padding: 15, alignItems:'center', justifyContent: 'center', borderRadius: subWidth / 2, ...nowDay, ...style}}>
            <Text style={[{textAlign:'center', fontSize: 12,...color}, ]}>{date}</Text>
        </TouchableOpacity>
        :
        <View></View>

        return(
            <View key={index} style={{width: renderDayWidth, alignItems:'center', justifyContent: 'center',}}>
                {subView}
            </View>
        );
    }
    /**
     * 获取月份有多少天
     * @param year
     * @param month
     * @returns {number}
     * @private
     */
    _getDaysInMonth(year,month){
        month = parseInt(month,10)+1;
        let temp = new Date(year+"/"+month+"/0");
        return temp.getDate();
    }

    singin(day){
        if(day <= this.state.day){
            this.refs.progress.show();
            singinManager.sendSingin({}, data=>{
                this.refs.progress.hidden();
                if(data){
                    if(config.SUCCESS == data.code){ 


                        setTimeout(()=>{
                            this.getSingin();
                            singinManager.refreshIntegral(()=>{
                                this.props.callback('signin');
                            })
                        }, 500);

                        
                    }else{
                        this.refs.toast.show(data.msg);
                    }
                }else{
                    this.refs.toast.show('服务忙稍后再试！');
                }
            });
        }else{
            this.refs.toast.show('未到签到时间') 
        }
    }

    getSingin(){
        if(this.state.singinList.length == 0){
            this.refs.progress.show();
            singinManager.getSinginList({}, data=>{
                this.refs.progress.hidden();
                if(data){
                    if(config.SUCCESS == data.code){ 
                        this.setState({
                            singinList: data.data
                        })
                    }else{
                        this.refs.toast.show(data.msg);
                    }
                }else{
                    this.refs.toast.show('服务忙稍后再试！');
                }
            });
        }
        
    }

    componentDidMount(){
        this.getSingin();
    }
}