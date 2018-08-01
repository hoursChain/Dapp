import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Platform,
  SectionList,
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import StyleUtils from '../StyleUtils';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as singinManager from '../../service/SinginService';

/**
 * 任务
 */
export default class Mission extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    _keyExtractor = (item, index) => index.toString();


    render(){
        return(
            <View style={[StyleUtils.container]}>
            <StatusBar />
                <SectionList 
                    keyExtractor = {this._keyExtractor}
                    style={{flex: 1, backgroundColor: config.white_color}}
                    sections={this.state.dataSource}
                    renderItem={this._renderItem.bind(this)}
                    renderSectionHeader={this._renderSectionHeader}
                    ItemSeparatorComponent={ this._renderItemSeparatorComponent }
                />
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View>
        );
    }

    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:1 * config.pixel, backgroundColor:config.space_color }}></View>
    );

    _renderItem(data, index){
        let item = data.item;
        let isOver = item.completeNum >= item.limit;

        let button = <Text style={{textAlign:'center', width: config.width/3, padding: 8, fontSize: 12, backgroundColor: config.space_color}}>任务未完成</Text>;
        
        if(isOver && item.getStatus == 1){
            //未领取
            button = <TouchableOpacity onPress={()=>{
                this.getDoTask(item.id);
              }}><Text style={{textAlign:'center', width: config.width/3, padding: 8, fontSize: 12, backgroundColor: config.blue_color, color: config.white_color}}>领取奖励</Text></TouchableOpacity>      
        }else if(isOver && item.getStatus == 2){
            button = <Text style={{textAlign:'center', width: config.width/3, padding: 8, fontSize: 12, backgroundColor: config.space_color}}>已领取</Text>;
        }


        return(
            <View key={index} style={{height: 40, width: config.width, backgroundColor: config.white_color,alignItems:'center', flexDirection: 'row', justifyContent:'space-around'}}>
                <Text style={{width: config.width/3, padding: 8, fontSize: 12}}>{item.name}</Text>
                <Text style={{textAlign:'center', width: config.width/3, padding: 8, fontSize: 12}}>{isOver ? item.limit : item.completeNum }/{item.limit}</Text>
                {button}
            </View>
        );
    }
    

    _renderSectionHeader = ({section})=>{
        return(
            <View style={{ width: config.width,height: 40, justifyContent:'center', alignItems:'center', backgroundColor: config.space_color}}>
                <Text style={{width: config.width,padding: 8, fontSize: 14, fontWeight: 'bold',}}>{section.key}</Text>
            </View>
        );
    }
    /**
     * 领取任务
     */
    getDoTask(id){
        this.refs.progress.show();
        singinManager.doTask({'id': id}, data=>{
            console.log(JSON.stringify(data));
            this.refs.progress.hidden();
            if(data){
                if(config.SUCCESS == data.code){
                    let array = data.data;
                    if(array.length > 0){
                        let result = array[0];
                        this.refs.toast.show('领取' + result.sorce + '积分成功');

                        setTimeout(()=>{
                            this.loadData();

                            singinManager.refreshIntegral(()=>{
                                this.props.callback('mission');
                            });

                        }, 100);
                    }
                }else{
                    this.refs.toast.show(data.msg);
                }
            }else{
                this.refs.toast.show('服务器忙请稍后再试'); 
            }
        })
    }
    

    componentDidMount(){
        this.loadData();
    }
    

    loadData(){
        this.refs.progress.show();
        singinManager.getTaskList(data=>{
            this.refs.progress.hidden();
            if(data){
                if(config.SUCCESS == data.code){
                    let array = data.data;

                    let dayArray = [];
                    let weekArray = [];
                    let monthArray = [];
                    let yearArray = [];
                    let otherArray = [];


                    array.map((item)=>{
                        switch(item.limit_unit){
                            case 0:
                                dayArray.push(item);
                                break;
                            case 1:
                                weekArray.push(item);
                                break;
                            case 2:
                                monthArray.push(item);
                                break;
                            case 3:
                                yearArray.push(item);
                                break;
                            default:
                                otherArray.push(item);
                                break;
                        }
                    })
                    let source = [];
                    if(dayArray.length > 0){
                        source.push({
                            'key': '每日任务', 'data':dayArray,
                        });
                    }

                    if(weekArray.length > 0){
                        source.push({
                            'key': '每周任务', 'data':weekArray,
                        });
                    }

                    if(monthArray.length > 0){
                        source.push({
                            'key': '每月任务', 'data':monthArray,
                        });
                    }

                    if(yearArray.length > 0){
                        source.push({
                            'key': '每年任务', 'data':yearArray,
                        });
                    }

                    if(otherArray.length > 0){
                        source.push({
                            'key': '其他任务', 'data':otherArray,
                        });
                    }

                    this.setState({
                        dataSource: source
                    })

                }else{
                    this.refs.toast.show(data.msg);
                }
            }else{
                this.refs.toast.show('服务器忙请稍后再试');
            }
        });
    }



}