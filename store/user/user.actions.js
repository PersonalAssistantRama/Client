import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOADING,
  ERROR
} from './user.actionTypes'

import axios from 'axios'
import {Alert} from 'react-native'

export const registerUser = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      const user = await axios({
        method: 'post',
        url: 'https://cfe485a0.ngrok.io/users/signup',
        data: data
      })
      let token = user.data.token
      // console.log('registeraction===', user.data)
      await AsyncStorage.setItem('token', token)
      dispatch(registerSuccess(user.data))
    } catch (error) {
      dispatch(errorCheck())
    }
  }
}

export const loginUser = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      const user = await axios({
        method: 'post',
        url: 'https://16ed310f.ngrok.io/users/signin',
        data: data
      })
      let token = user.data.token
      await AsyncStorage.setItem('token', token)
      dispatch(loginSuccess(user.data))
    } catch (error) {
      dispatch(errorCheck())
    }
  }
}

const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}


const loginSuccess  = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

const loading = () => {
  return {
    type: LOADING
  }
}

const errorCheck = () => {
  return {
    type: ERROR
  }
}