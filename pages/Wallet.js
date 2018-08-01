import React, {Component} from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    ListView,
    Platform
} from 'react-native';
import Text from '../component/T_Text';
import Storage from '../storage';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../config';
import StatusBar from '../component/T_StatusBar';
import SytleUtils from './StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../component/T_ProgressBar';
import * as walletManager from '../service/welletService';
import Toast, {DURATION} from 'react-native-easy-toast';
// import SGListView from 'react-native-sglistview';
const top_heigh = (config.height * 0.45 - 75) > 141 ? config.height * 0.45 - 75 : 200;
const margin = Platform.select({
    ios:{
        marginTop: (config.height * 0.45 - 75) > 141 ? 40 : 60
    },
    android:{
        marginTop: 30
    }
})
/**
 * 钱包首页
 */
export default class Wallet extends Component{

    constructor(props){
        super(props);
        this.state = {
            walletUserName:'未知',
        }
        this.wallet = this.props.wallet;
    }


    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }
    _openDrawer(){
        Actions.drawerOpen();
        // this.props.navigation.navigate('DrawerOpen')
    }
    _openHangQing(){
        Actions.quotation();
    }

    _renderRow(rowData, sectionID, rowID){
        return (<Text>{rowData.title}</Text>)
    }


    render(){

        
        return(

            <View style={SytleUtils.container}>
                <View style={styles.top_content}>
                    <LinearGradient colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)',]} style={styles.top_content_top}>
                        
                        <View style={[styles.top_row_style,SytleUtils.header]}>
                            <TouchableOpacity onPress={this._openHangQing} underlayColor={config.button_blue_underlayColor}>
                                <Text style={[styles.text_style,{fontSize: 16,fontWeight: 'bold',}]}>行情</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={this._openDrawer} underlayColor={config.button_blue_underlayColor}>
                                <Text style={[styles.text_style,{fontSize: 16,fontWeight: 'bold',}]}>钱包</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={()=>{
                                this.toWalletDetail();
                        }}>
                            <Image style={{width: 50, height: 50}}  source={require('./../../images/100_logo-09.png')}></Image>
                        </TouchableOpacity>
                        
                        <Text style={[styles.text_style,{marginTop: 10},{fontSize: 16,fontWeight: 'bold',}]}>{this.props.wallet.wallet_nick}</Text>
                        
                        <View style={{flexDirection:'row', alignItems:'center',marginTop: 10}}>
                        {/* <TouchableOpacity onPress={()=>{
                                this.toTransactionRecord();
                        }}> */}
                            <Text numberOfLines={1} style={[styles.text_style,{marginRight: 10, width: config.width * 0.7},{fontSize: 14,fontWeight: 'bold',}]}>{this.props.wallet.address ? this.props.wallet.address : ''}</Text>
                        {/* </TouchableOpacity> */}

                        {/* <TouchableOpacity onPress={()=>{Actions.receivablesCode({wallet: this.props.wallet})}}> */}
                        <Image style={{width: 15, height: 15}}  source={require('./../../images/receivables.png')} />
                        {/* </TouchableOpacity> */}
                        </View>

                    </LinearGradient>
                    <View style={[styles.top_content_bottom]}>
                        <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color }]}>
                            <View style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row', alignItems: 'center'}]}>
                                <Text style={[styles.top_content_bottom_view_text,{fontSize: 14,fontWeight: 'bold',}]}>总资产($)</Text>
                                <Text style={[styles.top_content_bottom_view_text,{fontSize: 20,fontWeight: 'bold'}]}>≈{this.props.wallet.price ? this.props.wallet.price.toFixed(2) : 0}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>

                <View style={margin}> 
                    <View style={[SytleUtils.card, SytleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color }]}>
                        <TouchableOpacity onPress={()=>{
                                this.toTransactionRecord();
                        }} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row'}]}>
                            <View style={[styles.content_item_left]}>
                                <Image style={styles.icon} resizeMode='contain'  source={require('./../../images/ETH.png')}></Image>
                                <Text style={styles.content_item_txt}>ETH</Text>
                            </View>
                            <View style={styles.content_item_right}>
                                <View><Text numberOfLines={1} style={[styles.content_item_right_txt,{fontSize:20}]}>{this.props.wallet.eth ? this.props.wallet.eth : 0}</Text></View>
                                {/* <View><Text style={styles.content_item_right_txt}>≈ ¥ 0</Text></View> */}
                            </View>
                        </TouchableOpacity>

                        <View style={[SytleUtils.space, {width: config.width * 0.9}]}></View>
                        
                        <TouchableOpacity onPress={()=>{
                                this.toTransactionRecord(true);
                        }} style={[SytleUtils.cardItem, {justifyContent: 'space-between',flexDirection:'row'}]}>
                        <View style={styles.content_item_left}>
                            <Image style={styles.icon}  source={require('./../../images/100_logo-09.png')}></Image>
                            <Text style={styles.content_item_txt}>HOUR</Text>
                        </View>
                        <View style={styles.content_item_right}>
                            <View><Text numberOfLines={1} style={[styles.content_item_right_txt,{fontSize:20}]}>{this.props.wallet.hour ? this.props.wallet.hour : 0}</Text></View>
                            {/* <View><Text style={styles.content_item_right_txt}>≈ ¥ 0</Text></View> */}
                        </View>
                        </TouchableOpacity>
                    </View>                
                   
                   
                </View>
                <Progress ref='progress' />
                <Toast ref='toast' />
            </View> 
        )
    }
    /**
     * 进入钱包详细
     */
    toWalletDetail(){
        if(this.props.isflag){
            Actions.walletDetail({'title': this.props.wallet.wallet_nick, ...this.props.wallet});
        }else{
            Actions.createWalletOne();
        }
    }

    /**
     * 进入钱包交易记录 
     */
    toTransactionRecord(hour){
        let param = hour ? {'title': this.props.wallet.wallet_nick, 'wallet': this.props.wallet, 'hour': true} : {'title': this.props.wallet.wallet_nick, 'wallet': this.props.wallet};
        if(this.props.isflag){
            Actions.transactionRecord(param); 
        }else{
            Actions.createWalletOne();
        }
    }

    /**
     * 组件显示后加载本地钱包地址
     */
    componentWillMount(){       
        this.loadData();
    }

    loadData(){
        Storage._load('walletAddress', (data)=>{           
            if(data){
                Actions.refresh({'wallet': data[0], isflag: true});
                this.getRemainingSum(data[0]);
            }
        })
    }
    componentDidUpdate(){
        /**
            当切换钱包的时候获取新钱包的内容
         */
        if(this.wallet.address && this.wallet.address != this.props.wallet.address){
            this.wallet = this.props.wallet;
            this.getRemainingSum(this.props.wallet);
        }else if(!this.wallet.address && this.props.wallet.address){
            this.wallet = this.props.wallet;
        }
    }

    /**
     * 获取本地钱包余额
     * @param {钱包} wallet 
     */
    getRemainingSum(wallet){       
        this.refs.progress.setModalVisible(true);       
        let flag = 0;
        walletManager.getEthRemainingSum(wallet, (data)=>{
            if(data){
                if(1 == data.status){
                    if(++flag == 2){
                        this.refs.progress.setModalVisible(false);
                    }
                    let eth = '';
                    if(Array.isArray(data.result)){
                        data.result.map((item)=>{
                            if(item.account == wallet.address){
                                eth = item.balance / 1000000000000000000;
                                Actions.refresh({wallet: {
                                    ...this.props.wallet,
                                    'eth': eth
                                }})


                                setTimeout(() => {
                                    this.ethToMoney();
                                }, 50);

                            }
                        })
                    }
                }else{
                    this.refs.progress.setModalVisible(false);
                    this.refs.toast.show(data.message);
                }
            }else{
                this.refs.progress.setModalVisible(false);
                this.refs.toast.show('服务器忙，稍后再试');
            }
        });

        walletManager.getHourRemainingSum(wallet, (data)=>{
            if(data){
                if(1 == data.status){
                    if(++flag == 2){
                        this.refs.progress.setModalVisible(false);
                    }
                    let hour = data.result / 1000000000000000000;                   
                    Actions.refresh({wallet: {
                        ...this.props.wallet,
                        'hour': hour
                    }})
                }else{
                    this.refs.progress.setModalVisible(false);
                    this.refs.toast.show(data.message);
                }
            }else{
                this.refs.progress.setModalVisible(false);
                this.refs.toast.show('服务器忙，稍后再试');
            }
        });
    }

    /**
     * 获取eth价格
     */
    ethToMoney(){

        walletManager.getRMBValue('eth_usdt', (data)=>{              
            if(data){
                let result = {
                    name: data.symbol,
                    price: data.data[0][4],
                    zero_price: data.data[0][1],
                    max_price: data.data[0][2],
                    min_price: data.data[0][3],
                    volume: data.data[0][5],
                    num: (data.data[0][4] - data.data[0][1]) / data.data[0][1]
                }
                Actions.refresh({wallet: {
                    ...this.props.wallet,
                    'price': this.props.wallet.eth * data.data[0][4]
                }})
                
            }else{
                
            }
        });
    }


}

