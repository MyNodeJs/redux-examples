import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchTopicsGet } from "../actions";
import { FormatTime } from "../common";

class Nav extends Component {
	render() {
		return (
			<ul>
				<li>
					<Link to='/' activeClassName="active"></Link>
				</li>
			</ul>
		)
	}
}

class AsyncApp extends Component {
	componentDidMount() {
		this.props.dispatch(fetchTopicsGet());
	}
	render() {
		return (
			<div className="async-app">
				<nav className="index-nav">
					
				</nav>
				<ul>
					{this.props.topics.map((topic, index) => {
						let iconClass = "";

						if (topic.top) {
							iconClass = "icon-top";
						} else if (topic.good) {
							iconClass = "icon-good";
						} else if (topic.tab == "share") {
							iconClass = "icon-share";
						} else if (topic.tab == "ask") {
							iconClass = "icon-ask";
						} else if (topic.tab == "job") {
							iconClass = "icon-job";
						}
						return (
							<li key={topic.id}>
								<Link to={`/topic/${topic.id}`}>
									<div className="flex">
										<div className="font">
											<i
												className={`iconfont ${iconClass}`}
											/>
										</div>
										<h3>{topic.title}</h3>
									</div>
									<div className="bottom">
										<div className="author flex">
											<div
												style={{
													backgroundImage: `url(${topic.author.avatar_url})`
												}}
												className="user-headimg"
											/>
											<div className="con">
												<p className="flex">
													<span className="name">
														{topic.author.loginname}
													</span>
													<span className="count">{`${topic.reply_count}/${topic.visit_count}`}</span>
												</p>
												<p className="flex">
													<time className="first">
														{FormatTime(
															topic.last_reply_at
														)}
													</time>
													<time>
														{FormatTime(
															topic.create_at
														)}
													</time>
												</p>
											</div>
										</div>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		topics: state.topics.posts || []
	};
}

export default connect(mapStateToProps)(AsyncApp);
