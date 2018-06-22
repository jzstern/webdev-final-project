import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../styles.css'
import SearchBar from './searchbar.js';

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
				<Link to={'/stream'}>StreamCloud</Link>
				<SearchBar/>
				<ul className="nav navbar-right">
					<li className="nav-item"><Link to={'/upload'}><span className="glyphicon glyphicon-cloud-upload fa-fw"/> Upload</Link></li>
					<li className="nav-item"><Link to={'/register'}><span className="glyphicon glyphicon-user fa-fw"/> Sign Up</Link></li>
					<li className="nav-item"><Link to={'/login'}><span className="glyphicon glyphicon-log-in fa-fw"/> Login</Link></li>
					<li className="nav-item"><a href="#"><span className="glyphicon glyphicon-cog fa-fw"/> Settings</a></li>
				</ul>
			</nav>
		)
	}
}
export default NavigationBar
