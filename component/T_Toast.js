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

/**
 * 自定义toast组件
 */
export default class T_Toast extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.visible ? this.props.visible : false,
            msg:''
        }
        
    }

    show(msg){
        this.setState({
            modalVisible: true,
            msg: msg
        });

        setTimeout(()=>{
            this.hidden();
        }, 1500);


    }

    hidden(){
        this.setState({
            modalVisible: false,
            msg:''
        });
    }


    render(){
        let view;

        switch(this.props.mode){
            case 'top':

                break;
            case 'middle':
                break;
            default:
                view = this.renderBotton();
                break;
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


    renderBotton(){
        return(
            <View style={{position: 'absolute', bottom: 20, left: 0, width: config.width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{padding: 8, backgroundColor: '#333333', color: '#ffffff'}}>{this.state.msg}</Text>
            </View>
        );
    }
}