import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {registerUser} from '../store/user/user.actions'
import {Alert} from 'react-native'

class SignUpScreen extends Component {

  constructor () {
    super()
    this.state ={
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      gender: '',
      wakeUpTime: '',
      sleepTime: ''
    }
  }

  SignUpButton = () => {
    let newUser = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      wakeUpTime: this.state.wakeUpTime,
      sleepTime: this.state.sleepTime
    }

    this.props.registerUser(newUser)
    Alert.alert('Register Succes')
    this.props.navigation.navigate('Home')
  }


  render() {
    return (
      <ScrollView>
          <View>
          <Text style={styles.title}>Welcome to Yupi</Text>
          <View style={styles.textContainer}>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {(input) => this.setState({username:input})}
              value={this.state.username}
              placeholder="username.."
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
          <View style={styles.textContainer}>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {(input) => this.setState({first_name:input})}
              value={this.state.first_name}
              placeholder="first name.."
              />
          </View>
          <View style={styles.textContainer}>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {(input) => this.setState({last_name:input})}
              value={this.state.last_name}
              placeholder="last name.."
              />
          </View>
          <View style={styles.textContainer}>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {(input) => this.setState({gender:input})}
              value={this.state.gender}
              placeholder="gender.."
              />
          </View>
          <View style={styles.textContainer}>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {(input) => this.setState({wakeUpTime:input})}
              value={this.state.wakeUpTime}
              placeholder="wake up time.."
              />
          </View>
          <View style={styles.textContainer}>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {(input) => this.setState({sleepTime:input})}
              value={this.state.sleepTime}
              placeholder="sleep time.."
              />
          </View>
          <Button
            title="Sign Up"
            onPress={() => this.SignUpButton()}
          >
          </Button>
        </View>
      </ScrollView>
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
    margin: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  input: {
    width: 150,
    paddingLeft: 20,
    paddingRight: 20
  }
})

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (SignUpScreen);