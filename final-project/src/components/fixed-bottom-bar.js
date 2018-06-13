import React, { Component } from 'react'

class FixedBottomBar extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<footer className="page-footer font-small blue footer">
				<div className="container-fluid text-center">
					<div className="row">
						<h5 className="text-uppercase">Footer Content</h5>
						<div>
						</div>
						<a href="#">
							<span className="glyphicon glyphicon-backward"/>
						</a>
						<a href="#">
							<span className="glyphicon glyphicon-play"/>
						</a>
						<a href="#">
							<span className="glyphicon glyphicon-forward"/>
						</a>
					</div>
				</div>
			</footer>
		)
	}
}
export default FixedBottomBar
