import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchTopicsGet } from '../actions'

class AsyncApp extends Component {
	componentDidMount() {
		this.props.dispatch(fetchTopicsGet())
	}
	render() {
		return <div>AsyncApp</div>;
	}
}

export default connect()(AsyncApp);
