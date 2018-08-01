import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Clipboard,
    ScrollView
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StyleUtils from '../StyleUtils';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Alert from '../../component/T_Alert';
import BlueButton from '../../component/T_Blue_Button';

import Toast, {DURATION} from 'react-native-easy-toast';
export default class KeyStore extends Component{
    render(){
        let str = this.props.keyStore;
        return(
            <View style={[StyleUtils.container, StyleUtils.whiteBackgroundColor]}>
            <ScrollView>
                <View style={styles.content_div}>
                    <View>
                        <Text style={styles.titile_txt}>离线保存</Text>
                        <Text style={styles.message_txt}>请复制粘贴keystore到安全，离线的地方保存。切勿保存到邮箱 记事本 网盘 聊天工具等。非常危险</Text>
                    </View>

                    <View style={{marginTop: 15}}>
                        <Text style={styles.titile_txt}>请勿使用网络工具传输</Text>
                        <Text style={styles.message_txt}>请勿使用网络工具传输keystore文件，一旦黑客获取将造成不可挽回的资产损失，建议离线设备扫描二维码传输。</Text>
                    </View>

                    <View style={{marginTop: 15}}>
                        <Text style={styles.titile_txt}>密码保险箱保存</Text>
                        <Text style={styles.message_txt}>如需要在线保存，建议使用安全级别更高的password等，密码保存软件保管keystore</Text>
                    </View>

                    <View style={{marginTop: 15, backgroundColor:'rgb(243,243,243)'}}>
                        <Text style={{padding: 8, color: '#666666'}} numberOfLines={7}>
                            {str}
                        </Text>
                    </View>
                
                </View>
                </ScrollView>
                <View style={styles.bottom_view}>
                    <TouchableOpacity onPress={()=>{
                        Clipboard.setString(this.props.keyStore);
                        this.refs.toast.show('复制成功');
                    }} style={{padding: 8, alignItems: 'center',justifyContent: 'center',width: config.width * 0.9, backgroundColor: config.blue_color, borderRadius: 5}}>
                        <Text style={{color: config.white_color}}>复制</Text>
                    </TouchableOpacity>

                    {/* <BlueButton title='复制' txtColor={config.white_color} onPress={()=>{
                        Clipboard.setString(this.props.keyStore);
                        this.refs.toast.show('复制成功');
                    }}/> */}
                    
                </View>
                
               <Alert ref='error' mode='error' visible={true}/>
               <Toast ref='toast' /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottom_view:{
        position:'absolute',
        width: config.width,
        height: 50,
        left:0,
        bottom:0,
        alignItems: 'center',
    },
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