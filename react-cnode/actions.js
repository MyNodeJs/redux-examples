import fetch from "isomorphic-fetch";

export const REQUEST_LOGIN_POSTS = "REQUEST_LOGIN_POSTS";
export const RECEIVE_LOGIN_POSTS = "RECEIVE_LOGIN_POSTS";
export const REQUEST_USER_GET = "REQUEST_USER_GET";
export const RECEIVE_USER_GET = "RECEIVE_USER_GET";
export const LOGOUT = "LOGOUT";
export const REQUEST_TOPIC_GET = 'REQUEST_TOPIC_GET'
export const RECEIVE_TOPIC_GET = 'RECEIVE_TOPIC_GET'
export const REQUEST_UPS_POSTS = 'REQUEST_UPS_POSTS'
export const RECEIVE_UPS_POSTS = 'RECEIVE_UPS_POSTS'
export const REQUEST_TOPIC_CREATE_POSTS = 'REQUEST_TOPIC_CREATE_POSTS'
export const RECEIVE_TOPIC_CREATE_POSTS = 'RECEIVE_TOPIC_CREATE_POSTS'
export const REQUEST_MY_MESSAGES_GET = 'REQUEST_MY_MESSAGE_GET'
export const RECEIVE_MY_MESSAGES_GET = 'RECEIVE_MY_MESSAGES_GET'
export const REQUEST_TOPICS_GET = 'REQUEST_TOPICS_GET'
export const RECEIVE_TOPICS_GET = 'RECEIVE_TOPICS_GET'

export function requestLoginPosts(accesstoken) {
  return {
    type: REQUEST_LOGIN_POSTS,
    accesstoken
  };
}

export function receiveLoginPosts(json) {
  return {
    type: RECEIVE_LOGIN_POSTS,
    posts: json
  };
}

export function fetchLoginPosts(accesstoken) {
  return dispatch => {
    dispatch(requestLoginPosts(accesstoken));
    return fetch("http://localhost:8081/api/v1/accesstoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "accesstoken=" + accesstoken
    })
      .then(response => response.json())
      .then(json => dispatch(receiveLoginPosts(json)));
  };
}

export function requestUserGet(user) {
  return {
    type: REQUEST_USER_GET,
    user
  };
}

export function receiveUserGet(json) {
  return {
    type: RECEIVE_USER_GET,
    posts: json
  };
}

export function fetchUserGet(user) {
  return dispatch => {
    dispatch(requestUserGet(user));
    return fetch("http://localhost:8081/api/v1/user/" + user)
      .then(response => response.json())
      .then(json => dispatch(receiveUserGet(json)));
  };
}

export function logout(loginname) {
  return {
    type: LOGOUT,
    loginname
  };
}

export function requestTopicGet() {
  return {
    type: REQUEST_TOPIC_GET
  }
} 

export function receiveTopicGet(json) {
  return {
    type: RECEIVE_TOPIC_GET,
    posts: json
  }
}

export function fetchTopicGet(id, mdrender = true, accesstoken) {
  return dispatch => {
    dispatch(requestTopicGet());
    return fetch("http://localhost:8081/api/v1/topic/" + id)
      .then(response => response.json())
      .then(json => dispatch(receiveTopicGet(json)));
  };
}

export function requestUpsPosts() {
  return {
    type: REQUEST_UPS_POSTS
  }
}

export function receiveUpsPosts(json, user_id, index) {
  return {
    type: RECEIVE_UPS_POSTS,
    user_id, 
    posts: json,
    index
  }
}

export function fetchUpsPosts(id, accesstoken, user_id, index) {
  return dispatch => {
    dispatch(requestUpsPosts());
    return fetch(`http://localhost:8081/api/v1/reply/${id}/ups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "accesstoken=" + accesstoken
    })
      .then(response => response.json())
      .then(json => dispatch(receiveUpsPosts(json, user_id, index)));
  };
}

export function requestTopicCreatePosts() {
  return {
    type: REQUEST_TOPIC_CREATE_POSTS
  }
}

export function receiveTopicCreatePosts(json, content) {
  return {
    type: RECEIVE_TOPIC_CREATE_POSTS,
    posts: json,
    content
  }
}

export function fetchTopicCreatePosts(id, accesstoken, title, tab, content) {
  return dispatch => {
    dispatch(requestTopicCreatePosts());
    return fetch(`http://localhost:8081/api/v1/topic/${id}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "accesstoken=" + accesstoken + '&title=' + title + '&tab=' + tab + '&content=' + content
    })
      .then(response => response.json())
      .then(json => dispatch(receiveTopicCreatePosts(json, content)));
  };
}

export function requestMyMessagesGet() {
  return {
    type: REQUEST_MY_MESSAGES_GET
  }
}

export function receiveMyMessagesGet(json) {
  return {
    type: RECEIVE_MY_MESSAGES_GET,
    posts: json
  }
}

export function fetchMyMessagesGet(accesstoken, mdrender=true) {
  return dispatch => {
    dispatch(requestMyMessagesGet());
    return fetch(`http://localhost:8081/api/v1/messages?accesstoken=${accesstoken}&mdrender=${mdrender}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMyMessagesGet(json)));
  };
}

export function requestTopicsGet() {
  return {
    type: REQUEST_TOPICS_GET
  }
}

export function receiveTopicsGet(json) {
  return {
    type: RECEIVE_TOPICS_GET,
    posts: json
  }
}

export function fetchTopicsGet(page=1, tab='ask', limit=100, mdrender=true) {
  return dispatch => {
    dispatch(requestTopicsGet());
    return fetch(`http://localhost:8081/api/v1/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopicsGet(json)));
  };
}