import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  BackHandler,
  ToastAndroid
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import config from './../config';
import Storage from './../storage';
import WebView from './../component/T_WebView';
// import WebLoadingView from './../component/T_ WebLoadingView';
const {width, height} = Dimensions.get('window');
const my_padding = Platform.select({
  ios:'20px',
  android:'0px',
})
/**
 *  APP 首页
 */
export default class UrlPages extends Component{
  static navigationOptions = {
      header: null,
  };


    constructor(props){
      super(props);
      this.lastBackPressed = 0;
    }

    componentDidMount() {
      // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }


    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
    onBackAndroid(){
      if (this.lastBackPressed == 1) {
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();

      }else if(this.lastBackPressed == 0){
        
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        this.lastBackPressed = 1;
        setTimeout(()=>{
          this.lastBackPressed = 0;
        }, 2000);
      }
      return true;
    }

    // http://weixin.cloudwealth.com.cn/zhu.html
    render(){
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={config.statusBar_backgroundColor} />
          {/* <WebView uri="http://wallet.hourschain.info/establish-remember.html?new_seed=cash%20clutch%20unusual%20lion%20pioneer%20cradle%20add%20napkin%20poverty%20curtain%20dragon%20lazy&passwords1=dfdfdf&wallet_nick=dfdfdf" style={styles.webview_style}/> */}
          <WebView uri="http://wallet.hourschain.info" style={styles.webview_style}/>
          {/* <WebView uri="http://59.110.225.203/hours/html/base.html" style={styles.webview_style}/> */}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    webview_style:{
      paddingTop:my_padding
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });