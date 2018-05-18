import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground
} from 'react-native';
import axios from 'axios'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {text: ''}
  }
  cek () {
    axios.post('http://localhost:3000/replies',{text:'hai'},
    {headers: {'X-Custom-Header': 'foobar'}}).then(response =>{
      console.log(response)
    }).catch(err => console.log(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/img/background.jpg')} style={styles.backgroundImage}>
          <View style={{alignItems:'center', width:'100%'}}>
            <Text style={styles.both}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Text>
          </View>
          <View style={{alignItems:'center',marginTop:100}}>
            <Image source={require('./assets/img/both.png')} style={{justifyContent:'center',width: 250, height: 250}}/>
          </View>
          <View style={{alignItems:'center',marginTop:30}}>
            <Text style={styles.user}>
              {this.state.text}
            </Text>
          </View>
          <View style={styles.instructions}>
            <TextInput
              placeholder="What you think?"
              placeholderTextColor="grey"
              onChangeText={(text) => this.setState({text})}
              style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'80%'}}
            />
          {
            this.state.text ?
              <View style={{width:'20%'}}>
                <Button
                  onPress={()=>this.cek()}
                  title="send"
                  />
              </View>:
              <View style={{width:'20%'}}>
                <Button
                  onPress={()=>this.cek()}
                  title="voice"
                  />
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
