import React, { Component } from "react";

class Header extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.context.router.goBack()
	}
	render() {
		return (
			<div>
				<header className="signin-header">
					<div onClick={this.handleClick} className="fanhui iconfont icon-fanhui"></div>
					<div className="content">登录</div>
				</header>
			</div>
		);
	}
}

Header.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Header;
