import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import UserService from '../services/user.service.client'
import { userRegistrationRequest } from '../actions/register.actions'
import classnames from 'classnames'
import '../styles.css'

class EditProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			displayName: '',
			username: '',
			firstName: '',
			lastName: '',
			accountType: ''
		}

		this.userService = UserService.instance
		this.onChange = this.onChange.bind(this)
		this.update = this.update.bind(this)
	}

	update() {
		let user = {
			email: this.state.email,
			displayName: this.state.displayName,
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			accountType: this.state.accountType
		}

		this.userService
			.updateUser(user)
			.then((res) => {
				console.log(res)
				localStorage.setItem('user', JSON.stringify(res))
				// this.context.router.history.push('/stream')
			})
	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user'))
		this.setState({
			email: user.email,
			username: user.username,
			displayName: user.displayName,
			firstName: user.firstName,
			lastName: user.lastName,
			accountType: user.accountType
		})
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<form onSubmit={this.update} className="container">
				<h2>Edit Profile</h2>

				{this.state.accountType === 'artistPro' &&
				<div className="form-group">
					<label>Display Name</label>
					<input name="displayName"
					       value={this.state.displayName}
					       onChange={this.onChange}
					       placeholder="Enter your displayName"
					       type="text"
					       className="form-control"/>
				</div>}

				{this.state.accountType !== 'artistPro' &&
				<div className="form-group">
					<label>Display Name</label>
					<p>{this.state.displayName} - Only Pro Artists can edit their display name</p>
				</div>}

				<div className="form-group">
					<label>Email</label>
					<input name="email"
					       value={this.state.email}
					       onChange={this.onChange}
					       placeholder="Enter your email"
					       type="text"
					       className="form-control"/>
				</div>

				<div className="form-group">
					<label >Username</label>
					<input name="username"
					       value={this.state.username}
					       onChange={this.onChange}
					       placeholder="Enter your username"
					       type="text"
					       className="form-control"/>
				</div>

				<div className="form-group">
					<label>First Name</label>
					<input name="firstName"
					       value={this.state.firstName}
					       onChange={this.onChange}
					       placeholder="Enter your first name"
					       type="text"
					       className="form-control"/>
				</div>

				<div className="form-group">
					<label>Last Name</label>
					<input name="lastName"
					       value={this.state.lastName}
					       onChange={this.onChange}
					       placeholder="Enter your last name"
					       type="text"
					       className="form-control"/>
				</div>

				<div className="form-group">
					<label>Account Type</label>
					<p>{this.state.accountType}</p>
				</div>

				<div className="form-group">
					<button className="btn btn-secondary btn-success" style={{marginRight: 10}}>Update</button>
				</div>
			</form>
		)
	}
}

export default EditProfile
//
// EditProfile.propTypes = {
// 	registerUser: PropTypes.func.isRequired
// }
//
// EditProfile.contextTypes = {
// 	router: PropTypes.object.isRequired
// }