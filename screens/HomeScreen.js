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
import {Container} from 'native-base'
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getReply, answerGame, setYupiAnswer } from '../store/chat/chat.actions'
import LoadingHome from '../components/LoadingHome'
import MovieComponent from '../components/MovieComponent'
import FoodsComponent from '../components/FoodsComponent'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

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
      deskripsipengingat: ''
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
    if (this.props.users){
      Tts.speak("halo "+this.props.users.user.username+ " saya yupi")
    }
  }

  setModalVisible(visible) {
    const objNotif = {
      title: this.state.titlepengingat,
      message: this.state.deskripsipengingat,
      date: this.state.showdatetime
    }

    console.log('objnotif', objNotif)

    localNotificationSchedule(objNotif);

    this.props.setYupiAnswer('Ok, nanti Yupi ingatkan ya!');
    this.setState({
      modalVisible: visible,
    });
    this.setState({
      modalVisible: true,
    });
    this.state.audio = true
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
      else{
        emot = require('../assets/img/standby.png')
      }
    }
    else if(this.props.data.data == 'Tebakan kamu benar!'){
      emot = require('../assets/img/happy.png')
    }
    else if(this.props.data.data == 'Tebakan kamu salah, Payah nih!'){
      emot = require('../assets/img/garing.png')
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
            <View style={{alignItems:'center', width:'100%'}}>
            {
              this.props.data.data ? <Text style={styles.both}>{this.props.data.data}</Text>:<Text></Text>
            }
            </View>

            { this.props.movies ? <MovieComponent/> : <Text></Text> }

            {
              this.props.foods ? <FoodsComponent/> : <Text></Text>
            }

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
                    <ScrollView>
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
                        </View>
                        <Button
                          onPress={()=>this.setModalVisible(!this.state.modalVisible)}
                          title="selesai"
                          />
                    </ScrollView>
                </View>
              </Modal>: <Text></Text>
            }

            <View style={{alignItems:'center',marginTop:0}}>
              <Image source={emot} style={{justifyContent:'center',width: 250, height: 250}}/>
            </View>

            <View style={{alignItems:'center',marginTop:30, paddingBottom:40}}>
              {
                this.state.question != '' ? <Text style={styles.user}>{this.state.question}</Text>:<Text></Text>
              }
            </View>
            </ScrollView>

            <View style={styles.instructions}>
              <TextInput
                placeholder="What you think?"
                placeholderTextColor="grey"
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={(event) => this.replyFromYupi()}
                style={styles.inputdata}
              />
            {
              this.state.text ?
                <View style={{width:'20%'}}>
                  <Button
                    onPress={()=>this.replyFromYupi()}
                    title="send"
                    />
                </View>:
                  <TouchableHighlight onPress={this.onSpeak} style={styles.voice} underlayColor="#aaa">
                    <View>
                        <Image source={require('../assets/img/mic.png')} style={{width: 35, height: 35}}/>
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
    backgroundColor:'white'
  },
  voice : {
    width:'20%',
    alignItems:'center',
    padding: 3,
    backgroundColor:'#5592f4'
  },
  instructions: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0
  },
  user: {
    margin:5,
    padding:10,
    borderRadius:3,
    color: 'white',
    backgroundColor:'#0a0'
  },
  both: {
    margin:5,
    padding:10,
    width:'80%',
    borderRadius:3,
    color: 'grey',
    backgroundColor:'white'
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
  getReply, answerGame, setYupiAnswer
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
