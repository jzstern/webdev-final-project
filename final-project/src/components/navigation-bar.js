import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../styles.css'

class NavigationBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: '',
			username: '',
			userId: ''
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-inverse justify-content-between">
				<span className="glyphicon glyphicon-cloud"/>
				<a className="navbar-brand" href="#">StreamCloud</a>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>
				<ul className="nav navbar-right">
					<li className="nav-item"><a href="#"><span className="glyphicon glyphicon-cloud-upload fa-fw"/> Upload</a></li>
					<li className="nav-item"><Link to={'/register'}><span className="glyphicon glyphicon-user fa-fw"/> Sign Up</Link></li>
					<li className="nav-item"><Link to={'/login'}><span className="glyphicon glyphicon-log-in fa-fw"/> Login</Link></li>
					<li className="nav-item"><a href="#"><span className="glyphicon glyphicon-cog fa-fw"/> Settings</a></li>
				</ul>
			</nav>
		)
	}
}
export default NavigationBar
