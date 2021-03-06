import {
  GET_NOTIFICATION_PENDING,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_ERROR,
  DELETE_NOTIFICATION
} from './notification.actionTypes'

const initialState = {
  data: [],
  loading: false,
  error: {
    status: false,
    message: ''
  }
}

const reducers = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_PENDING:
      return {
        ...state,
        loading: true,
      }
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case GET_NOTIFICATION_ERROR:
      let errObj = {
        status: true,
        message: action.payload.message
      }
      return {
        ...state,
        error: {
          ...errObj
        },
        loading: false
      }
    case DELETE_NOTIFICATION:
      console.log('masuk sini')
      console.log('state', state.data)
      console.log('payload', action.payload)
      var removed = state.data.filter((data) => data._id != action.payload)
      return ({
        ...state,
        data: removed
      })
    default:
      return state;
  }
}

export default reducers;