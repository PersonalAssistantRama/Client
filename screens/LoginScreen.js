import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground
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
  static navigationOptions = {
    header: null,
  }
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
    if(this.props.user.isLogin) {
      this.props.navigation.navigate('Home')
    }else{
      Alert.alert('Login failed!')
    }
  }

  render() {
    if(this.props.user.isLogin) {
      this.props.navigation.navigate('Home')
    }
      return (
        <Container>
          <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
          <Content style={{paddingHorizontal:20, marginTop:30}}>
          <Text style={styles.title}>Yupi</Text>
          <Body style={{flexDirection:'row',justifyContent:'center', marginTop:40}}>
            <Thumbnail
              source={require('../assets/img/marah.png')}
              style={{alignContent:'center',width: 100, height: 100}}
              />
              </Body>
            <Text style={styles.tagline}>Your Personal Assistant</Text>
            <Form style={{paddingVertical:0}}>
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
            <Button rounded style={{marginTop:15, backgroundColor: '#204E6D'}}
              onPress={()=>this.loginButton()}
              >
              <Text style={{textAlign: 'center'}}>Login</Text>
            </Button>
            </Body>
            <Body style={{flexDirection:'row',justifyContent:'center', marginTop:10}}>
            <Text style={{paddingVertical:5}}>Belum kenal Yupi?</Text>
            <Button transparent
              onPress={() => this.props.navigation.navigate('SignUp')}
              >
              <Text>Kenalan</Text>
            </Button>
            </Body>
          </Content>
          </ImageBackground>
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
    marginBottom:10,
    backgroundColor:'white'
  },
  tagline: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    paddingTop: 5
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
   },
})

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (LoginScreen);
