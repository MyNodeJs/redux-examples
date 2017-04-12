import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browerHistory } from 'react-router'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browerHistory}>
        	<Route path="/" component={AsyncApp} />
        </Router>
      </Provider>
    )
  }
}