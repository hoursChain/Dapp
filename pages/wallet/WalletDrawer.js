import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Text from '../../component/T_Text';
import config from '../../config';
import {Actions} from 'react-native-router-flux';
import Storage from '../../storage';
import StyleUtils from '../StyleUtils';
export default class WalletDrawer extends Component{

    constructor(props){
        super(props);
        this.state = {
            drawerSelect: 0,
            walletList:[]
        }
    }

    render() {        

        let item_view = [];
        
        if(this.state.walletList && Array.isArray(this.state.walletList)){
            
            for(let i=0; i < this.state.walletList.length; i++){
                let item = this.state.walletList[i];
                let style = [styles.item];
                if(this.state.drawerSelect && this.state.drawerSelect == i){
                    style.push({backgroundColor: config.space_color});
                }else{
                    // style.push({backgroundColor: config.space_color});
                }
    
                item_view.push(
                    <TouchableOpacity key={i} style={style} onPress={()=>{
                        this.setState({
                            drawerSelect: i
                        });
                        Actions.pop({refresh:{'wallet': item}})
                        Actions.drawerClose();
                    }}>
                        <Image style={{width: 30, height: 30}} source={require('./../../../images/100_logo-09.png')} />
                        <Text style={styles.item_txt}>{item.wallet_nick}</Text>  
                    </TouchableOpacity>
                )
                
    
    
            }
        }
        

        return (
            // SafeAreaView 适配 iPhoneX 的 会自动添加安全区域 可以试试换成View 然后在模拟器或者真机下跑 内容会占据顶部状态栏 加了则会自动加上边距 把内容顶下来
            <View style={[styles.container, StyleUtils.header]}>
                {item_view}
                <View style={styles.space}></View>
                <TouchableOpacity style={[styles.item, {marginTop: 10}]} onPress={()=>{
                    Actions.createWalletOne();                   
                }}>
                    <Image resizeMode='contain' style={{width: 17, height: 17, marginLeft: 10}} source={require('./../../../images/wallet_manager.png')} />
                    <Text style={styles.item_txt}>创建钱包</Text>
                </TouchableOpacity>
            </View>
        )
    }
    

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        Storage._load('walletAddress', (data)=>{
            if(data){
                this.setState({walletList: data});
            }
       });
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: config.white_color,
        paddingTop: 20,
    },
    space:{
        backgroundColor: config.space_color,
        height: config.pixel * 1,
    },
    item:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6
    },
    item_txt:{
        marginLeft: 6,
        color:'#333333',
        fontSize: 14,
    }

});