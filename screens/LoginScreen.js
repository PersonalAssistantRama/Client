import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loginUser} from '../store/user/user.actions'
import {Alert} from 'react-native'
import { Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Thumbnail,
  Body} from 'native-base';

class LoginScreen extends Component {
  constructor () {
    super()
    this.state ={
      username: '',
      password: ''
    }
  }

  loginButton = async () => {
    // console.log(this.state.username)
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    await this.props.loginUser(user)
    console.log("status===", this.props.user)
    this.props.navigation.navigate('Home')
    // if(this.props.isLogin) {
    // }else{
    //   Alert.alert('Login failed!')
    // }
  }

  render() {
    return (
      <Container>
        <Content style={{paddingHorizontal:20}}>
        <Body style={{flexDirection:'row',justifyContent:'center'}}>
          <Thumbnail 
            source={require('../assets/img/both.png')}
            style={{alignContent:'center',width: 100, height: 100}}
            />
            </Body>
          <Text style={styles.title}>Yupi - Your Personal Assistant</Text>
          <Form style={{paddingVertical:30}}>
            <Item fixedLabel last rounded style={ styles.questionForm }>
              <Label>Username</Label>
              <Input
              name="username"
              autoCapitalize='none'
              value={ this.state.username }
              onChangeText={(username) => this.setState({username}) }/>
            </Item>
            <Item fixedLabel last rounded style={ styles.questionForm }>
              <Label>Password</Label>
              <Input
              name="password"
              autoCapitalize='none'
              secureTextEntry={true}
              value={ this.state.password }
              onChangeText={(password) => this.setState({password}) }/>
            </Item>
          </Form>
          <Body style={{flexDirection:'row',justifyContent:'center'}}>
          <Button rounded success
            onPress={()=>this.loginButton()}
            >
            <Text style={{textAlign: 'center'}}>Login</Text>
          </Button>
          </Body>
          <Body style={{flexDirection:'row',justifyContent:'center'}}>
          <Text style={{paddingVertical:5}}>Don't have an account?</Text>
          <Button transparent
            onPress={() => this.props.navigation.navigate('SignUp')}
            >
            <Text>SIGN UP</Text>
          </Button>
          </Body>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonLogin: {
    width: 150,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center'
  },
  questionForm: {
    marginVertical:10,
    backgroundColor:'white'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5
  }
})

const mapStateToProps = (state) => ({
  user: state.user,
  // isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (LoginScreen);