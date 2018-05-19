import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getReply } from '../store/chat/chat.actions'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor() {
    super();
    this.state = {
      text: '',
      question: ''
    };
  }

  replyFromYupi() {
    let yourquestion = this.state.text
    this.props.getReply(this.state.text)
    this.setState({
      question: yourquestion,
    })
  }

  render() {
    let emot = ''
    if(this.props.data.emotion){
      let parsing = this.props.data.emotion.split('.').pop()
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
        emot = require('../assets/img/1.standby.png')
      }
    }else{
      emot = require('../assets/img/1.standby.png')
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>

          <View style={{alignItems:'center', width:'100%', height:100}}>
          {
            this.props.data.data ? <Text style={styles.both}>{this.props.data.data}</Text>:<Text></Text>
          }
          </View>

          <View style={{alignItems:'center'}}>
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
                <TouchableHighlight onPress={()=>{}} style={{alignItems:'center'}}>
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
