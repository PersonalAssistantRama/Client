import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOADING,
  ERROR
} from './user.actionTypes'

import axios from 'axios'
import {Alert} from 'react-native'

export const registerUser = (data) => {
  return dispatch => {
    dispatch(loading())
      axios({
        method: 'post',
        url: 'https://cfe485a0.ngrok.io/users/signup',
        data: data
      }).then(response => {
        dispatch(registerSuccess(user.data))
      }).catch(error => {
        dispatch(errorCheck())
      })
    }
  
}

export const loginUser = (data) => {
  return dispatch => {
    dispatch(loading())
      axios({
        method: 'post',
        url: 'https://b18693e5.ngrok.io/users/signin',
        data: data
      }).then(response => {
        console.log('reslogin===', response)
        dispatch(loginSuccess(response.data))
      }).catch(error => {
        console.log('action---', error)
        dispatch(errorCheck())
      })
    }
}

const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data
})


const loginSuccess  = (data) =>({
  type: LOGIN_SUCCESS,
  payload: data
})

const loading = () => ({
  type: LOADING
})

const errorCheck = () => ({
  type: ERROR
})