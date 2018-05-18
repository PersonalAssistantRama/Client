import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import axios from 'axios'

class LoginScreen extends Component {
  constructor () {
    super()
    this.state ={
      username: '',
      password: ''
    }
  }

  loginButton = () => {
    console.log(this.state.username)
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    axios({
      method: 'post',
      url: 'https://dff92a5a.ngrok.io/users/signin',
      data: user,
    }).then(response => {
      console.log(response)
      this.props.navigation.navigate('Home')
    })
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Welcome to Yupi</Text>
        <View style={styles.textContainer}>
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            autoCapitalize = "none"
            onChangeText = {(input) => this.setState({username:input})}
            value={this.state.username}
            placeholder="email.."
            />
        </View>
        <View style={styles.textContainer}>
          <TextInput 
            secureTextEntry={true}
            style = {styles.input}
            underlineColorAndroid = "transparent"
            autoCapitalize = "none"
            onChangeText = {(input) => this.setState({password:input})}
            value={this.state.password}
            placeholder="password"
            />
        </View>
        <Button
          title="Login"
          onPress={()=>this.loginButton()}
        >
        </Button>
        <View>
          <Text>Don't have an account?</Text>
          <TouchableHighlight
          onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text>SIGN UP</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20
  },
  textContainer: {
    margin: 20,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  input: {
    width: 200,
    paddingLeft: 20,
    paddingRight: 20
  },
  btnPlay: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20
  }
})

export default LoginScreen;