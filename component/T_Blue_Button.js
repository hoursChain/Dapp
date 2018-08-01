import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Text from './T_Text';
import config from '../config';
export default class T_Blue_Button extends Component{
    render(){

        return(
            <TouchableOpacity onPress={this.props.onPress}
            style={[{width: this.props.width ? this.props.width : config.width * 0.9, backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : config.blue_color,borderRadius: 5,padding: 8, justifyContent:'center', alignItems:'center',marginBottom: 10, marginTop: 10}]}>
                <Text style={{color: this.props.txtColor}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}