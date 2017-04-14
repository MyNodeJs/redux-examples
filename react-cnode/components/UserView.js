import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserGet } from '../actions'

class Header extends Component {
	constructor(props) {
		super(props)
	}
	getText() {
		const { loginname, params } = this.props

		if( loginname == params.loginname ) {
			return '个人中心'
		} else {
			return params.loginname + '的个人中心'
		}
	}
	render() {
		return (
			<header className="user-center">
				<div className="content">
					{this.getText()}
				</div>
				<div className="icon">
					<a href="/logout">退出</a>
				</div>
			</header>
		)
	}
}

class UserView extends Component {
	constructor(props) {
		super(props)
	}
	formatTime(time) {
		return (time + '').substring(0, 10)
	}
	componentDidMount() {
		const { loginname, dispatch, params } = this.props
		
		dispatch(fetchUserGet(loginname || params.loginname))
	}
	render() {
		const { loginname, dispatch, params, avatarUrl, score, createAt } = this.props

		return (
			<div>
				<Header loginname={loginname} params={params} />
				<div className="user-index">
					<div className="headimg">
						<div className="headimg-item">
						    <div
	  						    style={{backgroundImage: 'url(' + avatarUrl + ')'}}
							    className="user-headimg">
							</div>
						</div>
						<div className="name">{params.loginname}</div>
						<div className="score">积分:{score}{' '}注册于:{this.formatTime(createAt)}</div>
					</div>
					<div className="tab-nav">
						<div className="current">主题</div>
						<div>回复</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		loginname: state.user.loginname,
		score: state.userView.score,
		createAt: state.userView.create_at,
		avatarUrl: state.userView.avatar_url
	}
}

export default connect(mapStateToProps)(UserView)