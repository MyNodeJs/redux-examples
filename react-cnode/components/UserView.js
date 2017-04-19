import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import $ from "webpack-zepto";
import { fetchUserGet } from "../actions";

class Header extends Component {
	constructor(props) {
		super(props);
	}
	getText() {
		const { loginname, params } = this.props;
		console.log(params.loginname);

		if (loginname == params.loginname) {
			return "个人中心";
		} else {
			return params.loginname + "的个人中心";
		}
	}
	render() {
		return (
			<header className="user-center">
				<div className="content">
					{this.getText()}
				</div>
				<div className="icon">
					<Link to="/logout">退出</Link>
				</div>
			</header>
		);
	}
}

class UserView extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	formatTime(time) {
		return (time + "").substring(0, 10);
	}
	handleClick(e) {
		$(e.target).addClass("current");
		$(e.target).siblings().removeClass("current");

		let index = $(e.target).index();

		$(e.target)
			.parent()
			.next()
			.find("ul")
			.addClass("hide")
			.eq(index)
			.removeClass("hide");
	}
	componentDidMount() {
		const { loginname, dispatch, params } = this.props;

		dispatch(fetchUserGet(loginname || params.loginname));
	}
	render() {
		const {
			loginname,
			dispatch,
			params,
			avatarUrl,
			score,
			createAt
		} = this.props;

		let lis, repliesLis;

		if (this.props.recentTopics && this.props.recentTopics.length) {
			lis = this.props.recentTopics.map(topic => {
				return (
					<li key={topic.id}>
						<Link to={`/topic/${topic.id}`}>{topic.title}</Link>
						<time>{this.formatTime(topic.last_reply_at)}</time>
					</li>
				);
			});
		}

		if (this.props.recentReplies && this.props.recentReplies.length) {
			repliesLis = this.props.recentReplies.map(reply => {
				return (
					<li key={reply.id}>
						<Link to={`/topic/${reply.id}`}>{reply.title}</Link>
						<time>{this.formatTime(reply.last_reply_at)}</time>
					</li>
				);
			});
		}

		return (
			<div>
				<Header loginname={loginname} params={params} />
				<div className="user-index">
					<div className="headimg">
						<div className="headimg-item">
							<div
								style={{
									backgroundImage: "url(" + avatarUrl + ")"
								}}
								className="user-headimg"
							/>
						</div>
						<div className="name">{params.loginname}</div>
						<div className="score">
							积分:{score}{" "}注册于:{this.formatTime(createAt)}
						</div>
					</div>
					<div className="tab-nav">
						<div className="current" onClick={this.handleClick}>
							主题
						</div>
						<div onClick={this.handleClick}>回复</div>
					</div>
					<div className="content">
						<ul className="list">
							{lis}
						</ul>
						<ul className="list hide">
							{repliesLis}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loginname: state.user.loginname,
		score: state.userView.score,
		createAt: state.userView.create_at,
		avatarUrl: state.userView.avatar_url,
		recentTopics: state.userView.recent_topics,
		recentReplies: state.userView.recent_replies
	};
}

export default connect(mapStateToProps)(UserView);
