import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class NavBarButtons extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				accountType: 'artist'
			}
		}
		this.isArtist = this.isArtist.bind(this)
		this.displayUploadButton = this.displayUploadButton.bind(this)
		this.displayLoggedInButtons = this.displayLoggedInButtons.bind(this)
		this.displayLoggedOutButtons = this.displayLoggedOutButtons.bind(this)
	}

	displayLoggedInButtons() {
		return (
			<ul className="nav navbar-right">
				{ this.isArtist() ? this.displayUploadButton() : null }
				<li className="nav-item">
					<Link to={'/profile'}>
						<span className="glyphicon glyphicon-user fa-fw"/> Profile
					</Link>
				</li>
				<li className="nav-item">
					<Link to={'/stream'}>
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

	isArtist() {
		return (this.state.user.accountType === 'artist' || this.state.user.accountType === 'artistPro')
	}

	render() {
		return (
			<div>
				{ this.state.user.accountType === 'artist' ? this.displayLoggedInButtons() : this.displayLoggedOutButtons() }
			</div>
		)
	}
}
export default NavBarButtons
