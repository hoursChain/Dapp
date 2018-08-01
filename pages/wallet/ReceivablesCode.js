import React, {Component} from 'react';
import {
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    View,
    Clipboard
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import QRCode from 'react-native-qrcode';
import Toast, {DURATION} from 'react-native-easy-toast';

import StatusBar from '../../component/T_StatusBar';
/**
 * 收款码
 */
export default class ReceivablesCode extends Component{
    constructor(props){
        super(props);
        this.state = {
            money: ''
        }

    }
    render(){
        let params = this.props.hour ? {'toAddress' : this.props.wallet.address, 'money': this.state.money, hour: '1'} : {'toAddress' : this.props.wallet.address, 'money': this.state.money};
        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
            <StatusBar />
                <View style={{height: 120, alignItems:'center'}}>
                    <View style={{width: config.width, height: 80, backgroundColor: config.blue_color}}></View>
                    <Image style={{position: 'absolute', width: 80, height: 80, marginTop: 40}} source={require('./../../../images/100_logo-09.png')} />
                </View>
                <View style={{width: config.width * 0.9,  alignItems:'center', paddingTop: 10}}>
                    <Text numberOfLines={1} style={{width: config.width * 0.7, color: config.black_color}}>{this.props.wallet.address}</Text>

                    <TextInput editable={false} value={this.state.money} onChangeText={(text)=>{this.setState({money: text})}} style={{marginTop: 10, width: config.width * 0.7, height: 35, padding:0}} placeholder='收款金额' keyboardType='numeric' placeholderTextColor='#999999' underlineColorAndroid="transparent" />
                    <View style={[{width: config.width * 0.7, marginTop: 4}, StyleUtils.space]}></View>
                    <View style={{margin: 10, padding: 10, backgroundColor: config.space_color}}>
                    <QRCode
                        value={this.props.wallet.address}
                        size={175}
                        bgColor='black'
                        fgColor={config.space_color}/>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        Clipboard.setString(this.props.wallet.address);
                        this.refs.toast.show('复制成功')
                    }} style={{width: config.width * 0.7, borderRadius:5, backgroundColor: config.blue_color, marginTop: 10, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color: config.white_color,padding: 8}}>复制</Text>
                    </TouchableOpacity>

                </View>
                <Toast ref='toast' />
            </View>
        );
    }
}
