import React,{ Component } from "react";
import {
    Platform, View, 
} from 'react-native';
import StyleUtils from '../pages/StyleUtils';
import config from '../config';
import StateBar from './T_StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from './../component/T_ProgressBar';

export default class T_TabComponent extends Component{
    render(){
        let statebar = (Platform.OS == 'ios') ? <LinearGradient colors={this.props.colors} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} style={{width: config.width, height: config.statusBarHeight}}></LinearGradient> 
            : 
            <View></View>;
        return(
            <View style={[StyleUtils.container, {backgroundColor: this.props.backgroundColor}]}>
                {statebar}    
                <StateBar bar/>                          
                {this.props.children}
                <ProgressBar ref='progress'/>
            </View>
        )
    }


    progressShow(){
        this.refs.progress.show();
    }

    progressHidden(){
        this.refs.progress.hidden();
    }

}