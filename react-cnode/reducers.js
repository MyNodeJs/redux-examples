import { combineReducers } from 'redux'
import {
  REQUEST_LOGIN_POSTS, RECEIVE_LOGIN_POSTS,
  REQUEST_USER_GET, RECEIVE_USER_GET
} from './actions'

function user(state = {
  isFetching: false,
  loginname: ""
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_LOGIN_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        loginname: action.posts.loginname
      })
    default:
      return state
  }
}

function userView(state = {
  isFetching: false
}, action) {
  switch(action.type) {
    case REQUEST_USER_GET:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER_GET:
      return Object.assign({}, state, {
        ...action.posts.data,
        isFetching: false
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  userView
})

export default rootReducer