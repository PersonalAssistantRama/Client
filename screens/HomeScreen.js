import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  Image,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getReply, answerGame } from '../store/chat/chat.actions'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      question: '',
      showText: null
    };

    this.onSpeak = this.onSpeak.bind(this);
  }

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
        text: ''
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
  
  render() {
    if(this.props.loading) {
      return <View><Text>Yupi is typing...</Text></View>
    } else {
      if(this.props.data.data) {
        Tts.speak(this.props.data.data)
      }
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
            <View style={{alignItems:'center', width:'100%'}}>
            {
              this.props.data ? <Text style={styles.both}>{this.props.data.data}</Text>:<Text></Text>
            }
            </View>
  
            <View style={{alignItems:'center',marginTop:80}}>
              {
                this.props.data ?<Image source={require('../assets/img/1.standby.png')} style={{justifyContent:'center',width: 250, height: 250}}/>
              :<Image source={require('../assets/img/1.standby.png')} style={{justifyContent:'center',width: 250, height: 250}}/>
              }
            </View>
  
            <View style={{alignItems:'center',marginTop:30}}>
              {
                this.props.data ? <Text style={styles.user}>{this.state.question}</Text>:<Text></Text>
              }
            </View>
  
            <View style={styles.instructions}>
              <TextInput
                placeholder="What you think?"
                placeholderTextColor="grey"
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={(event) => this.replyFromYupi()}
                style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'80%', backgroundColor:'white'}}
              />
            {
              this.state.text ?
                <View style={{width:'20%'}}>
                  <Button
                    onPress={()=>this.replyFromYupi()}
                    title="send"
                    />
                </View>:
                <View style={{width:'20%'}}>
                  <TouchableHighlight onPress={this.onSpeak} style={{alignItems:'center'}}>
                    <View>
                        <Image source={require('../assets/img/mic.png')} style={{width: 35, height: 35}}/>
                    </View>
                  </TouchableHighlight>
                </View>
            }
            </View>
          </ImageBackground>
        </View>
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
  inGame: state.data.inGame,
  idGame: state.data.idGame,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReply, answerGame
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
