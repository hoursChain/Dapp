import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Image,
    InteractionManager,
    Animated,
    Easing,
    Platform,  
    Dimensions 
} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-router-flux';
import Text from '../../component/T_Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import config from '../../config';

import StatusBar from '../../component/T_StatusBar';

import Toast, {DURATION} from 'react-native-easy-toast';
import StyleUtils from '../StyleUtils';
var {width, height} = Dimensions.get('window');
/**
 * 转帐扫码
 * 
 */
export default class Scan extends Component{
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            show:true,
            anim: new Animated.Value(0),
            camera: {
                aspect: Camera.constants.Aspect.fill,
            },
        };
    }
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
           this.startAnimation()
        });
    }
    startAnimation(){
        if(this.state.show){
        this.state.anim.setValue(0)
        Animated.timing(this.state.anim,{
            toValue:1,
            duration:1500,
            easing:Easing.linear,
        }).start(()=>this.startAnimation());
        }
    }
    componentWillUnmount(){
        this.state.show = false;
    }
    //扫描二维码方法
    barcodeReceived = (e) =>{
        if(this.state.show){
            this.state.show = false;
            if (e) {
                // let data = JSON.parse(e.data);
                Actions.pop({refresh:{'value': e.data}});
            } else {
                this.refs.toast.show('扫码失败');
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <Toast ref='toast' />
                <Camera
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    barCodeTypes = {['qr']}
                >
                <View style = {{height: Platform.OS == 'ios' ? (height-264)/3:(height-244)/3,width:width,backgroundColor:'rgba(0,0,0,0.5)',}}>
                </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.itemStyle}/>
                            <View style={styles.rectangle} >
                                <Animated.View style={[styles.animatiedStyle, {
                transform: [{
                    translateY: this.state.anim.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,200]
                    })
                }]
            }]}>
                                </Animated.View>
                            </View>
                        <View style={styles.itemStyle}/>
                    </View>
                    <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
                        <Text style={styles.textStyle}>将二维码放入框内,即可自动扫描</Text>
                    </View>
                </Camera>
            </View>
        );
    }


    
}

const styles = StyleSheet.create({
    itemStyle:{
        backgroundColor:'rgba(0,0,0,0.5)',
        width:(width-200)/2,
        height:200
    },
    textStyle:{
        color:'#fff',
        marginTop:10,
        fontWeight:'bold',
        fontSize:18
    },
    navTitleStyle: {
        color:'white',
        fontWeight:'bold',
    },
    navBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'rgba(34,110,184,1.0)',
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        justifyContent:'center'
    },

    leftViewStyle:{
        // 绝对定位
        // 设置主轴的方向
        flexDirection:'row',
        position:'absolute',
        left:10,
        bottom:Platform.OS == 'ios' ? 15:12,
        alignItems:'center',
        width:30
    },
    animatiedStyle:{
        height:2,
        backgroundColor:'#00FF00'
    },
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1 * config.pixel,
        borderColor: config.white_color,
    }});