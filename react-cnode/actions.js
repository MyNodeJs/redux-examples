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
