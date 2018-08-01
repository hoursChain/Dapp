import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';
import StatusBar from '../../component/T_StatusBar';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StyleUtils from '../StyleUtils';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Alert from '../../component/T_Alert';
import SGListView from 'react-native-sglistview';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as walletManager from '../../service/welletService';

/**
 * 行情
 */
export default class Quotation extends Component{

    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid });
        this.state = {
            listData:[]
        }
        this.targerList = ['eth_usdt','btc_usdt'];
    }

    getDataSource(){     
        return this.dataSource.cloneWithRows(this.state.listData);
    }

    renderRow(rowData, sectionID, rowID) {

        let numRow = rowData.num > 0 ? 
            <Text numberOfLines={1} style={{maxWidth:config.width * 0.4, padding: 4, borderRadius: 5,backgroundColor: 'rgb(82, 138, 115)', color: config.white_color}}>{(rowData.num * 100).toFixed(4)+'%'}</Text> : 
            <Text numberOfLines={1} style={{maxWidth:config.width * 0.4, padding: 4, borderRadius: 5,backgroundColor: 'red', color: config.white_color}}>{(rowData.num * 100).toFixed(4)+'%'}</Text>;

        return (
            <View key={sectionID} style={[styles.item_view, StyleUtils.shadowStyle]}>
                <StatusBar/>
                <View style={styles.item_view_sub1}>
                    {/* <Image style={styles.item_view_sub1_icon} source={require('./../../../images/150_logo_shaow.png')}/> */}
                    <Text style={styles.name_style}>{rowData.name}</Text>
                </View>
                <View style={[StyleUtils.space,{marginBottom: 8, marginTop: 8}]}></View>
                <View style={[styles.item_view_sub1,{justifyContent:'space-between'}]}>
                    <Text style={{color: config.blue_color, fontSize: 18}}>${rowData.price}</Text>
                    {numRow}
                </View>
                <View style={[styles.item_view_sub1,{marginTop: 12,justifyContent:'space-around'}]}>
                    <Text style={{color: config.black_color, width: config.width * 0.9 * 0.23, textAlign:'center'}}>零点价</Text>
                    <Text style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>最高价</Text>
                    <Text style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>最低价</Text>
                    <Text style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>成交量</Text>
                </View>
                <View style={[styles.item_view_sub1,{marginTop: 6,justifyContent:'space-around'}]}>
                    <Text numberOfLines={1} style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>${rowData.zero_price}</Text>
                    <Text numberOfLines={1} style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>${rowData.max_price}</Text>
                    <Text numberOfLines={1} style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>${rowData.min_price}</Text>
                    <Text numberOfLines={1} style={{color: config.black_color,width: config.width * 0.9 * 0.23, textAlign:'center'}}>${rowData.volume}</Text>
                </View>
            </View>
        );
    }

    render(){
        let views = [];

        this.state.listData.map((item, index)=>{
            views.push(
                this.renderRow(item, index, '')
            )
        })

        return(
            <View style={[styles.container, StyleUtils.container]}>
            <StatusBar />
                {views}
                {/* <SGListView style={{width: config.width * 0.9, marginBottom: 10,}}
                    ref='list'
                    keyboardDismissMode='on-drag'
                    dataSource={this.getDataSource()}
                    renderRow={this.renderRow}
                    // onEndReached={this.props.onEndReached}
                    initialListSize={2}
                    stickyHeaderIndices={[]}
                    onEndReachedThreshold={1}
                    scrollRenderAheadDistance={1}
                    pageSize={1}
                /> */}
                <Progress ref='progress'/>
                <Toast ref='toast' />
            </View>
        );
    }


    componentDidMount(){
        this.findMessage();
        // setTimeout(()=>{
        //     this.findHorMessage();
        // }, 500);
        
    }

    findMessage(){
        let flag = 0;
        this.refs.progress.setModalVisible(true);
        let len = this.targerList.length;
        this.targerList.map((item, index)=>{
            walletManager.getRMBValue(item, (data)=>{              
                if(data){
                    if(++flag == len){
                        this.refs.progress.setModalVisible(false);
                    }                                       

                    let result = {
                        name: data.symbol,
                        price: data.data[0][4],
                        zero_price: data.data[0][1],
                        max_price: data.data[0][2],
                        min_price: data.data[0][3],
                        volume: data.data[0][5],
                        num: (data.data[0][4] - data.data[0][1]) / data.data[0][1]
                    }

                    let list = this.state.listData;
                    
                    list.push(result);
                                
                    this.setState({
                        listData: list
                    })

                }else{
                    this.refs.progress.setModalVisible(false);
                    this.refs.toast.show('服务器忙，稍后再试'); 
                }
            });
        })

    }


    findHorMessage(){
        walletManager.getHorValue(data=>{
           
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

                let list = this.state.listData;
                
                list.push(result);
                            
                this.setState({
                    listData: list
                })
            }
        })
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(238, 238, 244)',
    },
    item_view:{
        marginTop: 10,
        backgroundColor: config.white_color,
        borderRadius: 5,
        padding: 10,
        elevation:3,
        margin: 4
        
    },
    item_view_sub1:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_view_sub1_icon:{
        width: 25,
        height: 25
    },
    name_style:{
        color: config.black_color,
        marginLeft: 6,
        fontSize: 16,
    }
})

