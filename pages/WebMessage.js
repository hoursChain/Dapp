import React, {Component} from 'react';
import{
    WebView,View
} from 'react-native';
import config from '../config';
import StatusBar from './../component/T_StatusBar';

export default class WebMessage extends Component{
    render(){
        let auth = global.user ? global.user.userid : '';
        return(
            <View style={{flex: 1}}>
                <StatusBar />
                <WebView 
                    ref="webViewRef"
                    style={{width:config.width,height:config.height,backgroundColor:config.white_color}}  
                    source={{uri:this.props.uri, method: 'GET', headers:{'Authorization': auth}}}  
                    javaScriptEnabled={true}  
                    domStorageEnabled={true}  
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}
