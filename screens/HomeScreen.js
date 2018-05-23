import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  Modal
} from 'react-native';
import { Container, Content } from 'native-base'
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { getReply, answerGame, setYupiAnswer } from '../store/chat/chat.actions'
import { newNotification } from '../store/notifications/notification.actions'
import LoadingHome from '../components/LoadingHome'
import MovieComponent from '../components/MovieComponent'
import FoodsComponent from '../components/FoodsComponent'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { localNotificationSchedule } from '../services/pushNotifications'

class HomeScreen extends Component {
  static navigationOptions = {
    headerLeft: null,
  }
  constructor(props) {
    super();
    this.state = {
      text: '',
      question: '',
      showText: null,
      audio: false,
      isDateTimePickerVisible: false,
      showdatetime: '',
      modalVisible: true,
      titlepengingat: '',
      deskripsipengingat: '',
      latitude: null,
      longitude: null,
      error: null
    };

    this.onSpeak = this.onSpeak.bind(this);
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
  // let date = moment(date).format('L').split('/').reverse().join('/');
  // moment.locale();
  // let time = moment(date).format('LT')
  // let datetime = date + ' ' + time

  let datetime = moment(date).format()

  this.setState({ showdatetime:  datetime})
   this._hideDateTimePicker();
 };


  replyFromYupi() {
    if(this.props.inGame) {
      console.log('masuk reply from yupi in game')
      console.log('id game', this.props.idGame),
      console.log('jawaban', this.state.text)
      this.props.answerGame(this.props.idGame, this.state.text)
      this.setState({
        question: this.state.text,
        text: ''
      })
    } else {
      console.log('masuk reply from yupi else')
      let yourquestion = this.state.text
      this.props.getReply(this.state.text)
      this.setState({
        question: yourquestion,
        text: '',
      })
    }
  }

