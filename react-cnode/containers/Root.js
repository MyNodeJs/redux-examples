import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";
import Signin from "../components/Signin";
import UserView from "../components/UserView";
import Logout from "../components/Logout";
import Topic from "../components/Topic";
import MyMessages from '../components/MyMessages'

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={AsyncApp} />
          <Route path="/signin" component={Signin} />
          <Route path="/logout" component={Logout} />
          <Route path="/user/:loginname" component={UserView} />
          <Route path="/topic/:id" component={Topic} />
          <Route path="/my/messages" component={MyMessages} />
        </Router>
      </Provider>
    );
  }
}
