import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTopicGet } from "../actions";
import DataLoad from "./DataLoad";
import ReList from "./ReList";
import ReplyBox from "./ReplyBox";

class Header extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.context.router.goBack();
	}
	render() {
		return (
			<header>
				<div onClick={this.handleClick} className="icon">
					<i className="iconfont icon-fanhui"></i>
				</div>
				<h2>详情</h2>
			</header>
		);
	}
}

Header.contextTypes = {
	router: React.PropTypes.object.isRequired
};

class Article extends Component {
	render() {
		return (
			<div>
				<div className="user">
					<div
						style={{ backgroundImage: `url(${this.props.url})` }}
						className="icon"
					/>
					<div className="data">
						<div>
							{this.props.loginname}
							{" "}
							{this.props.formatTime(this.props.create_at)}
						</div>
						<div>
							阅读:
							{this.props.visit_count}
							{" "}
							回复:
							{this.props.reply_count}
						</div>
					</div>
				</div>
				<h2 className="tit2">{this.props.title}</h2>
				<div
					className="content"
					dangerouslySetInnerHTML={{ __html: this.props.content }}
				/>
				<h3 className="tit3">共{this.props.reply_count}条回复</h3>
				<ReList
					dispatch={this.props.dispatch}
					topicid={this.props.topicid}
					replies={this.props.replies}
					author_id={this.props.author_id}
					tab={this.props.tab}
					title={this.props.title}
				/>
				<ReplyBox
					replyall={"true"}
					dispatch={this.props.dispatch}
					topicid={this.props.topicid}
					loginname={this.props.loginname}
					tab={this.props.tab}
					title={this.props.title}
				/>
			</div>
		);
	}
}

class Topic extends Component {
	constructor(props) {
		super(props);
	}
	formatTime(time) {
		return (time + "").substring(0, 10);
	}
	componentDidMount() {
		const { dispatch, params } = this.props;

		dispatch(fetchTopicGet(params.id)).then(() => {
			this.loaded = true;

			this.forceUpdate();
		});
	}
	render() {
		let url = "";
		let loginname = "";

		if (this.loaded) {
			url = this.props.author.avatar_url;
			loginname = this.props.author.loginname;
		}

		let main = this.props.isFetching
			? <DataLoad />
			: <Article
					{...this.props}
					url={url}
					loginname={loginname}
					formatTime={this.formatTime}
					dispatch={this.props.dispatch}
					topicid={this.props.topicid}
					tab={this.props.tab}
					title={this.props.title}
				/>;

		return (
			<div className="topic">
				<Header />
				{main}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tab: state.topic.tab,
		reply_count: state.topic.reply_count,
		visit_count: state.topic.visit_count,
		create_at: state.topic.create_at,
		author: state.topic.author,
		title: state.topic.title,
		content: state.topic.content,
		isFetching: state.topic.isFetching,
		replies: state.topic.replies,
		author_id: state.topic.author_id,
		topicid: state.topic.id
	};
}

export default connect(mapStateToProps)(Topic);
