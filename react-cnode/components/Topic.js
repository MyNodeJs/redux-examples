import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchTopicGet } from '../actions'
import DataLoad from './DataLoad'

class Header extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.context.router.goBack()
	}
	render() {
		return (
			<header>
				<div onClick={this.handleClick} className="icon">&lt;</div>
				<h2>详情</h2>
			</header>
		)
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
					<div style={{backgroundImage: `url(${this.props.url})`}} className="icon"></div>
					<div className="data">
						<div>{this.props.loginname}{' '}{this.props.formatTime(this.props.create_at)}</div>
						<div>阅读:{this.props.visit_count}{' '}回复:{this.props.reply_count}</div>
					</div>
				</div>
				<h2 className="tit2">{this.props.title}</h2>
				<div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
				<h3 className="tit3">共{this.props.reply_count}条回复</h3>
				<ul className="re-list">
					
				</ul>
			</div>
		)
	}
}

class Topic extends Component {
	constructor(props) {
		super(props)
	}
	formatTime(time) {
		return (time + "").substring(0, 10);
	}
	componentDidMount() {
		const { dispatch, params } = this.props

		dispatch(fetchTopicGet(params.id)).then(() => {
			this.loaded = true

			this.forceUpdate()
		})
	}
	render() {
		let url = ''
		let loginname = ''

		if(this.loaded) {
			url = this.props.author.avatar_url
			loginname = this.props.author.loginname
		}

		let main = this.props.isFetching ? <DataLoad /> : <Article {...this.props} url={url} loginname={loginname} formatTime={this.formatTime}></Article>

		return (
			<div className="topic">
				<Header></Header>
				{main}
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		tab: state.topic.tab,
		reply_count: state.topic.reply_count,
		visit_count: state.topic.visit_count,
		create_at: state.topic.create_at,
		author: state.topic.author,
		title: state.topic.title,
		content: state.topic.content,
		isFetching: state.topic.isFetching,
		replies: state.topic.replies
	}
}

export default connect(mapStateToProps)(Topic)
