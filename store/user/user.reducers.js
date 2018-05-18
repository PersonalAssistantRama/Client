import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOADING,
  ERROR
} from './user.actionTypes'

const initalState = {
  data: {},
  loading: false,
  error: false
}

const reducers = (state={...initialState}, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
    return ({
      ...state,
      data: action.payload,
      loading: false
    })
    case LOGIN_SUCCESS:
    return ({
      ...state,
      data: action.payload,
      loading: false
    })
    case LOADING:
    return({
      ...state,
      loading: true
    })
    case ERROR:
    return({
      ...state,
      error: true,
      loading: false
    })
    default:
    return state
  }
}