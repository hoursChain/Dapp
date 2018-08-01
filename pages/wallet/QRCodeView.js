import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StyleUtils from '../StyleUtils';
import QRCode from 'react-native-qrcode';
import StatusBar from '../../component/T_StatusBar';

export default class QRCodeView extends Component{
    render(){
        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
            <StatusBar />
            <View style={styles.content_div}>
                <View>
                    <Text style={styles.titile_txt}>仅供直接扫描</Text>
                    <Text style={styles.message_txt}>禁止二维码保存 截图 及拍照。仅供用户在安全环境下，直接扫秒来方便的导入钱包</Text>
                </View>

                <View style={{marginTop: 15}}>
                    <Text style={styles.titile_txt}>在安全环境下使用</Text>
                    <Text style={styles.message_txt}>请确保四周无人及无摄像头的前提下使用，二维码一旦被他人获取将造成不可挽回的资产损失</Text>
                </View>

                <View style={{marginTop: 15, alignItems:'center', padding: 10}}>
                    <View style={{padding: 8, backgroundColor:config.space_color}}>
                    <QRCode
                        value={this.props.keyStore}
                        size={150}
                        bgColor={config.space_color}
                        fgColor={config.black_color}/>
                        </View>
                </View>

            
            </View>
           
        </View>
        );
    }
}
const styles = StyleSheet.create({
    content_div:{
        flex:1,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    titile_txt:{
        color: config.black_color,
        marginBottom: 8,
        fontSize: 16,
    },
    message_txt:{
        color: '#666666',
        fontSize: 13
    }
});