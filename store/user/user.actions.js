import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOADING,
  ERROR
} from './user.actionTypes'

import axios from 'axios'

export const registerUser = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      const user = await axios({
        method: 'post',
        url: 'https://6b9d6b89.ngrok.io/users/signup',
        data: data
      })
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
        url: 'https://bed73cfa.ngrok.io/users/signin',
        data: data
      })
      dispatch(loginSuccess(user.data))
    } catch (error) {
      console.log('action---', error)
      dispatch(errorCheck())
    }
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
