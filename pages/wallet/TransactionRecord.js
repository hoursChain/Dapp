import React, {Component} from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    ListView,
    ScrollView
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import Progress from '../../component/T_ProgressBar';
import * as walletManager from '../../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';

import StatusBar from '../../component/T_StatusBar';
/**
 * 交易记录
 */
export default class TransactionRecord extends Component{

    constructor(props){
        super(props);
        this.state = {
            recordList: []
        }
    }

    componentDidMount(){
        this.recordList();
    }

    /**
     * hour 如果有访问hor交易记录 没有则访问eth校验记录
    */
    recordList(){  
        this.refs.progress.setModalVisible(true);     
        if(this.props.hour){
            walletManager.horTransactionRecord(this.props.wallet, (data)=>{
                this.refs.progress.setModalVisible(false); 
                if(data){
                    if("1" == data.status){
                        this.setState({
                            recordList: data.result
                        })
                    }else{
                        this.refs.toast.show(data.message);
                    }
                }else{
                    this.refs.toast.show('服务器正忙，稍后再试');
                }
            });
        }else{
            walletManager.ethTransactionRecord(this.props.wallet, (data)=>{
                this.refs.progress.setModalVisible(false); 
                if(data){
                    if("1" == data.status){
                        this.setState({
                            recordList: data.result
                        })
                    }else{
                        this.refs.toast.show(data.message);
                    }
                }else{
                    this.refs.toast.show('服务器正忙，稍后再试');
                }
            });
        }
    }

    render(){

        let view = [];

        this.state.recordList.map((item, index)=>{
            view.push(this.renderItem(item, index));
        });

        return(
           <View style={[StyleUtils.container, {paddingBottom: 50}]}>
           <StatusBar />
                <View style={[{width: config.width}, StyleUtils.space]}></View>
                <View style={[StyleUtils.whiteBackgroundColor, {width: config.width, height: config.height * 0.2, justifyContent: 'center', alignItems:'center'}]}>
                    <Text numberOfLines={1} style={{color: config.black_color, fontSize: 50}}>{this.props.hour ? this.props.wallet.hour : (this.props.wallet.eth ? this.props.wallet.eth.toFixed(8) : '')}</Text>
                    <Text numberOfLines={1} style={{color: config.black_color, fontSize: 18}}>{this.props.hour ? '' : '≈$' + (this.props.wallet.price ? this.props.wallet.price.toFixed(2) : 0)}</Text>
                </View>

                <ScrollView style={[StyleUtils.whiteBackgroundColor, {padding: 10, width: config.width, marginTop: 15, paddingBottom: 15}]}>
                    <Text style={{color: config.black_color, fontSize: 15}}>最近交易记录</Text>
                    
                    {view}
                    
                </ScrollView>

                <View style={{position: 'absolute', width: config.width, left: 0, bottom: 0, height: 50, flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{
                            let params = this.props.hour ? {wallet: this.props.wallet, hour: '1'} : {wallet: this.props.wallet};
                            Actions.transferAccounts(params);
                        }} style={{backgroundColor: 'rgb(79, 109, 250)',  height: 50, width: config.width/2, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                            <Image style={{width: 20, height: 20, marginRight: 8}} source={require('./../../../images/create_wallet.png')}/>
                            <Text style={{color: config.white_color}}>转账</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        let params = this.props.hour ? {wallet: this.props.wallet, hour: '1'} : {wallet: this.props.wallet};                           
                        Actions.receivablesCode(params)}
                        } style={{backgroundColor: 'rgb(95, 142, 252)',  height: 50, width: config.width/2, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                            <Image style={{width: 20, height: 20, marginRight: 8}} source={require('./../../../images/import_wallet.png')}/>
                            <Text style={{color: config.white_color}}>收款</Text>
                    </TouchableOpacity>
                </View>
                <Progress ref='progress' />
                <Toast ref='toast' />
           </View>
        );
    }

    renderItem(item, index){
        let isSend = this.props.wallet.address == item.from ? 
        <Image style={{width: 25, height:25, marginRight: 8}} source={require('./../../../images/to.png')} /> 
        : 
        <Image style={{width: 25, height:25, marginRight: 8}} source={require('./../../../images/from.png')} />;

        let hour = this.props.hour ? {
            hour: '1'
        }: {};
        return(
            <TouchableOpacity key={index} onPress={()=>{Actions.transactionRecordDetail({'item': item, ...hour})}}>
                <View style={{marginTop: 10,  width: config.width - 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            {isSend}
                            <View>
                                <Text numberOfLines={1} style={{color: '#666666', maxWidth: config.width * 0.55}}>{item.to}</Text>
                                <Text style={{color: '#999999'}}>{config.formatDateTime(item.timeStamp)}</Text>
                            </View>
                        </View>

                        <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={{color: config.blue_color}}>{item.value/config.money_flag}</Text>
                        </View>
                        
                    </View>
                    <View style={[{width: config.width - 20, marginTop: 10}, StyleUtils.space]}></View>
                    
                    
            </TouchableOpacity>
        );
    }

     
}