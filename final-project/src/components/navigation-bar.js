import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import jQuery from 'jquery'
import UserService from "../services/user.service.client"
import '../styles.css'
import SearchBar from './searchbar'

class NavigationBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			searchText: '',
			username: '',
			userId: ''
		}

		this.userService = UserService.instance
		this.isArtist = this.isArtist.bind(this)
		this.isLoggedIn = this.isLoggedIn.bind(this)
		this.displayUploadButton = this.displayUploadButton.bind(this)
		this.displayLoggedInButtons = this.displayLoggedInButtons.bind(this)
		this.displayLoggedOutButtons = this.displayLoggedOutButtons.bind(this)
	}

	componentDidMount() {
		this.userService
			.fetchUser()
			.then(user => {
				if (user) {
					// TODO ; display logged out bar
					this.setState({user: user})
				}
			})
	}

	isArtist() {
		return (this.state.user.accountType === 'artist' || this.state.user.accountType === 'artistPro')
	}

	isLoggedIn() {
		return !jQuery.isEmptyObject(this.state.user)
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

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-inverse justify-content-between">
				<span className="glyphicon glyphicon-cloud"/>
				<Link to={'/stream'}>StreamCloud</Link>
				<SearchBar renderResults={this.props.renderResults}/>
				{ this.isLoggedIn() ? this.displayLoggedInButtons() : this.displayLoggedOutButtons() }
			</nav>
		)
	}
}
export default NavigationBar
