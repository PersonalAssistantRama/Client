import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOADING,
  ERROR,
  USER_LOGOUT
} from './user.actionTypes'

import axios from 'axios'
const baseUrl = 'http://35.198.243.108'

export const registerUser = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      const user = await axios({
        method: 'post',
        url: `${baseUrl}/users/signup`,
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
        url: `${baseUrl}/users/signin`,
        data: data
      })
      dispatch(loginSuccess(user.data))
    } catch (error) {
      console.log('action---', error)
      dispatch(errorCheck())
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(logout())
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

const logout = () => ({
  type: USER_LOGOUT,
})
