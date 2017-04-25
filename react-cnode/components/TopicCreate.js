import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../database";
import { fetchTopicPublishPosts } from "../actions";
import { isLogin } from "../common";

class Header extends Component {
	render() {
		return (
			<header className="flex">
				<h2>发表主题</h2>
				<div
					onClick={() => {
						this.props.onPublish();
					}}
					className="icon"
				>
					<i className="iconfont icon-fabu" />
				</div>
			</header>
		);
	}
}

class TopicCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectVal: "",
			inputVal: "",
			textareaVal: ""
		};

		this.handlePublish = this.handlePublish.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleTextarea = this.handleTextarea.bind(this);
	}
	handlePublish() {
		if (isLogin()) {
			this.props
				.dispatch(
					fetchTopicPublishPosts(
						getData("user").accesstoken,
						this.state.inputVal,
						this.state.selectVal,
						this.state.textareaVal
					)
				)
				.then(json => {
					this.context.router.push({
						pathname: `/topic/${json.posts.topic_id}`
					});
				});
		} else {
			this.context.router.push({
				pathname: "/signin"
			});
		}
	}
	handleSelect(e) {
		this.setState({
			selectVal: e.target.value
		});
	}
	handleInput(e) {
		this.setState({
			inputVal: e.target.value
		});
	}
	handleTextarea(e) {
		this.setState({
			textareaVal: e.target.value
		});
	}
	render() {
		return (
			<div className="topic-create">
				<Header onPublish={this.handlePublish} />
				<div className="content">
					<div className="item">
						<select
							name="tab"
							defaultValue={this.state.selectVal}
							onChange={e => {
								this.handleSelect(e);
							}}
						>
							<option>请选择发表类型</option>
							<option value="share">分享</option>
							<option value="ask">问答</option>
							<option value="job">招聘</option>
						</select>
					</div>
					<div className="item">
						<input
							defaultValue={this.state.inputVal}
							onChange={e => {
								this.handleInput(e);
							}}
							type="text"
							placeholder="标题字数 10 字以上"
						/>
					</div>
					<div className="item">
						<textarea
							defaultValue={this.state.textareaVal}
							onChange={e => {
								this.handleTextarea(e);
							}}
							placeholder="内容字数 30 字以上"
						/>
					</div>
				</div>
			</div>
		);
	}
}

TopicCreate.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect()(TopicCreate);
