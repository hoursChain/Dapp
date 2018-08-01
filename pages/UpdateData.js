import React, {Component} from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    PermissionsAndroid,
    Platform
} from 'react-native';
import Text from '../component/T_Text';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../config';
import StatusBar from '../component/T_StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import StyleUtils from './StyleUtils';
import ImagePicker from 'react-native-image-picker';
import Alert from '../component/T_Alert';
import Progress from '../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import BlueButton from '../component/T_Blue_Button';
import * as imageService from '../service/ImageService';

const top_heigh = (config.height * 0.45 - 75) > 141 ? config.height * 0.45 - 75 : 200;
const margin = Platform.select({
    ios:{
        marginTop: (config.height * 0.45 - 75) > 141 ? 40 : 80
    },
    android:{
        marginTop: 30
    }
})

export default class UpdateData extends Component{
    constructor(props){
        super(props);
        this.state = {
            uploadList:[],
            updateCount: 0
        }
        
  
  
      }
      render() {
        let listItem = [];
       
        this.state.uploadList.map((item, index)=>{
            listItem.push(
                this.renderMenuItem(item, index)
            )
        })

        if(this.state.uploadList.length == 0){
            listItem.push(
                this.renderEmpty()
            )

        }


        return (
          <View style={StyleUtils.container}>
                
                <View style={styles.top_content}>
                    <LinearGradient colors={[config.blue_color, 'rgb(82,115,250)', 'rgb(92,142,251)',]} style={[styles.top_content_top, StyleUtils.header]}>
                    <TouchableOpacity onPress={()=>this.refs.selectMenu.setModalVisible(true)}>
                        <Image style={{width: 50, height: 50, margin: 10, marginTop: 20}} source={require('./../../images/100_logo-09.png')}/>
                     </TouchableOpacity>
                     <View style={{width: config.width - 50, flexDirection: 'row', marginTop: 15}}>
                         <View style={{width: (config.width - 50) / 2, justifyContent:'center', alignItems:'center'}}>
                             <Text style={[styles.tab_txt, {fontSize: 16}]}>上传次数</Text>
                             <Text style={[styles.tab_txt, {fontSize: 14}]}>{this.state.uploadCount}</Text>
                         </View>
                         <View style={{width: (config.width - 50) / 2, justifyContent:'center', alignItems:'center', borderColor: config.white_color, borderLeftWidth: 1 * config.pixel}}>
                             <Text style={[styles.tab_txt, {fontSize: 16}]}>积分</Text>
                             <Text style={[styles.tab_txt,{fontSize: 14}]}>{global.user.integral}</Text>
                         </View>
                         {/* <View style={{width: (config.width - 50) / 3, justifyContent:'center', alignItems:'center'}}>
                             <Text style={[styles.tab_txt, {fontSize: 16}]}>HOUR</Text>
                             <Text style={[styles.tab_txt,{fontSize: 14}]}>15</Text>
                         </View> */}
                     </View>
                    </LinearGradient>               
                </View>
                <View style={[styles.top_content_bottom]}>
                        <View style={[StyleUtils.card, StyleUtils.shadowStyle, {borderRadius:5, backgroundColor: config.white_color, height: config.height * 0.35 }]}>
                            <Text style={[styles.tab_txt, {padding: 8, color: '#666666', width: config.width * 0.9, fontSize: 14,  fontWeight: 'bold',}]}>最近上传</Text>
                            {listItem}
                        </View>
                        <BlueButton title='上传病历，赢积分' txtColor={config.white_color} onPress={()=>{this.refs.selectMenu.setModalVisible(true)}} width={config.width * 0.9}/>
                </View>
                <Progress ref='progress' />
                <Toast ref='toast' />
                <Alert launchCamera={this.openCamera.bind(this)}
                        launchImageLibrary={this.openImages.bind(this)} 
                        ref='selectMenu' mode='select_menu' />
                <Alert ref='ud_ok' mode='ud_ok' callback={this.loadData.bind(this)}/>
                <Alert ref='ud_error' mode='ud_error' />
                <Alert ref='ud_progress' mode='ud_progress' />
            </View> 
        );
    }

    
        
