import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  WebView,
  Dimensions,
  BackHandler
} from 'react-native';
import Text from './T_Text';
const {width, height} = Dimensions.get('window');
import config from './../config';
import * as pagesService from './../service/PagesService';

export default class T_WebView extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const patchPostMessageFunction = () => {
            const originalPostMessage = window.postMessage;
          
            const patchedPostMessage = (message, targetOrigin, transfer) => {
              originalPostMessage(message, targetOrigin, transfer);
            };
          
            patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
          
            window.postMessage = patchedPostMessage;
          };
          
          const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;
        
        
        return (
            <WebView 
                injectedJavaScript={patchPostMessageJsCode}
               //injectedJavaScript="window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');" 
                ref="webViewRef"
                style={{width:width,height:height-20,backgroundColor:'#ffffff'}}  
                source={{uri:this.props.uri, method: 'GET'}}  
                javaScriptEnabled={true}  
                domStorageEnabled={true}  
                scalesPageToFit={false}
                onMessage={this.onMessage.bind(this)} 
            />
        );       
    }

    onMessage(e){       
        const message = e.nativeEvent.data;
        pagesService.message(message,(key1,data1)=>{
            let v = {
                key: key1,
                value: data1
            }
            if(this.refs.webViewRef){
                this.refs.webViewRef.postMessage(JSON.stringify(v));  
            }         
        });    
    }

    
}

