import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {registerUser} from '../store/user/user.actions'
import {Alert} from 'react-native'
import { Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  ListItem,
  Radio,
  Left,
  Right
} from 'native-base';

class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Register',
    headerStyle: {
      backgroundColor: '#204E6D',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor () {
    super()
    this.state ={
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      gender: ''
    }
  }
  static navigationOptions = ({
    headerTitle: 'Register',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#204E6D'
    },
    headerTitleStyle: {
      textAlign: 'center'
    }
  })

  SignUpButton = async () => {
    let newUser = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender
    }

    await this.props.registerUser(newUser)
    if(this.props.user.isLogin) {
      this.props.navigation.navigate('Home')
    } else {
      Alert.alert('register failed!')
    }
  }


  render() {
    return (
      <Container>
        <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
        <Content style={{paddingHorizontal:20}}>
          <Form style={{paddingVertical:30}}>
            <Item rounded last style={ styles.questionForm }>
              <Label>Username</Label>
              <Input
              name="username"
              autoCapitalize='none'
              value={ this.state.username }
              onChangeText={(username) => this.setState({username}) }/>
            </Item>
            <Item rounded last style={ styles.questionForm }>
              <Label>Password</Label>
              <Input
              name="password"
              autoCapitalize='none'
              secureTextEntry={true}
              value={ this.state.password }
              onChangeText={(password) => this.setState({password}) }/>
            </Item>
            <Item rounded last style={ styles.questionForm }>
              <Label>First Name</Label>
              <Input
              name="first_name"
              autoCapitalize='none'
              value={ this.state.first_name }
              onChangeText={(first_name) => this.setState({first_name}) }/>
            </Item>
            <Item rounded last style={ styles.questionForm }>
              <Label>Last Name</Label>
              <Input
              name="last_name"
              autoCapitalize='none'
              value={ this.state.last_name }
              onChangeText={(last_name) => this.setState({last_name}) }/>
            </Item>
            <Content>
              <Label>Gender</Label>
              <ListItem
                onPress={() => this.setState({gender: 'male'})}
                selected={this.state.gender == 'male'}>
              <Left>
                <Text>Male</Text>
              </Left>
              <Right>
                <Radio
                  color={"#f0ad4e"}
                  selectedColor={"#5cb85c"}
                  onPress={() => this.setState({gender: 'male'})}
                  selected={this.state.gender == 'male'}
                />
              </Right>
            </ListItem>
            <ListItem
              onPress={() => this.setState({gender: 'female'})}
              selected={this.state.gender == 'female'}>
              <Left>
                <Text>Female</Text>
              </Left>
              <Right>
                <Radio
                  color={"#f0ad4e"}
                  selectedColor={"#5cb85c"}
                  onPress={() => this.setState({gender: 'female'})}
                  selected={this.state.gender == 'female'}
                />
              </Right>
            </ListItem>
          </Content>
          </Form>
          <Body style={{flexDirection:'row',justifyContent:'center'}}>
          <Button rounded
            style={{backgroundColor:'#204E6D'}}
            onPress={()=>this.SignUpButton()}
            >
            <Text style={{textAlign: 'center'}}>Register</Text>
          </Button>
          </Body>
        </Content>
        </ImageBackground>
      </Container>
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
    paddingRight: 20,
    // backgroundColor: 'white',
  },
  questionForm: {
    marginVertical:10,
    backgroundColor:'white',
    // opacity: 0.5,
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
  registerUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (SignUpScreen);
