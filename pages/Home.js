import React, {Component} from 'react';
import {
    View,
    AppState,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import StatusBar from '../component/T_StatusBar';
import config from '../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Wallet from './Wallet';
import Mime from './Mime';
import Find from './Find';
import UpdateData from './UpdateData';
import Shop from './Shop';
import TabBottom from '../component/T_TabBottom';

import My from './My';
import MineField from './MineField';


import Signin from './find/SignIn';


const tabTitles = ['资产', '发现', '上传数据', '签到', '我'];
//默认图标
const tabIcon = [
    require('./../../images/wallet_tab.png'),
    require('./../../images/find_tab.png'),
    require('./../../images/update_tab.png'),
    require('./../../images/shop_tab.png'),
    require('./../../images/user_tab.png'),
];
//选中图标
const tabSelectedIcon = [
  require('./../../images/wallet_tab_select.png'),
  require('./../../images/find_select_tab.png'),
  require('./../../images/update_select_tab.png'),
  require('./../../images/shop_select_tab.png'),
  require('./../../images/user_tab_select.png'),
];
// const tabTitles = ['首页', '我'];
// //默认图标
// const tabIcon = [
//     require('./../../images/wallet_tab.png'),
//     require('./../../images/user_tab.png'),
// ];
// //选中图标
// const tabSelectedIcon = [
//   require('./../../images/wallet_tab_select.png'),
//   require('./../../images/user_tab_select.png'),
// ];
export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
            state:''
        }
    }


    // 1.1.2 版本
    render(){
      let user = global.user ? global.user : {};
      return(
          <View style={{flex: 1}}>
            <StatusBar bar/>
            <ScrollableTabView 
                tabBarPosition='bottom'
                renderTabBar={() => <TabBottom activeTabColor={'rgb(91, 144, 240)'} unactiveTabColor={config.black_color}  tabNames={tabTitles}
                                                tabIconNames={tabIcon}
                                                selectedTabIconNames={tabSelectedIcon}/>
                            }
                tabBarBackgroundColor={config.white_color}
                tabBarActiveTextColor={config.blue_color}
                tabBarUnderlineStyle={{backgroundColor: config.blue_color}}>
                    <Wallet wallet={{'wallet_nick': '未知', isflag: false, 'hour': 0, 'eth': 0}} {...this.props} {...user}/>
                    <Find callback={this.refresh.bind(this)} {...this.props} {...user}/>
                    <UpdateData callback={this.refresh.bind(this)} {...this.props} {...user}/>
                    <Signin noTitle={1} callback={this.refresh.bind(this)} {...this.props} {...user}/>
                    {/* <Shop callback={this.refresh.bind(this)} {...this.props} {...user}/> */}
                    <Mime callback={this.refresh.bind(this)} {...this.props} {...user}/>
            </ScrollableTabView>
            </View>
      );
    }
    // changeTab({i, ref}) {

    // }
    // render(){
    //   let user = global.user ? global.user : {};
    //   return(
    //     <View style={{flex: 1}}>            
    //         <ScrollableTabView onChangeTab={ this.changeTab.bind(this) }
    //             tabBarPosition='bottom'
    //             renderTabBar={() => <TabBottom activeTabColor={'rgb(91, 144, 240)'} unactiveTabColor={config.black_color}  tabNames={tabTitles}
    //                                             tabIconNames={tabIcon}
    //                                             selectedTabIconNames={tabSelectedIcon}/>
    //                         }
    //             tabBarBackgroundColor={config.white_color}
    //             tabBarActiveTextColor={config.blue_color}
    //             tabBarUnderlineStyle={{backgroundColor: config.blue_color}}
    //             >
    //             <MineField ref='mf' callback={this.refresh.bind(this)} {...this.props} {...user}/> 
    //             <My ref='my' callback={this.refresh.bind(this)} {...this.props} {...user}/> 
    //         </ScrollableTabView>
    //     </View>
    //   );
    // }

    /**
     * 刷新页面
     * @param {*} key 
     */
    refresh(key){
        this.setState({
            state:key
        })
    }


    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('刷新数据')
        }
        this.setState({currentAppState: nextAppState});
    }
}