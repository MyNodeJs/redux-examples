import React, { Component } from 'react'
import Header from './Header'

class Signin extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Header />
				<div className="signin">
					<div className="content">
						<div className="text">
							<input type="text" placeholder="Access Token" />
						</div>
						<input type="button" className="btn" value="登录" />
					</div>
				</div>
			</div>
		)
	}
}

export default Signin