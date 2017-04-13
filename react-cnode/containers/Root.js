import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import Signin from '../components/Signin'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
        	<Route path="/" component={AsyncApp} />
        	<Route path="/signin" component={Signin} />
        </Router>
      </Provider>
    )
  }
}