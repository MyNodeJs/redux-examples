import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions";

class Header extends Component {
	render() {
		return (
			<header>
				<div className="fanhui">
					<Link to={`/user/${this.props.loginname}`}>&lt;</Link>
				</div>
				<div className="content">退出</div>
			</header>
		);
	}
}

class Logout extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		const { dispatch } = this.props;

		dispatch(logout(""));

		this.context.router.replace({
			pathname: "/"
		});
	}
	render() {
		const { loginname } = this.props;
		return (
			<div className="logout">
				<Header loginname={loginname} />
				<div className="container">
					<div className="center">
						<input
							onClick={this.handleClick}
							type="button"
							value="确认退出登录?"
						/>
					</div>
				</div>
			</div>
		);
	}
}

Logout.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		loginname: state.user.loginname
	};
}

export default connect(mapStateToProps)(Logout);
