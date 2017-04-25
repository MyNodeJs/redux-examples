import { combineReducers } from "redux";
import { browserHistory } from "react-router";
import { isLogin } from "./common";
import { getData } from "./database";
import {
  REQUEST_LOGIN_POSTS,
  RECEIVE_LOGIN_POSTS,
  REQUEST_USER_GET,
  RECEIVE_USER_GET,
  LOGOUT,
  REQUEST_TOPIC_GET,
  RECEIVE_TOPIC_GET,
  REQUEST_UPS_POSTS,
  RECEIVE_UPS_POSTS,
  REQUEST_TOPIC_CREATE_POSTS,
  RECEIVE_TOPIC_CREATE_POSTS,
  REQUEST_MY_MESSAGES_GET,
  RECEIVE_MY_MESSAGES_GET,
  REQUEST_TOPICS_GET,
  RECEIVE_TOPICS_GET
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
      let arr = state.slice();
      if (isLogin()) {
        if (action.posts.success) {
          if (action.posts.action == "up") {
            arr[action.index].ups.push(action.user_id);
          } else if (action.posts.action == "down") {
            for (let i = 0; i < arr[action.index].ups.length; i++) {
              if (arr[action.index].ups[i] == action.user_id) {
                arr[action.index].ups.splice(i, 1);
              }
            }
          }
        }
      } else {
        browserHistory.push({ pathname: "/signin" });
      }
      return arr;
    case RECEIVE_TOPIC_CREATE_POSTS:
      let topicCreateArr = state.slice();
      if (isLogin()) {
        if (action.posts.success) {
          topicCreateArr.push({
            id: action.posts.reply_id,
            author: {
              loginname: getData("user").loginname,
              avatar_url: getData("user").avatar_url
            },
            content: action.content,
            ups: [],
            create_at: new Date(),
            reply_id: null,
            is_uped: false
          });
        }

        return topicCreateArr;
      } else {
        browserHistory.push({ pathname: "/signin" });
      }
    default:
      return state;
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
      return Object.assign({}, state, {});
    case RECEIVE_UPS_POSTS:
    case RECEIVE_TOPIC_CREATE_POSTS:
      return Object.assign({}, state, {
        replies: replies(state.replies, action)
      });
    default:
      return state;
  }
}

function myMessages(
  state = {
    isFetching: false,
    posts: { data: { has_read_messages: [] } }
  },
  action
) {
  switch (action.type) {
    case REQUEST_MY_MESSAGES_GET:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_MY_MESSAGES_GET:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts
      });
    default:
      return state;
  }
}

function topics(
  state = {
    isFetching: false,
    posts: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_TOPICS_GET:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TOPICS_GET:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  userView,
  topic,
  myMessages,
  topics
});

export default rootReducer;
