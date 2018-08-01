/**
 * Created by tianzhw on 2017/7/28.
 * 滚轮日期，数字 效果
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import Text from './T_Text';
import Utils from '../config';
export default class T_ScrollSelectView extends Component {

    constructor(props){
        super(props);
        this.state = {
            page: this.props.selectIndex,
            endNum:  this.props.endNum
        }


        this._eventReturn.bind(this);
    }



    render() {
        //子项高度  默认像是5个item 所以View高度是item五倍
        let itemHeight = this.props.itemHeight;
        //显示内容开始数字
        let start = this.props.startNum;
        // //显示内容结束数字
        // let end = this.props.endNum;

        let contentList = [];

        for (let i = start; i <= this.state.endNum; i++){
            let style = {
                color :'rgba(79, 128, 251,0.3)'
            };
            if ((i - 2) > 0 && (i - 3) == this.state.page){
                style.color = 'rgba(79, 128, 251,0.3)';
            }


            if ((i - 2) > 0 && (i - 2) == this.state.page){
                style.color = 'rgba(79, 128, 251,0.4)';
            }

            if ((i - 1) > 0 && (i - 1) == this.state.page){
                style.color = 'rgba(79, 128, 251,0.8)';
            }

            if (i == this.state.page){
                // style.borderTopWidth = 1;
                // style.borderBottomWidth = 1;
                // style.borderColor='#fff';
                // style.paddingTop=4;
                // style.paddingBottom=4;
                style.color =  'rgb(79, 128, 251)';
            }

            if ((i + 1) == this.state.page){
                style.color = 'rgba(79, 128, 251,0.8)';
            }

            if ((i + 2) == this.state.page){
                style.color = 'rgba(79, 128, 251,0.4)';
            }

            if ((i + 3) == this.state.page){
                style.color = 'rgba(79, 128, 251,0.3)';
            }

            contentList.push(
                <View key={i} style={{height: itemHeight, justifyContent:'center', alignItems:'center'}}>
                    <Text style={style}>{i}</Text>
                </View>
            )
        }

        console.log("state", this.state.endNum);

        return (
                <View style={[{height:itemHeight * 3, width: this.props.width}]}>
                    <ScrollView  ref="scrollView" showsVerticalScrollIndicator={false}
                                onScrollEndDrag={event=>{
                                    this._eventReturn(event)

                                }} onMomentumScrollEnd={event=>{
                                     this._eventReturn(event)
                                }}>
                        {/* <View style={{height: itemHeight, justifyContent:'center', alignItems:'center'}}>

                        </View> */}
                        <View style={{height: itemHeight, justifyContent:'center', alignItems:'center'}}>

                        </View>

                        {contentList}

                        <View style={{height: itemHeight, justifyContent:'center', alignItems:'center'}}>

                        </View>
                        {/* <View style={{height: itemHeight, justifyContent:'center', alignItems:'center'}}>

                        </View> */}
                    </ScrollView>

                    <View style={{position:'absolute',height:4 * Utils.pixel, width: this.props.width, backgroundColor:'rgb(79, 128, 251)', top:itemHeight * 1}}></View>

                    <View style={{position:'absolute',height:4 * Utils.pixel, width: this.props.width, backgroundColor:'rgb(79, 128, 251)', top:itemHeight * 2}}></View>
                </View>
        );
    }

    componentDidUpdate(){
        // this.props.result ? this.props.result(this.state.page) : "";
    }

    _updateEndNum(endNum){
        // this.setState({
        //     endNum: endNum,
        //     page: 1
        // });

        if (isNaN(endNum)){
            endNum = 31;
        }

        this.state.page = 1;
        this.state.endNum = endNum;

        setTimeout(()=>{
            let num =  (1 - this.props.startNum) * this.props.itemHeight;
            this.refs.scrollView.scrollTo({y:num, animated:false});
        }, 0);
    }

    componentDidMount(){

        setTimeout(()=>{
            let num =  (this.props.selectIndex - this.props.startNum) * this.props.itemHeight;
            this.refs.scrollView.scrollTo({y:num, animated:false});
        }, 0);

    }

    _eventReturn(event){
        let offsetY = event.nativeEvent.contentOffset.y;

        console.log(offsetY);

        let result = offsetY % this.props.itemHeight;

        console.log("result = ",result);

        let res;
        if (result > 0){
            res = this.props.itemHeight - result + offsetY;
        }else{
            res = offsetY;
        }

        this.refs.scrollView.scrollTo({y:res, animated:false});
        let page = res / this.props.itemHeight + this.props.startNum;

        // console.log("page = ",page);

        // this.state.page = page;

        this.setState({
            page: page
        })

        setTimeout(()=>{
            this.props.result ? this.props.result(this.state.page) : "";
        }, 50)
        
    }
}