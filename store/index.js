import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import chatReducer from './chat/chat.reducers'

const reducers = combineReducers({
  data: chatReducer
})

const store = createStore(reducers)

export default store;

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store