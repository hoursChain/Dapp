import React, {Component} from 'react';
import {
    View, Text, Image, TouchableOpacity, AppState, ImageBackground
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import StatusBar from '../component/T_StatusBar';
import config from '../config';
import StyleUtils from './StyleUtils';
import TabComponent from '../component/T_TabComponent';
import Mineral from '../component/T_Mineral';

import  MText  from "./../component/T_MText";

export default class MineField extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
            dataList:[1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataView:[]
        } 
    }

    render(){

        if(this.state.dataView.length == 0){
            this.state.dataView = this.renderMineralView(this.state.dataList);
        }

        return(
          <TabComponent ref='tc' colors={[config.statusBar_backgroundColor, config.statusBar_backgroundColor]}> 
             <ImageBackground style={{width: config.width, flex:7}} source={require('./../../images/mf_bg.png')}>
                <View style={{paddingLeft: 16, paddingRight: 16,flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingBottom: 16}}>
                    {this.renderIconMessageView(require('./../../images/1-1_07.png'), this.props.integral ? this.props.integral : 0)}
                    {this.renderIconMessageView(require('./../../images/1-1_09.png'), 0)}  
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    {this.state.dataView}
                </View>
                {this.renderMessageView()}
             </ImageBackground>
             <View style={{width: config.width, flex:3, backgroundColor: config.statusBar_backgroundColor}}>
                <View style={{width: config.width, flex:1, backgroundColor: config.white_color, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 20, paddingLeft: 16, paddingRight: 16}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontSize: 16, color: '#666666'}}>算力提升</Text>
                        <Text style={{fontSize: 16, color: '#666666'}}>更多</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                        {this.renderRenWuList(0,require('./../../images/1-1_25.png'), '每日签到', '已完成' )}
                        {this.renderRenWuList(1,require('./../../images/1-1_27.png'), '每日问题', '+1算力' )}
                        {this.renderRenWuList(2,require('./../../images/1-1_29.png'), '好友邀请', '+1算力' )}
                    </View>
                </View>
             </View>
          </TabComponent>  
        )
    }

    _selectRenwuClick(title){
        switch (title) {
            case '每日签到':
                alert(title);
                break;
            case '每日问题':
                Actions.webMessage({title: '答题游戏', uri: config.base_url + config.hour_questionnaire});
                break;
            case '好友邀请':
                alert(title);
                break;
        }
    }

    renderRenWuList(index, image, title, detil){
        return(
            <TouchableOpacity onPress={()=>{
                this._selectRenwuClick(title);
            }} key={index} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Image style={{width: 40, height: 40}} source={image} />
                <Text style={{color: '#333333', fontSize: 14, marginTop: 10, marginBottom: 4}}>{title}</Text>
                <Text style={{color: '#333333', fontSize: 14, marginTop: 4, marginBottom: 4}}>{detil}</Text>
            </TouchableOpacity>
        );
    }


    /**
     * 
     * @param {图片} image 
     * @param {文字} text 
     */
    renderIconMessageView(image, text){
        return(
            <View style={{flexDirection:'row', alignItems:'center', padding: 4}}> 
                <Image style={{width: 25, height: 25}} source={image} />          
                <View style={{ paddingLeft: 15, paddingTop: 4, paddingBottom:4, paddingRight: 15,marginTop: 4, marginBottom:4, 
                        borderTopRightRadius: 40, borderBottomRightRadius: 40,backgroundColor: 'rgb(35,26,60)'}}>
                    <Text style={{fontSize: 14, color: config.white_color}}>{text}</Text>
                </View>
            </View>
        );
    }

    /**
     * 底部滚动消息
     * @param {活动滚动数据，id message} data 
     */
    renderMessageView(data){
        let views = []
        if(!data || data.length == 0){
            data = ['asdfasdf', '123123', 'dlfkjgskdfj', 'asdfasdf', 'sdfasdf'];            
        }

        data.map((item, index)=>{
            views.push(this.renderMessageViewItem(index ,item));
        })

        return(
            <View style={{marginLeft: 16, marginRight: 16, marginBottom: 8, paddingLeft: 8, paddingRight: 8, borderRadius: 15,flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor: 'rgb(35,26,60)'}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width: 25, height: 25}} source={require('./../../images/1-1_17.png')} />
                    <MText style={{marginLeft:4,fontSize: 14, color: config.white_color}}>
                        {views}
                    </MText>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width: 25, height: 25}}  />
                    <Text style={{marginLeft:4, fontSize: 14, color: config.white_color}}>更多></Text>
                </View>   
            </View>
        );
    }
    /**
     * 
     * @param {活动滚动试图数据， id  message} item 
     */
    renderMessageViewItem(index, item){
        return(
            <View key={index} style={{height: 40,justifyContent: 'center',}}>
                <Text style={{marginLeft: 5, fontSize: 14,color: '#fff'}}>{item}</Text>
            </View>
        )
    }

    /**
     * 根据矿石集合创建对应矿石位置
     * @param {矿石集合} array 
     */
    renderMineralView(array){
        let arrayView = []


        array.map((item, index)=>{
            arrayView.push(
                this.renderMineralViewItem(index, item,  this.randomFrom(30, config.height * 0.4), this.randomFrom(30, config.width - 60))
            )
        })

        if(arrayView.length == 0){
            arrayView.push(
                <View key={0} style={{justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width: 40, height: 40}} source={require('./../../images/1-1_03.png')} />
                    <Text style={{fontSize: 14, color: config.white_color, marginTop: 8}}>挖矿中</Text>
                </View>  
            )
        }


        return arrayView;
    }
    
    itemClick(item){
        let array = [];
        let arrayView = [];
        let index;
        let source;
        this.state.dataList.map((data, i)=>{
            if(item != data){
                array.push(data)
            }else{
                index = i;
            }
        });

        

        this.state.dataView.map((view, i)=>{
            if(i != index){
                arrayView.push(view)
            }
        })

        
        this.setState({
            dataList: array,
            dataView: arrayView
        })

        global.user.integral = global.user.integral + item;
        
        Actions.refresh({integral: global.user.integral})

    }

    /**
     * 
     * @param {序号} index 
     * @param {矿石数据} item 
     * @param {顶部位置} top 
     * @param {左边位置} left 
     */
    renderMineralViewItem(index, item, top, left){
        return(
            <Mineral item={item} key={index} top={top} left={left} onPress={()=>{this.itemClick(item)}}/>
        )
    }

    /**
     * 随机数
     * @param {开始位置} lowerValue 
     * @param {结束位置} upperValue 
     */
    randomFrom(lowerValue,upperValue)
    {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }


    /**
     *
     * 当界面UI加载完成被调用
     * @memberof MineField
     */
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.mineFieldData();
    }
    
    /**
     * 当界面将要被销毁时被调用
     *
     * @memberof MineField
     */
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            //当界面由后台返回前端的时候调用
            //判断当前前台界面
            if(Actions.currentScene == '_mineField'){
                this.mineFieldData();
            }
            
        }
        this.setState({currentAppState: nextAppState});
    }

    /**
     *
     * 向服务器获取用户矿石数据
     * @memberof MineField
     */
    mineFieldData(){
        this.refs.tc.progressShow();

        setTimeout(()=>{
            this.refs.tc.progressHidden();
        }, 2000);
    }

}
