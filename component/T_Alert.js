import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    TextInput,
    Animated,
    Easing,
    Clipboard
} from 'react-native';
import Text from './T_Text';
import config from '../config';
import Button from './T_Button';
import SytleUtil from '../pages/StyleUtils';
// import Divide from 'react-native-divide';
// orientation: PropTypes.oneOfType(['horizontal', 'vertical']), //方向

// width: PropTypes.number, //宽度

// color: PropTypes.string,//颜色

export default class T_Alert extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.visible ? this.props.visible : false,
            mode:'error',
            rotateValue: new Animated.Value(0),
        }
    }

    setModalVisible(flag){

        if('loading' == this.props.mode && !flag){
            this.state.rotateValue.stopAnimation();
        }else if('loading' == this.props.mode && flag){
            this.startRotat();
        }

        this.setState({
            modalVisible: flag
        })
    }

    render(){

        let view = '';

        if('error' == this.props.mode){
            view = this.renderError();
        }else if('password' == this.props.mode){
            view = this.renderPassWord();
        }else if('message' == this.props.mode){
            view = this.renderMessage();
        }else if('loading' == this.props.mode){
            view = this.renderLoading();
        }else if('diy' == this.props.mode){
            view = this.renderDiy();
        }else if('select_menu' == this.props.mode){
            view = this.renderSelectMenu();
        }else if('ud_ok' == this.props.mode){
            view = this.upLoadOk();
        }else if('ud_error' == this.props.mode){
            view = this.upLoadError();
        }else if('ud_progress' == this.props.mode){
            view = this.upLoadProgress();
        }

        
        return(
            <Modal animationType={'none'} onRequestClose={()=>{ this.setModalVisible(false)}}
                transparent={true} visible={this.state.modalVisible}
                supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                >
                    <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center'}}>
                        {view}
                    </View>
            </Modal>
        );
    }
    /**
     * 上传文件进度提示框
     */
    upLoadProgress(){
        return(
            <View style={{backgroundColor:config.white_color, width: config.width * 0.9, padding: 8, alignItems: 'center'}}>
                <Image style={{width: 40, height: 40, marginTop: 10}} source={require('./../../images/load.gif')}/>
                <Text style={{fontSize: 14, color: config.black_color}}>文件上传中</Text>
                <Text style={{fontSize: 12}}>文件上传比较耗时，请稍等片刻</Text>
            </View>
        );
    }
    /**
     * 上传文件错误提示
     */
    upLoadError(){
        return(
            <View style={{backgroundColor:config.white_color,width: config.width * 0.85, padding: 8, alignItems: 'center', borderRadius:5}}>
            <View style={{width: config.width * 0.9,alignItems: 'center'}}>
                <Image style={{width: 40, height: 40, margin: 10}} source={require('./../../images/upload_error.png')}/>
                <Text style={{fontSize: 14, color: config.black_color, marginBottom: 8}}>病例上传失败</Text>
                <Text style={{fontSize: 12}}>请检查后，再次上传</Text>
            </View>
                
            <Text style={{fontSize: 14, color: config.black_color, marginTop: 10}}>病例上传失败原因</Text>
            <Text style={{fontSize: 12, marginTop: 10}}>*病例内容不清晰（请垂直拍摄）</Text>
            <Text style={{fontSize: 12, marginBottom: 10}}>*缺少必要信息</Text>
            <Button width={config.width * 0.9 * 0.8} colors={[config.blue_color,config.blue_color,config.blue_color]} title='确定' onPress={()=>{
                this.setModalVisible(false);
            }}/>
            </View>
        )
    }
    /**
     * 上传文件正确
     */
    upLoadOk(){
        return(
            <View style={{backgroundColor:config.white_color,width: config.width * 0.9, padding: 8, alignItems: 'center'}}>
                <Image style={{width: 40, height: 40, marginTop: 10}} source={require('./../../images/upload_ok.png')}/>
                <Text style={{fontSize: 14, color: config.black_color,marginTop:10, marginBottom:10}}>病例上传成功</Text>
            <Button width={config.width * 0.9 * 0.8} colors={[config.blue_color,config.blue_color,config.blue_color]} title='确定' onPress={()=>{
                this.setModalVisible(false);
                this.props.callback ? this.props.callback() : '';
            }}/>
            </View>
        )
    }


    /**
     * 底部选择菜单
     */
    renderSelectMenu(){
        return(
            <View style={{position: 'absolute', bottom: 0, left: 0, width: config.width, backgroundColor: 'rgb(237, 237, 237)'}}>
                <TouchableOpacity onPress={this.props.launchCamera} style={{padding:8, width: config.width, height: 45, justifyContent:'center', alignItems:'center', backgroundColor: config.white_color}}>
                    <Text style={{color: config.black_color}}>拍照</Text>
                </TouchableOpacity>
                <View style={[{width: config.width}, SytleUtil.space]}></View>
                <TouchableOpacity onPress={this.props.launchImageLibrary} style={{padding:8, width: config.width, height: 45, justifyContent:'center', alignItems:'center', backgroundColor: config.white_color}}>
                    <Text style={{color: config.black_color}}>手机相册</Text>
                </TouchableOpacity>
                <View style={[{width: config.width}, SytleUtil.space]}></View>
                <TouchableOpacity onPress={()=>this.setModalVisible(false)} style={{padding:8, marginTop:6, width: config.width, height: 45, justifyContent:'center', alignItems:'center', backgroundColor: config.white_color}}>
                    <Text style={{color: config.black_color}}>取消</Text>
                </TouchableOpacity>
            </View>
        );
    }


    componentDidMount() {
        if('loading' == this.props.mode){
            
            this.startRotat();
        }
        
    }

    startRotat(){
        this.state.rotateValue.setValue(0);
        Animated.timing(this.state.rotateValue,{
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
            }).start(()=>{this.startRotat()});// 开始spring动画
    }

    renderLoading(){
        return(
            <Animated.Image source={require('./../../images/loading.jpg')}
                               style={[{width: config.width * 0.45, height: config.width * 0.45},
                                {
                                    opacity:this.state.rotateValue,
                                    transform:[
                                        {rotate:this.state.rotateValue.interpolate({inputRange:[0,1],outputRange:['0deg','360deg'],})},
                                    ]
                               }]}
                />
        );
    }

    renderDiy(){
        return(
            <View style={{width: config.width * 0.9, backgroundColor: config.white_color, elevation: 3,paddingTop: 8, paddingLeft:8, paddingRight: 8,  borderRadius: 5, margin: config.width * 0.1, alignItems: 'center'}}>
                <View style={{width: config.width * 0.9, alignItems:'center'}}>
                    {this.props.component}
                </View>
                <View style={{width: config.width * 0.9, flexDirection: 'row', borderTopWidth: 1 * config.pixel, borderTopColor: config.space_color, alignItems:'center', padding: 8}}>
                    <TouchableOpacity onPress={()=>{
                        this.setModalVisible(false);
                    }} style={{padding: 8, width: config.width * 0.9 * 0.5, justifyContent:'center', alignItems:'center', borderRightWidth: 1 * config.pixel, borderRightColor: config.space_color}}>
                        <Text style={{color: config.black_color}}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setModalVisible(false);
                    }} style={{padding: 8, width: config.width * 0.9 * 0.5, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: config.black_color}}>确定</Text>
                    </TouchableOpacity>
                    {/* <Button onPress={() => {this.setModalVisible(false)}} title='知道了' colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)']}/> */}
                </View>
            </View>
        );
        
    }


    renderError(){
        return(
            <View style={{width: config.width * 0.9, backgroundColor: config.white_color, elevation: 3,padding: 8, borderRadius: 5, margin: config.width * 0.1, alignItems: 'center'}}>

                <Image resizeMode='contain' style={{width: 30, height: 30, margin: 6}} source={require('./../../images/alert_error.png')} />

                <Text style={{color: config.black_color}}>请勿截图</Text>

                <Text style={{width: config.width * 0.75,color: '#999999', marginTop: 8, fontSize: 10}}>如果有人获取你的助记词，将直接获取你的资产。请抄下助记词并保存到安全的地方.</Text>
                <Text style={{color: '#999999',marginBottom: 8, fontSize: 10}}></Text>

                <Button onPress={() => {this.setModalVisible(false)}} title='知道了' colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)']}/>
            </View>
        );
    }


    renderPassWord(){
        return(
            <View style={{width: config.width * 0.9,backgroundColor: config.white_color, elevation: 3,padding: 8, borderRadius: 5, margin: config.width * 0.1, alignItems: 'center'}}>
                <View style={{width: config.width * 0.75, marginTop: 8,marginBottom:8}}>
                <Text style={{color: config.black_color}}>请输入密码</Text>
                </View>
                <TextInput onChangeText={(text)=>{this.props.change(text)}} style={{margin: 6, width: config.width * 0.75, height: 35, padding:8, borderWidth: 1 * config.pixel, borderColor: config.blue_color}} underlineColorAndroid="transparent" />
                
                <View style={{width: config.width * 0.9, padding: 8, flexDirection:'row-reverse'}}>
                        <TouchableOpacity onPress={()=>{
                            this.setModalVisible(false);
                            if(this.props.confirm){
                                this.props.confirm()
                            } 
                        }}><Text style={{color: config.blue_color,marginRight: 15}}>确定</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.setModalVisible(false)
                            if(this.props.cancel){
                                this.props.cancel
                            }
                        }}>
                            <Text style={{color: config.blue_color, marginRight: 15}}>取消</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }


    renderMessage(){
        return(
            <View style={{width: config.width * 0.9,backgroundColor: config.white_color, elevation: 3,padding: 8, borderRadius: 5, margin: config.width * 0.1, alignItems: 'center'}}>
                <View style={{width: config.width * 0.9, padding: 8, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{color: config.black_color, width: 30}}>
                    </Text><Text style={{color: config.black_color}}>导出私钥</Text>
                    <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}><Text style={{color: config.black_color,width: 30}}>X</Text></TouchableOpacity>
                </View>

                <View style={{width: config.width * 0.8, padding : 8, backgroundColor: 'rgb(251,242,241)', borderWidth: 1 * config.pixel, borderColor: 'rgb(231, 148, 148)'}}>
                    <Text style={{color: 'rgb(231, 148, 148)', fontSize: 12}}>安全建议，私钥未经加密导入有风险，建议使用助记词或keystore备份</Text>
                </View>

                <View style={{marginTop: 10, width: config.width * 0.8, padding : 8, backgroundColor: 'rgb(235,238,242)'}}>
                    <Text style={{color: '#999999', fontSize: 12}}>{this.props.txt}</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.setModalVisible(false);if(this.props.copy){this.props.copy()}}} style={{marginTop: 10,marginBottom: 10, width: config.width * 0.8, padding : 8, backgroundColor: config.blue_color, borderRadius: 5, alignItems:'center'}}>
                    <Text style={{color: config.white_color, fontSize: 12}}>复制</Text>
                </TouchableOpacity>
                {/* <View style={{width: config.width * 0.9, padding: 8, flexDirection:'row-reverse'}}>
                        <TouchableOpacity onPress={()=>{
                            this.setModalVisible(false);
                            if(this.props.confirm){
                                this.props.confirm
                            } 
                        }}><Text style={{color: config.blue_color,marginRight: 15}}>确定</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.setModalVisible(false)
                            if(this.props.cancel){
                                this.props.cancel
                            }
                        }}>
                            <Text style={{color: config.blue_color, marginRight: 15}}>取消</Text>
                        </TouchableOpacity>
                </View> */}
            </View>
        );
    }

}