  async onSpeak() {
    try {
      const spokenText = await SpeechAndroid.startSpeech("talk to yupi", SpeechAndroid.INDONESIAN);
      this.setState({
        question: spokenText,
        text: spokenText,
      })
      this.replyFromYupi();
      this.state.audio=true
    } catch(error) {
      switch(error){
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
          break;
      }
    }
  }
  componentDidMount (){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => this.setState({ error: error.message,latitude:-6.260617,longitude:106.781602 }),
      { enableHighAccuracy: true, timeout: 5000},
    );
  }

  setModalVisible(visible) {
    if(this.state.titlepengingat && this.state.deskripsipengingat && this.state.showdatetime) {
      const objNotif = {
        title: this.state.titlepengingat,
        message: this.state.deskripsipengingat,
        date: this.state.showdatetime,
        id: this.props.users.user._id
      }
      this.props.newNotification(objNotif);
      this.props.setYupiAnswer('Ok, nanti Yupi ingatkan');
      this.setState({
        modalVisible: visible,
      });
      this.setState({
        modalVisible: true,
      });
      this.state.audio = true
    } else {
      alert('Kok ga diisi lengkap?')
    }
  }

  render() {
    let emot = ''
    if(this.props.data.emotion){
      let parsing = this.props.data.emotion.split('.').pop()
      console.log(parsing);
      if (parsing == 'marah'){
        emot = require('../assets/img/marah.png')
      }
      else if(parsing == 'happy'){
        emot = require('../assets/img/happy.png')
      }
      else if(parsing == 'tersipu'){
        emot = require('../assets/img/tersipu.png')
      }
      else if(parsing == 'garing'){
        emot = require('../assets/img/garing.png')
      }
      else if(parsing == 'sedih'){
        emot = require('../assets/img/sedih.png')
      }
      else if(parsing == 'takut'){
        emot = require('../assets/img/takut.png')
      }
      else if(parsing == 'kejut'){
        emot = require('../assets/img/kejut.png')
      }
      else{
        emot = require('../assets/img/talk.png')
      }
    }
    else if(this.props.data.data == 'Tebakan kamu benar!'){
      emot = require('../assets/img/happy.png')
    }
    else if(this.props.data.data == 'Tebakan kamu salah, payah nih!'){
      emot = require('../assets/img/payah.png')
    }
    else if(this.props.data.data == 'Ok, apa yang mau saya ingatkan?'){
      emot = require('../assets/img/garing.png')
    }else{
      emot = require('../assets/img/standby.png')
    }

    if(this.props.loading) {
      return <LoadingHome/>
    } else {
      if(this.state.audio) {
        Tts.speak(this.props.data.data)
        this.state.audio = false
      }
      return (
        <Container>
        <View style={styles.container}>
          <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
          <ScrollView>
            <View style={{flexGrow: 1,alignItems:'center',justifyContent:'center', width:'100%', marginTop:32}}>
            {
              this.props.data.data ? <View style={styles.both}><Text style={{fontSize:16, color:'#204E6D'}}>Yupi: " {this.props.data.data} "</Text></View>:<View style={styles.both}><Text style={{fontSize:16, color:'#204E6D'}}>Yupi: "Hai {this.props.users.user.username}, saya Yupi"</Text></View>
            }

            {
              this.props.data.data? <View style={styles.triangle}></View> : <View style={styles.triangle}></View>
            }
            </View>
            {
              this.props.data.data === 'Ok, apa yang mau saya ingatkan?' ? <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                      <View style={{width: 300,height: 300, backgroundColor:'rgba(255,255,255,0.8)',borderRadius:3,padding:10}}>
                         <Button
                           onPress={this._showDateTimePicker}
                           title="masukan tanggal dan waktu"
                           />
                        <Text>{this.state.showdatetime}</Text>

                         <DateTimePicker
                           isVisible={this.state.isDateTimePickerVisible}
                           onConfirm={this._handleDatePicked}
                           onCancel={this._hideDateTimePicker}
                           mode={'datetime'}
                           is24Hour={true}
                           />
                         <TextInput
                           placeholder="Apa yang ingin di ingatkan?"
                           placeholderTextColor="grey"
                           onChangeText={(deskripsipengingat) => this.setState({deskripsipengingat})}
                           />

                         <TextInput
                           placeholder="deskripsi"
                           placeholderTextColor="grey"
                           onChangeText={(titlepengingat) => this.setState({titlepengingat})}
                           />
                        <Button
                          onPress={()=>this.setModalVisible(!this.state.modalVisible)}
                          title="selesai"
                          />
                        </View>
                </View>
              </Modal>: <Text></Text>
            }

            <View style={{alignItems:'center',marginTop:0}}>
              <Image source={emot} style={{justifyContent:'center',width: 200, height: 200}}/>
            </View>

            <View style={{flex: 1,alignItems:'center',justifyContent:'center',marginTop:30, paddingBottom:30}}>
              {
                this.state.question != '' ? <Text style={styles.user}>{this.props.users.user.username}: " {this.state.question} "</Text>:<Text></Text>
              }
              {
                this.state.question != '' ? <View style={styles.triangleQuestion}></View> : <Text></Text>
              }
            </View>
              { this.props.movies ? <MovieComponent navigation={this.props.navigation}/> : <Text></Text> }

              {
                this.props.foods ? <FoodsComponent lokasi={{lat:this.state.latitude,long:this.state.longitude}} navigation={this.props.navigation}/> : <Text></Text>
              }
            </ScrollView>
            <View style={styles.instructions}>
              <TextInput
                placeholderTextColor="grey"
                underlineColorAndroid="rgba(0,0,0,0)"
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={(event) => this.replyFromYupi()}
                style={styles.inputdata}
                />
            {
              this.state.text ?
              <View style={{width:'20%'}}>
                <TouchableOpacity style={{ height: 40, backgroundColor:'#204E6D', justifyContent:'center', borderRadius:40, alignItems:'center', marginRight:10}}
                  onPress={()=>this.replyFromYupi()}
                >
                    {/* <Text style={{color: 'white', textAlign: 'center', fontSize:15, fontWeight:'bold'}}> */}
                      <Ionicons name='md-send' size={25} color='white'/>
                    {/* </Text> */}
                </TouchableOpacity>
            </View>:
              <TouchableHighlight onPress={this.onSpeak} style={styles.voice} underlayColor="rgba(255,255,255,0.2)">
                <View>
                    <Image source={require('../assets/img/audio-yupi.png')} style={{width: 38, height: 38}}/>
                </View>
              </TouchableHighlight>
            }
            </View>
          </ImageBackground>
        </View>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
   },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  inputdata :{
    height: 40,
    width:'80%',
    backgroundColor:'white',
    fontFamily: 'SourceSansPro',
    // opacity: 0.8,
    borderWidth: 2,
    borderColor: '#204E6D',
    borderRadius: 16,
    marginLeft:5,
    marginRight:5,
    marginBottom:10,
    paddingLeft:10

  },
  voice : {
    width:'20%',
    // alignItems:'center',
    borderRadius:50,
    // justifyContent:'center'
    paddingLeft: 10,
    // backgroundColor:'white',
    // opacity: 0.5
  },
  instructions: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'white'
  },
  user: {
    margin:5,
    marginBottom:0,
    padding:10,
    // borderRadius:3,
    color: 'white',
    backgroundColor:'#03A9F4',
    opacity: 0.8,
    height:60,
    width:'80%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#03A9F4',
    // borderBottomLeftRadius: 25,
    // borderTopRightRadius:20,
    // borderTopLeftRadius: 25
    borderRadius:10,
    fontSize: 16
  },
  both: {
    margin:5,
    marginBottom:0,
    // paddingTop:10,
    paddingLeft: 10,
    paddingRight: 10,
    width:'80%',
    // borderRadius:3,
    // color: '#204E6D',
    backgroundColor:'white',
    height: 100,
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor: 'white',
    // borderBottomRightRadius: 10,
    // borderTopRightRadius:10,
    // borderTopLeftRadius: 10
    borderRadius: 10
  },
  triangle: {
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginTop:0,
    marginRight:50
  },
  triangleQuestion: {
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    // borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#03A9F4',
    marginTop:0,
    marginLeft:200,
    opacity: 0.8
  }
});

const mapStateToProps = (state) => ({
  dataUtama: state.data,
  data: state.data.data,
  loading: state.data.loading,
  error: state.data.error,
  users: state.user.data.data,
  inGame: state.data.inGame,
  idGame: state.data.idGame,
  movies: state.data.movies,
  foods: state.data.foods
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReply, answerGame, setYupiAnswer, newNotification
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
