import React, { Component } from "react";
import { Link } from 'react-router'
import fetch from "isomorphic-fetch";
import { connect } from 'react-redux'
import FormatTime from '../common/FormatTime'
import { fetchUpsPosts } from '../actions'
import { isLogin } from '../common'
import { getData } from '../database'

class ReList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showReply: false
		}

		this.handleDianZhan = this.handleDianZhan.bind(this)
		this.handleReply = this.handleReply.bind(this)
	}
	handleDianZhan(id, accesstoken, author_id, index) {
		return this.props.dispatch(fetchUpsPosts(id, accesstoken, author_id, index))
	}
	handleReply() {

	}
	render() {
		return (
			<ul className="re-list">
				{this.props.replies.map((reply, index) => {
					return (
						<li key={reply.id}>
							<div className="headimg">
								<div className="icon" style={{backgroundImage: `url(${reply.author.avatar_url})`}}></div>
							</div>
							<div className="main">
								<div className="upper">
									<Link to={`/user/${reply.author.loginname}`}>{reply.author.loginname}</Link>
									<time>{FormatTime(reply.create_at)}</time>
									<div className="lou">{`${index}#`}</div>
								</div>
								<div className="content" dangerouslySetInnerHTML={{__html: reply.content}}></div>
								<div className="bottom">
									<div onClick={(e) => {
										let target = e.currentTarget
										console.log(target.classList['value'])
										if(target.classList['value'].indexOf('up') != -1) {
											target.className = target.className.replace('up', '')
										} else {
											target.className = target.className + ' up'
										}
										if(isLogin()) {
											this.handleDianZhan(reply.id, getData('user').accesstoken, this.props.author_id, index)
										} else {
											this.context.router.push({
												pathname: '/signin'
											})
										}
									}} className="zhan iconfont icon-dianzan"><em>{reply.ups.length}</em></div>
									<div onClick={(e) => {
										this.handleReply()
									}} className="reply iconfont icon-huifu"></div>
								</div>
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

function mapStateToProps(state) {
	return {
		accesstoken: state.user.accesstoken
	};
}

export default connect(mapStateToProps)(ReList);
