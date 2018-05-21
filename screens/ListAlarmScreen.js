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

  render() {
    return (
      <Container>
        <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
        <View style={{flex: 1, alignItems:'center', width:'100%', paddingTop:40}}>
        
          <Text style={{fontSize:32, fontFamily:'Iowan Old Style'}}>
            List Alarm
          </Text>
        
          
        
            <Content scrollEnabled={false} style={{marginTop:40}}>
              <SwipeRow
                rightOpenValue={-75}
                body={
                  <View style={{width:'80%', marginLeft:8}}>
                    <Text>List Alarm 1</Text>
                  </View>
                }
                right={
                  <Button danger onPress={() => alert('Trash')}>
                    <Icon active name="trash" />
                  </Button>
                }
              />
              <SwipeRow
                rightOpenValue={-75}
                body={
                  <View style={{width:'80%', marginLeft:8}}>
                    <Text>List Alarm 2</Text>
                  </View>
                }
                right={
                  <Button danger onPress={() => alert('Trash')}>
                    <Icon active name="trash" />
                  </Button>
                }
              />
            </Content>
          </View>
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

export default ListAlarmScreen;
