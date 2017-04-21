import { combineReducers } from "redux";
import { browserHistory } from 'react-router'
import { isLogin } from './common'
import {
  REQUEST_LOGIN_POSTS,
  RECEIVE_LOGIN_POSTS,
  REQUEST_USER_GET,
  RECEIVE_USER_GET,
  LOGOUT,
  REQUEST_TOPIC_GET,
  RECEIVE_TOPIC_GET,
  REQUEST_UPS_POSTS,
  RECEIVE_UPS_POSTS
} from "./actions";

function user(
  state = {
    isFetching: false,
    loginname: "",
    accesstoken: ""
  },
  action
) {
  switch (action.type) {
    case REQUEST_LOGIN_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        accesstoken: action.accesstoken
      });
    case RECEIVE_LOGIN_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        loginname: action.posts.loginname
      });
    case LOGOUT:
      return Object.assign({}, state, {
        loginname: action.loginname
      });
    default:
      return state;
  }
}

function userView(
  state = {
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER_GET:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_USER_GET:
      return Object.assign({}, state, {
        ...action.posts.data,
        isFetching: false
      });
    default:
      return state;
  }
}

function replies(state, action) {
  switch (action.type) {
    case RECEIVE_UPS_POSTS:
      let arr = state.slice()
      if(isLogin()) {
        if(action.posts.success) {
          if(action.posts.action == 'up') {
            arr[action.index].ups.push(action.user_id)
          } else if(action.posts.action == 'down') {
            for(let i=0; i<arr[action.index].ups.length; i++) {
              if(arr[action.index].ups[i] == action.user_id) {
                arr[action.index].ups.splice(i, 1)
              }
            }
          }
        }
      } else {
        browserHistory.push({pathname: '/signin'})
      }
      return arr
    default:
      return state
  }
}

function topic(
  state = {
    isFetching: false,
    isUpsFetching: false,
    replies: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_TOPIC_GET:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TOPIC_GET:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.posts.data
      });
    case REQUEST_UPS_POSTS:
      return Object.assign({}, state, {
        
      })
    case RECEIVE_UPS_POSTS:
      return Object.assign({}, state, {
        replies: replies(state.replies, action)
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  userView,
  topic
});

export default rootReducer;
