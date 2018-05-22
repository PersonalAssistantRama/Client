import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ImageBackground
} from 'react-native'
import {
  Container,
  Header,
  Content,
  SwipeRow,
  View,
  Text,
  Icon,
  Button
} from 'native-base';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getNotification, deleteNotification } from '../store/notifications/notification.actions'

class ListAlarmScreen extends Component {
  static navigationOptions = ({
    headerTitle: 'List Alarm',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#204E6D',
      justifyContent: 'center'
    },
    headerTitleStyle: {
      textAlign: 'center'
    }
  })

  componentDidMount() {
    const id = this.props.user.user._id;
    this.props.getNotification(id)
  }

  deleteNotification(notification) {
    this.props.deleteNotification(notification)
    alert('Trash')
  }

  render() {
    if(this.props.notificationReducer.loading) {
      return <Text>Loading</Text>
    } else {
      if(this.props.notificationReducer.data.data) {
      return (
        <Container>
          <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
          <View style={{flex: 1, alignItems:'center', width:'100%', paddingTop:40}}>
          
            <Text style={{fontSize:32, fontFamily:'Iowan Old Style'}}>
              List Alarm
            </Text>
          
              <Content scrollEnabled={false} style={{marginTop:40}}>
                { 
                  this.props.notificationReducer.data.data.map(notification => (
                    <SwipeRow
                      rightOpenValue={-75}
                      key={notification._id}
                      body={
                        <View style={{width:'80%', marginLeft:8}}>
                          <Text>{ notification.title } - { notification.date }</Text>
                        </View>
                      }
                      right={
                        <Button danger onPress={()=> { this.deleteNotification(notification)}}>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                  ))
                }
              </Content>
            </View>
          </ImageBackground>
        </Container>
      );
      } else {
        return <Text></Text>
      }
    }
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
  notificationReducer: state.notification,
  user: state.user.data.data
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNotification, deleteNotification
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListAlarmScreen);
