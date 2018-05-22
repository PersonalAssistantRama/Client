import {
  GET_NOTIFICATION_PENDING,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_ERROR,
  DELETE_NOTIFICATION
} from './notification.actionTypes'

import axios from 'axios'
const baseUrl = 'http://35.198.243.108'

import { localNotificationSchedule } from '../../services/pushNotifications'

import PushNotification from 'react-native-push-notification';

export const getNotification = (id) => {
  return dispatch => {
    dispatch(getNotificationPending())
    axios.get(`${baseUrl}/notifications/${id}`)
      .then(response => {
        console.log('ini response', response)
        const notification = response.data.data.reverse();
        dispatch(getNotificationSuccess(notification));
      })
      .catch(err => dispatch(getNotificationFailed(err)));
  }
}

export const newNotification = (notification) => {
  return dispatch => {
    axios.post(`${baseUrl}/notifications`, notification)
      .then(response => {
        notification._id = response.data.data._id;
        localNotificationSchedule(notification)
      })
  }
}

export const deleteNotification = (notification) => {
  console.log('delete this', notification)
  return dispatch => {
    axios.delete(`${baseUrl}/notifications/${notification._id}`)
      .then(response => {
        PushNotification.cancelLocalNotifications({title: notification.message});
        dispatch(deleteThisNotification(notification._id));
      })
  }
}

const getNotificationSuccess = (data) => ({
  type: GET_NOTIFICATION_SUCCESS,
  payload: data
})

const getNotificationFailed = (err) => ({
  type: GET_NOTIFICATION_ERROR,
  payload: err
})

const getNotificationPending = () => ({
  type: GET_NOTIFICATION_PENDING
})

const deleteThisNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  payload: id
})