    openImages(){
        this.refs.selectMenu.setModalVisible(false);
        setTimeout(()=>{
            imageService.launchImageLibrary((data)=>{
                let params = {
                    uid: global.user.userid,
                    path: data
                }
                this.refs.ud_progress.setModalVisible(true);
                imageService.uploadImage(config.base_url + config.ocr_upLoadFile ,params).then(res=>{
                    this.refs.ud_progress.setModalVisible(false);
                    //请求成功
                    if(res.code == config.SUCCESS){
                        //这里设定服务器返回的header中statusCode为success时数据返回成功
                        this.refs.ud_ok.setModalVisible(true);
                    }else{
                        this.refs.ud_error.setModalVisible(true);
                    }
                }).catch( err=>{ 
                    this.refs.ud_progress.setModalVisible(false);
                    this.refs.ud_error.setModalVisible(true);
                });
            });
        }, 50);


        
    }

    openCamera(){
        this.refs.selectMenu.setModalVisible(false);
        setTimeout(()=>{           
            if(Platform.OS == 'android' && this.requestCameraPermission()){        
                this._openImageView();
            }else{
                this._openImageView();
            } 
        }, 50);

        
    }

    async requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              'title': '申请摄像头权限',
              'message': 'hour将拍摄您的病例文件'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("现在你获得摄像头权限了")
            return true;
          } else {
            this.refs.toast.show('没有相机权限，请在设置中开启')
            return false;
          }
        } catch (err) {
        //   console.warn(err)
          return false;
        }
    }

    _openImageView(){
        imageService.launchCamera((data)=>{
            let params = {
                uid: global.user.userid,
                path: data
            }
            this.refs.ud_progress.setModalVisible(true);
            imageService.uploadImage(config.base_url + config.ocr_upLoadFile ,params).then(res=>{
                // console.log('ok', JSON.stringify(res));
                this.refs.ud_progress.setModalVisible(false);
                //请求成功
                if(res.code == config.SUCCESS){
                    //这里设定服务器返回的header中statusCode为success时数据返回成功
                    this.refs.ud_ok.setModalVisible(true);
                }else{
                    this.refs.ud_error.setModalVisible(true);
                }
            }).catch( err=>{ 
                // console.log('err', JSON.stringify(res));
                this.refs.ud_progress.setModalVisible(false);
                this.refs.ud_error.setModalVisible(true);
            });
        });
    }
    

    renderMenuItem(item, index){
        return(
            <View key={index} style={[StyleUtils.cardItem,{padding: 8}]}>
                <View style={{width: config.width - 56, alignItems: 'center', flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={[styles.tab_txt, {color: config.black_color, padding: 0, fontSize: 12},]}>{item.filename}</Text>
                    <Text style={{color: config.blue_color, fontSize: 12}}>+{item.score}</Text>
                </View>
                <Text style={{width: config.width - 56 ,color: '#666666', paddingRight: 2, fontSize: 12}}>{item.createDate}</Text>
                <View style={[{width: config.width - 56, marginTop: 4}, StyleUtils.space,]}></View>
            </View>
        );
    }

    renderEmpty(){
        return(
            <View key={0} style={[StyleUtils.cardItem,{padding: 8}]}>
                <Text style={{fontSize: 12, width: config.width * 0.9}}>您没上传过数据！</Text>
            </View>
        )
    }


    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.refs.progress.show();
        imageService.getUploadList(null, data=>{
            console.log('loadData', JSON.stringify(data))
            this.refs.progress.hidden();
            if(data){
                if(config.SUCCESS == data.code){
                    let array = data.data;

                    let result = array[0]
     
                    this.setState({
                        uploadList: result.list,
                        uploadCount: result.count
                    })
                    
                }else{
                    this.refs.toast.show(data.msg);
                }
            }else{
                this.refs.toast.show('服务器忙稍后再试')
            }
        });
    }

}
const styles = StyleSheet.create({
    top_content:{
        height: config.height * 0.35,
        alignItems:'center'
    },
    top_content_top:{
        width: config.width,
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
        // fontFamily: '.萍方-简 细体',
        color:config.white_color, 
    },
    top_row_style:{
        padding:8,
        width:config.width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    top_content_bottom:{
        width: config.width,
        position: 'absolute',
        top:top_heigh - (config.height / 10) / 2,       
        alignItems: 'center',
        bottom: 10
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
        fontSize: 16,
    },
    list_view:{
        width: config.width - config.width * 0.05,
        marginLeft: config.width * 0.025,
    },
    tab_txt:{       
        padding: 4, color: config.white_color, fontSize: 16
    }
  
  });



// /**
//  * 上传文件
//  */
// export default class UpdateData extends Component{

//     render(){
//         return(
//             <View style={StyleUtils.container}>
//                 <View style={styles.top_content_view}>
//                     <TouchableOpacity onPress={()=>this.refs.selectMenu.setModalVisible(true)}>
//                     <Image style={{width: 70, height: 70, margin: 10}} source={require('./../../images/load.gif')}/>
//                     </TouchableOpacity>
//                     <View style={{width: config.width - 50, flexDirection: 'row'}}>
//                         <View style={{width: (config.width - 50) / 3, justifyContent:'center', alignItems:'center'}}>
//                             <Text style={styles.tab_txt}>上传次数</Text>
//                             <Text style={styles.tab_txt}>15</Text>
//                         </View>
//                         <View style={{width: (config.width - 50) / 3, justifyContent:'center', alignItems:'center', borderColor: config.white_color, borderLeftWidth: 1 * config.pixel, borderRightWidth: 1* config.pixel}}>
//                             <Text style={styles.tab_txt}>可用积分</Text>
//                             <Text style={styles.tab_txt}>0</Text>
//                         </View>
//                         <View style={{width: (config.width - 50) / 3, justifyContent:'center', alignItems:'center'}}>
//                             <Text style={styles.tab_txt}>HOUR</Text>
//                             <Text style={styles.tab_txt}>15</Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{alignItems:'center',  position: 'absolute', bottom: 10, top: config.height * 0.35 - 25, width: config.width}}>
//                     <View style={[StyleUtils.card, StyleUtils.shadowStyle,{flex: 1}]}>
//                         <Text style={[styles.tab_txt, {padding: 8, color: '#666666', width: config.width * 0.9}]}>最近上传</Text>                                              
//                         {this.renderItem(0)}
//                         {this.renderItem(1)}
//                         {this.renderItem(2)}
//                         {this.renderItem(3)}   
//                     </View>
//                 </View>

//                 {/* <View style={{backgroundColor:'red', padding:8, marginLeft:20 , position: 'absolute',left:0, top: config.height * 0.35 - 25 ,width: config.width - 40, height: config.height * 0.55, borderRadius: 5, elevation: 3}}>
                    
//                     {this.renderItem(0)}
//                     {this.renderItem(1)}
//                     {this.renderItem(2)}
//                     {this.renderItem(3)}
//                 </View> */}

//                <Alert ref='selectMenu' mode='select_menu' />
//             </View>
//         );
//     }

//     launchImageLibrary(){
//         let options = {
//             title: 'Select Avatar',
//             customButtons: [
//               {name: 'fb', title: 'Choose Photo from Facebook'},
//             ],
//             storageOptions: {
//               skipBackup: true,
//               path: 'images'
//             }
//         };

//         ImagePicker.launchImageLibrary(options, (response)=>{
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//               }
//               else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//               }
//               else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//               }
//               else {
//                 let source = { uri: response.uri };
            
//                 // You can also display the image using data:
//                 // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
//                 this.setState({
//                   avatarSource: source
//                 });
//               }
//         })
//     }

//     launchCamera(){
//         let options = {
//             title: 'Select Avatar',
//             customButtons: [
//               {name: 'fb', title: 'Choose Photo from Facebook'},
//             ],
//             storageOptions: {
//               skipBackup: true,
//               path: 'images'
//             }
//         };

//         ImagePicker.launchCamera(options, (response)=>{
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//               }
//               else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//               }
//               else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//               }
//               else {
//                 let source = { uri: response.uri };
            
//                 // You can also display the image using data:
//                 // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
//                 this.setState({
//                   avatarSource: source
//                 });
//               }
//         })

//     }

//     renderItem(index){
//         return(
//             <View key={index} style={StyleUtils.cardItem}>
//                 <View style={{width: config.width - 56, alignItems: 'center', flexDirection: 'row', justifyContent:'space-between'}}>
//                     <Text style={[styles.tab_txt, {color: config.black_color, padding: 0}]}>糖尿病</Text>
//                     <Text style={{color: config.blue_color}}>+120积分</Text>
//                 </View>
//                 <Text style={{width: config.width - 56 ,color: '#666666', paddingRight: 2}}>2018-9-18 14:32:78</Text>
//                 <View style={[{width: config.width - 56, marginTop: 4}, StyleUtils.space,]}></View>
//             </View>
//         );
//     }


    
// }

// const styles = StyleSheet.create({
//     top_content_view:{
//         height: config.height * 0.35,
//         width: config.width,
//         backgroundColor: config.blue_color,
//         paddingLeft: 20,
//         paddingRight: 20,
//         paddingBottom: 30,
//         paddingTop: 30,
//         alignItems: 'center',
//     },
//     tab_txt:{       
//         padding: 4, color: config.white_color, fontSize: 14
//     }
// })
