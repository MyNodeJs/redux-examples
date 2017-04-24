import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTopicCreatePosts } from '../actions'
import { isLogin } from '../common'
import { getData } from '../database'

class ReplyBox extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		if(isLogin()) {
			let content = ''
			
			if(this.props.replyall) {
				content = this.refs.reply.value
			} else {
				content = `@${this.props.loginname} ${this.refs.reply.value}`
			}
			this.refs.reply.value = ''
			this.props.onEmptyReplyBox && this.props.onEmptyReplyBox()
			this.props.dispatch(fetchTopicCreatePosts(this.props.topicid, getData('user').accesstoken, this.props.title, this.props.tab, content))
		} else {
			this.context.router.push({
				pathname: '/signin'
			})
		}
	}
	render() {
		let display = 'block'
		let placeholder = ''
		if(!this.props.replyall) {
			display = this.props.replyBoxIndex[0] == this.props.index ? 'block' : 'none'
			placeholder = `@${this.props.loginname}`
		}

		return (
			<div className="reply-box" style={{display: display}}>
				<div className="text">
					<textarea ref="reply" placeholder={placeholder}>

					</textarea>
				</div>
				<div className="btn-box">
					<input onClick={() => {this.handleClick()}} type="button" value="回复" />
				</div>
			</div>
		)
	}
}

ReplyBox.contextTypes = {
	router: React.PropTypes.object.isRequired
};


export default ReplyBox