const styles = StyleSheet.create({
    container:{
        flex : 1,  
    },
    top_content:{
        height: config.height * 0.35,
        alignItems:'center'
    },
    top_content_top:{
        height: top_heigh,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        alignItems:'center'
    },
    space:{
        height: 1 * config.pixel,
        width: config.width - config.width * 0.05,
        marginLeft: config.width * 0.025,
        // backgroundColor:config.space_color
    },
    icon:{
        width: 40,
        height: 40
    },
    content:{
        elevation: 3,
        width: config.width - config.width * 0.05,
        marginLeft: config.width * 0.025,
        borderRadius: 5,
        padding: 6,
        backgroundColor: config.white_color,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content_item_left:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    content_item_txt:{
        color: config.black_color,
        fontSize: 16,
        marginLeft: 8
    },
    content_item_right:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    content_item_right_txt:{
        textAlign:'right',
        color: config.black_color
    },
    bottom_content:{

    },
    text_style:{
        color:config.white_color, 
    },
    top_row_style:{
        padding:8,
        width:config.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    top_content_bottom:{
        width: config.width,  
        height: config.height / 10,
        position: 'absolute',
        top:top_heigh - (config.height / 10) / 2,
        justifyContent:'center',
        alignItems: 'center',
    },
    top_content_bottom_view:{
        height: config.height / 10 * 0.8,
        backgroundColor: config.white_color,
        borderRadius: 5,
        width: config.width * 0.9,
        padding: 6,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    top_content_bottom_view_text:{
        color:config.black_color,
    },
    list_view:{
        width: config.width - config.width * 0.05,
        marginLeft: config.width * 0.025,
        // padding: 6,
        // borderRadius: 5,
        // elevation:4
    }

});