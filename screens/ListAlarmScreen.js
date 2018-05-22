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
import moment from 'moment'

import { getNotification, deleteNotification } from '../store/notifications/notification.actions'
import LoadingHome from '../components/LoadingHome'

class ListAlarmScreen extends Component {
  componentDidMount() {
    const id = this.props.user.user._id;
    this.props.getNotification(id)
  }

  deleteNotification(notification) {
    this.props.deleteNotification(notification)
  }

  render() {
    if(this.props.notificationReducer.loading) {
      return <LoadingHome/>
    } else {
      if(this.props.notificationReducer.data) {
      return (
        <Container>
          <View style={{backgroundColor:'white', width: '100%', justifyContent:'center', alignItems:'center', paddingTop:20}}>
            <Text style={styles.listAlarm}>
              List Reminder
            </Text>
          </View>
          <View style={{flex: 1, alignItems:'center', width:'100%'}}>
              <Content scrollEnabled={true}>
                { 
                  this.props.notificationReducer.data.map(notification => (
                    <SwipeRow
                      rightOpenValue={-120}
                      disableRightSwipe={true}
                      key={notification._id}
                      body={
                        <View style={{width:'100%', paddingLeft:24, paddingRight: 24}}>
                          <Text style={{color:'#204E6D',fontFamily: 'SourceSansPro', fontSize:20}}>{ notification.message }</Text>
                          <Text style={{color:'#204E6D',fontFamily: 'SourceSansPro', fontSize:12}}>{ moment(notification.date).format('LLLL') }</Text>
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
        </Container>
      );
      } else {
        return <Text></Text>
      }
    }
  }
}

const styles = StyleSheet.create({
  listAlarm: {
    fontSize:20,
    fontFamily: 'SourceSansPro',
    color:'#204E6D',
    fontWeight:'bold',
    textAlign:'center',
    height: 40,
    opacity: 70
  },
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
