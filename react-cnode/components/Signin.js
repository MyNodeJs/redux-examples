import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setData } from '../database'
import {
	REQUEST_LOGIN_POSTS,
	RECEIVE_LOGIN_POSTS,
	requestLoginPosts,
	receiveLoginPosts,
	fetchLoginPosts
} from "../actions";

class Signin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { dispatch } = this.props;

		return (
			<div>
				<Header />
				<div className="signin">
					<div className="content">
						<div className="text">
							<input
								ref="accesstoken"
								type="text"
								placeholder="Access Token"
							/>
						</div>
						<input
							onClick={() => {
								dispatch(
									fetchLoginPosts(this.refs.accesstoken.value)
								).then(
									function(res) {
										setData('user', {
											accesstoken: this.props.accesstoken,
											loginname: res.posts.loginname
										})
										this.context.router.push({
											pathname: "/user/" +
												res.posts.loginname
										});
									}.bind(this)
								);
							}}
							type="button"
							className="btn"
							value="登录"
						/>
					</div>
				</div>
			</div>
		);
	}
}

Signin.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(state => ({
	accesstoken: state.user.accesstoken
}))(Signin);
