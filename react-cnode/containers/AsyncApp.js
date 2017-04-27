import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchTopicsGet } from "../actions";
import { FormatTime } from "../common";
import Footer from '../components/Footer'
import IScroll from 'iscroll'

class Nav extends Component {
	render() {
		var setCur = {};
    	setCur[this.props.tab] = 'on';
		return (
			<ul>
				<li className={setCur.all}>
					<Link to='/' activeClassName="active">全部</Link>
				</li>
				<li className={setCur.good}>
					<Link to='/?tab=good' activeClassName="active">精华</Link>
				</li>
				<li className={setCur.share}>
					<Link to='/?tab=share' activeClassName="active">分享</Link>
				</li>
				<li className={setCur.ask}>
					<Link to='/?tab=ask' activeClassName="active">问答</Link>
				</li>
				<li className={setCur.job}>
					<Link to='/?tab=job' activeClassName="active">招聘</Link>
				</li>
			</ul>
		)
	}
}

class AsyncApp extends Component {
	componentDidMount() {
		this.props.dispatch(fetchTopicsGet()).then(() => {
			console.log(this.refs['caption'])
			this.myScroll = new IScroll(this.refs['caption'],{
				scrollbars: true,
    mouseWheel: true,
    interactiveScrollbars: true,
    shrinkScrollbars: 'scale',
    fadeScrollbars: false,
    checkDOMChanges: true
			}); 
			var doSoming = function() {
				console.log('sfsf')
			}
			this.myScroll.on('scrollEnd', doSoming);
		})
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.location.query.tab != nextProps.location.query.tab) {
			let tab = nextProps.location.query.tab || ''

			this.props.dispatch(fetchTopicsGet(null, tab));
		}
	}
	render() {
		return (
			<div className="async-app">
				<header>
					<nav className="index-nav">
						<Nav tab={this.props.location.query.tab || 'all'} />
					</nav>
				</header>
				<div ref="caption" className="caption" style={{opacity: this.props.isFetching ? 0.5 : 1}}>
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
				<Footer index="0" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isFetching: state.topics.isFetching,
		topics: state.topics.posts || []
	};
}

export default connect(mapStateToProps)(AsyncApp);
