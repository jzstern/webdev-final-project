import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import jQuery from 'jquery'

class NavBarButtons extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.logout = this.logout.bind(this)
		this.isArtist = this.isArtist.bind(this)
		this.isLoggedIn = this.isLoggedIn.bind(this)
		this.displayUploadButton = this.displayUploadButton.bind(this)
		this.displayLoggedInButtons = this.displayLoggedInButtons.bind(this)
		this.displayLoggedOutButtons = this.displayLoggedOutButtons.bind(this)
	}

	displayLoggedInButtons() {
		return (
			<ul className="nav navbar-right">
				{ this.isArtist() ? this.displayUploadButton() : null }
				<li className="nav-item">
					<Link to={'/profile/' + JSON.parse(localStorage.getItem('user'))._id + '/tracks'}>
						<span className="glyphicon glyphicon-user fa-fw"/> Profile
					</Link>
				</li>
				<li className="nav-item">
					<Link to={'/login'} onClick={this.logout}>
						<span className="glyphicon glyphicon-log-in fa-fw"/> Logout
					</Link>
				</li>
				<li className="nav-item">
					<a href="#">
						<span className="glyphicon glyphicon-cog fa-fw"/> Settings
					</a>
				</li>
			</ul>
		)
	}

	displayLoggedOutButtons() {
		return (
			<ul className="nav navbar-right">
				<li>
					<Link to={'/register'}>
						<span className="glyphicon glyphicon-user fa-fw"/> Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link to={'/login'}>
						<span className="glyphicon glyphicon-log-in fa-fw"/> Login
					</Link>
				</li>
			</ul>
		)
	}

	displayUploadButton() {
		return(
			<li hidden={!this.isArtist()} className="nav-item">
				<Link to={'/upload'}>
					<span className="glyphicon glyphicon-cloud-upload fa-fw"/> Upload
				</Link>
			</li>
		)
	}

	logout() {
		localStorage.removeItem('user')
	}

	isLoggedIn() {
		return localStorage.getItem('user') !== null
	}

	isArtist() {
		let user = JSON.parse(localStorage.getItem('user'))
		return user.accountType === 'artist' || user.accountType === 'artistPro'
	}

	componentDidMount() {
		// console.log(JSON.parse(localStorage.getItem('user'))._id)
	}

	render() {
		return (
			<div>
				{ this.isLoggedIn() ? this.displayLoggedInButtons() : this.displayLoggedOutButtons() }
			</div>
		)
	}
}
export default NavBarButtons
