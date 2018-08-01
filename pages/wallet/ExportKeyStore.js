import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import KeyStore from './KeyStore';
import QRCodeView from './QRCodeView';

import StatusBar from '../../component/T_StatusBar';
export default class ExportKeyStore extends Component{
    render(){
        return(
            <ScrollableTabView 
            tabBarBackgroundColor={config.white_color}
            tabBarActiveTextColor={config.blue_color}
            tabBarUnderlineStyle={{backgroundColor: config.blue_color}}>         
                <KeyStore tabLabel="keystore文件" keyStore={this.props.keyStore}/>
                <QRCodeView tabLabel="二维码" keyStore={this.props.keyStore}/>
            </ScrollableTabView>
        );
    }
}