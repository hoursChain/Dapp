import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import Text from '../../component/T_Text';
// import {Actions} from 'react-native-router-flux';
import config from '../../config';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import QRCode from 'react-native-qrcode';

import Toast, {DURATION} from 'react-native-easy-toast';

import StatusBar from '../../component/T_StatusBar';

/**
 * 交易记录详细
 */
export default class TransactionRecordDetail extends Component{

    render(){

        let url = 'https://etherscan.io/tx/' + this.props.item.hash;

        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
            <StatusBar />
                <View style={{height: 120, alignItems:'center'}}>
                    <View style={{width: config.width, height: 80, backgroundColor: config.blue_color}}></View>
                    <Image style={{position: 'absolute', width: 80, height: 80, marginTop: 40}} source={require('./../../../images/150_logo_shaow.png')} />
                </View>
                <View style={{width: config.width * 0.9,  alignItems:'center', paddingTop: 10}}>
                    <Text numberOfLines={1} style={{width: config.width * 0.9, color: config.black_color, fontSize: 25, textAlign:'center'}}>
                        {this.props.item.value / config.money_flag} {this.props.hour?'HOUR':'ETH'}
                    </Text>
                    <View style={[{width: config.width * 0.9}, StyleUtils.space]}></View>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 10, color: '#666666'}}>
                        发款方
                    </Text>
                    <Text numberOfLines={1} style={{fontSize: 12,width: config.width * 0.9, marginTop: 4, color: '#666666'}}>
                        {this.props.item.from}
                    </Text>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 10, color: '#666666'}}>
                        收款方
                    </Text>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 4, color: '#666666'}}>
                        {this.props.item.to}
                    </Text>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 10, color: '#666666'}}>
                        矿工费用
                    </Text>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 4, color: '#666666'}}>
                        {this.props.item.gasPrice * this.props.item.gas / config.money_flag}
                    </Text>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 10, color: '#666666'}}>
                        备注
                    </Text>
                    <Text style={{fontSize: 12,width: config.width * 0.9, marginTop: 4, color: '#666666'}}>
                        
                    </Text>
                    <View style={[{width: config.width * 0.9, marginTop: 10}, StyleUtils.space]}></View>
                    <View style={{width: config.width * 0.9, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={{fontSize: 12}}>交易号</Text>
                            <Text numberOfLines={1} style={{fontSize: 12, maxWidth: config.width * 0.65}}>{this.props.item.hash}</Text>

                            <Text style={{fontSize: 12, marginTop: 4}}>区块</Text>
                            <Text numberOfLines={1} style={{fontSize: 12}}>{this.props.item.blockNumber}</Text>

                            <Text style={{fontSize: 12, marginTop: 4}}>交易时间</Text>
                            <Text numberOfLines={1} style={{fontSize: 12}}>{config.formatDateTime(this.props.item.timeStamp)}</Text>
                        </View>
                        <View>
                            <View style={{backgroundColor: config.space_color, padding: 8}}>
                                <QRCode
                                    value={url}
                                    size={70}
                                    bgColor='black'
                                    fgColor={config.space_color}/> 
                            </View>
                            <TouchableOpacity onPress={()=>{
                                Clipboard.setString(url);
                                this.refs.toast.show('复制成功')
                            }} style={{marginTop: 6, width: 86, borderRadius: 7, backgroundColor: config.blue_color, justifyContent:'center', alignItems: 'center', padding: 4}}>
                                <Text style={{color: config.white_color}}>复制</Text>    
                            </TouchableOpacity>  
                        </View>
                    </View>

                </View>
                <Toast ref='toast' />
            </View>
        );
    }
}