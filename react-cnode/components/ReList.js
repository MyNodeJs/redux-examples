import React, { Component } from "react";
import { Link } from "react-router";
import fetch from "isomorphic-fetch";
import { connect } from "react-redux";
import FormatTime from "../common/FormatTime";
import { fetchUpsPosts } from "../actions";
import { isLogin } from "../common";
import { getData } from "../database";
import ReplyBox from "./ReplyBox";

class ReList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			replyBoxIndex: [] //显示的回复框号
		}

		this.handleDianZhan = this.handleDianZhan.bind(this);
		this.handleReply = this.handleReply.bind(this);
	}
	handleEmptyReplyBox() {
		this.setState({
			replyBoxIndex: []
		})
	}
	handleDianZhan(id, accesstoken, author_id, index) {
		return this.props.dispatch(
			fetchUpsPosts(id, accesstoken, author_id, index)
		);
	}
	handleReply(index) {
		let arr = this.state.replyBoxIndex

		if (arr[0] == index) {
			arr.splice(0, 1)
		} else {
			arr[0] = index
		}

		this.setState({
			replyBoxIndex: arr
		})
	}
	handleDelete() {

	}
	render() {
		return (
			<ul className="re-list">
				{this.props.replies.map((reply, index) => {
					return (
						<li key={reply.id}>
							<div className="headimg">
								<div
									className="icon"
									style={{ backgroundImage: `url(${reply.author.avatar_url})` }}
								/>
							</div>
							<div className="main">
								<div className="upper">
									<Link to={`/user/${reply.author.loginname}`}>
										{reply.author.loginname}
									</Link>
									<time>{FormatTime(reply.create_at)}</time>
									<div className="lou">{`${index}#`}</div>
								</div>
								<div
									className="content"
									dangerouslySetInnerHTML={{ __html: reply.content }}
								/>
								<div className="bottom">
									<div
										onClick={e => {
											let target = e.currentTarget;
											console.log(target.classList["value"]);
											if (target.classList["value"].indexOf("up") != -1) {
												target.className = target.className.replace("up", "");
											} else {
												target.className = target.className + " up";
											}
											if (isLogin()) {
												this.handleDianZhan(
													reply.id,
													getData("user").accesstoken,
													this.props.author_id,
													index
												);
											} else {
												this.context.router.push({
													pathname: "/signin"
												});
											}
										}}
										className="zhan iconfont icon-dianzan"
									>
										<em>{reply.ups.length}</em>
									</div>
									<div
										onClick={e => {
											this.handleReply(index)
										}} 
										className="reply iconfont icon-huifu"
									>
									</div>
								</div>
								<ReplyBox onEmptyReplyBox={() => {this.handleEmptyReplyBox()}} dispatch={this.props.dispatch} topicid={this.props.topicid} loginname={reply.author.loginname} index={index} replyBoxIndex={this.state.replyBoxIndex} tab={this.props.tab} title={this.props.title}></ReplyBox>
							</div>
						</li>
					);
				})}
			</ul>
		);
	}
}

ReList.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default ReList
