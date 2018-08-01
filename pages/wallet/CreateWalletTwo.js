import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import Alert from '../../component/T_Alert';
import config from '../../config';
import BlueButton from '../../component/T_Blue_Button';
import * as encryption from '../../utils/encryption';
import Toast, {DURATION} from 'react-native-easy-toast';
import Storage from '../../storage';

import StatusBar from '../../component/T_StatusBar';
/**
 * 创建钱包第一个界面获取昵称密码
 */
export default class CreateWalletOne extends Component{

    constructor(props){
        super(props);
        this.state = {
            wallet: this.props.wallet,
            modalVisible: true,
            data: encryption.mysendJIEmi(this.props.wallet.seed1),
            newData: '',
            next: 0,
        }
        this.tempSet = [];
        this.result = [];
    }
    setModalVisible(f){
        this.setState({
            modalVisible:f
        })
    }
    render(){

        let root = '';
        if(this.state.next == 0){
            root = this.render_0();
        }else {
            root = this.render_1();
        }

        return(
            <View style={{flex: 1}}>
                {root}   
            </View>
        );
    }

    clickTextItem(text){
        //alert(text);
    }
    /**
     * 确认助记词已经记录
     */
    render_1(){
        let array = this.copyArray(this.tempSet);
        
        let subView = [];

        array.map((item, index)=>{
            
            subView.push(
                
                <TouchableOpacity onPress={()=>{
                    this.tempSet = this.clearArrayItem(this.tempSet, item);
                        if(this.state.newData.length == 0){
                            
                            this.setState({newData: item});

                        }else{
                            this.setState({newData: this.state.newData + " " + item});
                        }
                        
                }} key={index} >
                        <Text style={styles.sub_txt}>{item}</Text>
                </TouchableOpacity>
            )
        });

        return(
            <View style={styles.container}>
            <StatusBar />
                <View style={styles.space}></View>
                <Text style={styles.top_txt}>验证您的钱包助记词</Text>
                <View style={styles.top_message}>
                    <Text style={styles.top_message_txt}>助记词有助于回复钱包和重置钱包密码，将它准确的抄写在纸上，并存放在只有你知道的地方</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.content_txt}>
                        {this.state.newData}
                    </Text>
                </View>
                <View style={[styles.content,{flexWrap: 'wrap',alignItems:'flex-start',flexDirection: 'row'}]}>
                    {subView}
                </View>

                <BlueButton title='下一步' txtColor={config.white_color} onPress={()=>{
                    if(this.state.data == this.state.newData){
                        let wallet = this.state.wallet;
                        let wallet_address = [];
                        Storage._load(config.WALLET_ADDRESS, (data)=>{
                            if(data){
                                data.push({
                                    ...wallet
                                }) 
                                Storage._sava(config.WALLET_ADDRESS,data);
                            }else{
                                wallet_address.push({
                                    ...wallet
                                }) 
                                Storage._sava(config.WALLET_ADDRESS,wallet_address);
                            }
                            Actions.main({'wallet': wallet});
                        })
  
                    }else{
                        let array = this.state.data.split(' '); 
                    
                        array.sort(function(){ return 0.5 - Math.random() })
                        this.tempSet = array.join().split(',');

                        this.refs.toast.show('顺序不一致');
                        this.result = [];
                        this.setState({
                            newData:[]
                        })
                    }
                }} />

                <BlueButton title='重置' txtColor={config.white_color} onPress={()=>{
                    let array = this.state.data.split(' '); 
                    
                    array.sort(function(){ return 0.5 - Math.random() })
                    this.tempSet = array.join().split(',');

                    this.result = [];
                    this.setState({
                        newData:[]
                    })
                }} />
                <Alert ref='alert' mode='error'  />
                <Toast ref='toast' />
            </View>
            
        );
    }
    /**第一个界面 显示助记词 */
    render_0(){
        return(
            <View style={styles.container}>
            <StatusBar />
                <View style={styles.space}></View>
                <Text style={styles.top_txt}>抄写下你的钱包助记词</Text>
                <View style={styles.top_message}>
                    <Text style={styles.top_message_txt}>助记词有助于回复钱包和重置钱包密码，将它准确的抄写在纸上，并存放在只有你知道的地方</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.content_txt}>
                        {this.state.data}
                    </Text>
                </View>
                <BlueButton txtColor={config.white_color} title='下一步' onPress={()=>{

                   let array = this.state.data.split(' '); 
                    
                   array.sort(function(){ return 0.5 - Math.random() })
                   this.tempSet = array.join().split(',');

                   this.setState({
                       next: 1
                   })
                }} style={[styles.content, {backgroundColor: config.blue_color, padding: 8, borderRadius: 5, alignItems:'center'}]}>
                </BlueButton>
                <Alert ref='alert' mode='error'  />
                <Toast ref='toast' />
            </View>
            
        );
    }
    
    /* 使用循环的方式判断一个元素是否存在于一个数组中
    * @param {Object} arr 数组
    * @param {Object} value 元素值
    */
    isInArray(arr,value){
       for(var i = 0; i < arr.length; i++){
           if(value === arr[i]){
               return true;
           }
       }
       return false;
   }


   clearArrayItem(array, item){
       let index = 0;
       let temp = this.copyArray(array);
       let result = [];
       temp.map((sub)=>{
           if(sub != item || index == 1){
                result.push(sub);
           }else{
             index=1;
           }
       })
       return result;
   }

   copyArray(array){
       let newData = [];
       array.map(item=>{
            newData.push(item);
       })
       return newData;
   }

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor:config.white_color
    },
    space:{
        height: 1 * config.pixel,
        backgroundColor: config.space_color,
        width: config.width
    },
    top_txt:{
        color: config.black_color,
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    top_message:{
        width: config.width * 0.9,
        alignItems: 'center',
    },
    top_message_txt:{
        color: '#666666',
        fontSize: 12,
        marginTop: 8
    },
    content:{
        width: config.width * 0.9,
        marginTop: 6,
        
    },
    content_txt:{
        backgroundColor: config.space_color,
        width: config.width * 0.9,
        padding: 8,
        color: config.black_color,
    },
    sub_txt:{
        borderColor: config.space_color,
        borderWidth: 1 * config.pixel,
        padding: 2,
        textAlign:'center',
        marginLeft: 8,
        marginBottom: 8,
    }
});