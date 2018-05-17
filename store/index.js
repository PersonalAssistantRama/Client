import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import data from './chat/chat.reducers'

const reducers = combineReducers({
  data: data
})

const store = createStore(reducers)

export default store;
