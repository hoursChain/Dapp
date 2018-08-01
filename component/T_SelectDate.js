/**
 * Created by tianzhw on 2017/7/28.\
 * 自定义日期控件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Text from './T_Text';
import Utils from '../config';
import ScrollSelectView from './T_ScrollSelectView';


export default class SelectData extends Component {

    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            year : this.props.year ?  this.props.year : date.getFullYear(),
            month :  this.props.month ?  this.props.month : date.getMonth() + 1,
            day : this.props.day ?  this.props.day : date.getDate(),
        }
        this._getDaysInMonth.bind(this);
    }


    render() {

        let monthHaveDay = this._getDaysInMonth(this.state.year, this.state.month)

        if(isNaN(monthHaveDay)){
            monthHaveDay = 31;
        }
        // console.log('monthHaveDay', monthHaveDay);

        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{flexDirection:'row', paddingLeft: 10 , paddingRight: 10, alignItems:'center', justifyContent:'center'}}>
                    <ScrollSelectView selectIndex={this.state.year} itemHeight={50} startNum={1970} endNum={2050} width={50} result={data=>{
                        console.log('tianzhw', data);
                        this.state.year = data;

                        this.refs.day._updateEndNum(this._getDaysInMonth(data, this.state.month));
                        this.props.result(data, this.state.month, 1);

                    }}/>
                    <View style={{width: 40, height: 40, borderRadius:20, backgroundColor:Utils.blue_color, justifyContent:'center', alignItems:'center',elevation:10, marginLeft:4, marginRight:4}}>
                        <Text style={{color:'#fff'}}>年</Text>
                    </View>
                    <ScrollSelectView selectIndex={this.state.month} itemHeight={50} startNum={1} endNum={12} width={50} result={data=>{
                        console.log('tianzhw', data);
                         {/*this._resultDay(this.state.year, data, this.state.day);*/}
                            this.state.month = data;
                          this.refs.day._updateEndNum(this._getDaysInMonth(this.state.year, data));

                           this.props.result(this.state.year, data, 1);
                    }}/>
                    <View style={{width: 40, height: 40, borderRadius:20, backgroundColor:Utils.blue_color, justifyContent:'center', alignItems:'center',elevation:10, marginLeft:4, marginRight:4}}>
                        <Text style={{color:'#fff'}}>月</Text>
                    </View>
                    <ScrollSelectView ref="day"  selectIndex={this.state.day} itemHeight={50} startNum={1} endNum={monthHaveDay} width={50} result={data=>{
                        console.log('tianzhw', data);
                        this.state.day = data;

                        this.props.result(this.state.year, this.state.month, data);
                    }}/>
                    <View style={{width: 40, height: 40, borderRadius:20, backgroundColor:Utils.blue_color, justifyContent:'center', alignItems:'center',elevation:10, marginLeft:4, marginRight:4}}>
                        <Text style={{color:'#fff'}}>日</Text>
                    </View>
                </View>
            </View>
        );
    }

    _resultDay(){
        let monthHaveDay = this._getDaysInMonth(this.state.year, this.state.month)

        if(isNaN(monthHaveDay)){
            monthHaveDay = 31;
        }
        return monthHaveDay;
    }


    _resultDay(year, month, day){

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
    //获取当前年月日
    _getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
}