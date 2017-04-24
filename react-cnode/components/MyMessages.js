import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMyMessagesGet } from '../actions'
import { getData } from '../database'
import { isLogin } from '../common'
import FormatTime from "../common/FormatTime";

class Header extends Component {
	render() {
		return (
			<header>
				<h2>消息</h2>
			</header>
		)
	}
}

class MyMessages extends Component {
	componentDidMount() {
		if(isLogin()) {
			this.props.dispatch(fetchMyMessagesGet(getData('user').accesstoken))
		} else {
			this.context.router.push({
				pathname: '/signin'
			})
		}
	}
	render() {
		console.log(this.props.myMessages)
		return (
			<div className="myMessages">
				<Header></Header>
				<div className="msg-box">
					<ul className="list">
						{this.props.myMessages.map((message, index) => {
							return (
								<li key={message.id}>
									<Link to={`/user/${message.author.loginname}`}>
										<div style={{backgroundImage: `url(${message.author.avatar_url})`}} className="user-headimg"></div>
									</Link>
									<div className="righter">
										<div className="name">
											{message.author.loginname}
											<time>{FormatTime(message.create_at)}</time>
										</div>
										<div className="reply">
											回复了你的话题:
											<Link to={`/topic/${message.topic.id}`}>
												{message.topic.title}
											</Link>
										</div>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

MyMessages.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	console.log(state)
	return {
		myMessages: state.myMessages.posts.data.has_read_messages || []
	}
}

export default connect(mapStateToProps)(MyMessages)