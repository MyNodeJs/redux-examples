import fetch from 'isomorphic-fetch'

export const REQUEST_LOGIN_POSTS = 'REQUEST_LOGIN_POSTS'
export const RECEIVE_LOGIN_POSTS = 'RECEIVE_LOGIN_POSTS'
export const REQUEST_USER_GET = 'REQUEST_USER_GET'
export const RECEIVE_USER_GET = 'RECEIVE_USER_GET'

export function requestLoginPosts(accesstoken) {
  return {
    type: REQUEST_LOGIN_POSTS,
    accesstoken
  }
}

export function receiveLoginPosts(json) {
  return {
    type: RECEIVE_LOGIN_POSTS,
    posts: json,
  }
}

export function fetchLoginPosts(accesstoken) {
  return dispatch => {
    dispatch(requestLoginPosts(accesstoken))
    return fetch('http://localhost:8081/api/v1/accesstoken', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "accesstoken=" + accesstoken
      })
      .then(response => response.json())
      .then(json => dispatch(receiveLoginPosts(json)))
  }
}

export function requestUserGet(user) {
  return {
    type: REQUEST_USER_GET,
    user
  }
}

export function receiveUserGet(json) {
  return {
    type: RECEIVE_USER_GET,
    posts: json
  }
}

export function fetchUserGet(user) {
  return dispatch => {
    dispatch(requestUserGet(user))
    return fetch('http://localhost:8081/api/v1/user/' + user)
              .then(response => response.json())
              .then(json => dispatch(receiveUserGet(json)))
  }
}

