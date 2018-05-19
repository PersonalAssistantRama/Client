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
import { getReply } from '../store/chat/chat.actions'
import LoadingHome from '../components/LoadingHome'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super();
    this.state = {
      text: '',
      question: '',
      showText: null,
      audio: false
    };

    this.onSpeak = this.onSpeak.bind(this);
  }

  replyFromYupi() {
    let yourquestion = this.state.text
    this.props.getReply(this.state.text)
    this.setState({
      question: yourquestion,
      text: ''
    })
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
        <View style={styles.container}>
          <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>

            <View style={{alignItems:'center', width:'100%'}}>
            {
              this.props.data.data ? <Text style={styles.both}>{this.props.data.data}</Text>:<Text></Text>
            }
            </View>

            <View style={{alignItems:'center',marginTop:80}}>
              <Image source={emot} style={{justifyContent:'center',width: 250, height: 250}}/>
            </View>

            <View style={{alignItems:'center',marginTop:30}}>
              {
                this.state.question != '' ? <Text style={styles.user}>{this.state.question}</Text>:<Text></Text>
              }
            </View>

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
  data: state.data.data,
  loading: state.data.loading,
  error: state.data.error
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReply,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
