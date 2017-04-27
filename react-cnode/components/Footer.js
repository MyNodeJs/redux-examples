import React, { Component } from 'react'
import { Link } from 'react-router'
import { isLogin } from '../common'
import { getData } from '../database'

class Footer extends Component {
	render() {
		let myUrl

		if(isLogin()) {
			myUrl = '/user/' + getData('user').loginname
		} else {
			myUrl = '/signin'
		}
		let arr = []

		arr[this.props.index] = 'on';
		return (
			<footer className="common-footer">
				<nav>
					<ul>
						<li className={arr[0]}>
							<Link to="/">
	                            <i className="iconfont icon-shouye"></i>首页
	                        </Link>
						</li>
						<li className={arr[1]}>
							<Link to="/topic/create">
	                            <i className="iconfont icon-fabu"></i>发表
	                        </Link>
						</li>
						<li className={arr[2]}>
							<Link to="/my/messages">
	                            <i className="iconfont icon-xiaoxi"></i>消息
	                        </Link>
						</li>
						<li className={arr[3]}>
							<Link to={myUrl}>
	                            <i className="iconfont icon-wode"></i>我的
	                        </Link>
						</li>
					</ul>
				</nav>
			</footer>
		)
	}
}

export default Footer