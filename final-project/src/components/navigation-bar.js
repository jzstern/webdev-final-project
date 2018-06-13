import React, { Component } from 'react';

class NavigationBar extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<a class="navbar-brand" href="#">StreamCloud</a>
					</div>
					<ul class="nav">
						<li class="active"><a href="#">Stream</a></li>
						<li><a href="#">Search</a></li>
					</ul>
					<ul class="nav navbar-right">
						<li><a href="#"><span class="glyphicon glyphicon-user"/> Sign Up</a></li>
						<li><a href="#"><span class="glyphicon glyphicon-log-in"/> Login</a></li>
					</ul>
				</div>
			</nav>
		)}

	}
export default NavigationBar
