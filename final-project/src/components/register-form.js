import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import UserService from '../services/user.service.client'
import { userRegistrationRequest } from '../actions/register.actions'
import validateInput from '../helpers/validate-register-input'
import classnames from 'classnames'
import PropTypes from 'prop-types'
var propTypes = require('prop-types')

class RegisterForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			displayName: '',
			username: '',
			password1: '',
			password2: '',
			accountType: 'listener',
			errors: {},
			isLoading: false
		}

		this.onChange = this.onChange.bind(this)
		this.register = this.register.bind(this)
		this.isValid = this.isValid.bind(this)
		this.userService = UserService.instance
	}

	register(e) {
		e.preventDefault()

		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true })

			let user = {
				email: this.state.email,
				displayName: this.state.displayName,
				username: this.state.username,
				password: this.state.password1,
				accountType: this.state.accountType
			}

			this.userService
				.createUser(user)
				.then((res) => {
					if (res.status === 500) {
						alert('Sorry, that username is already taken')
					} else {
						console.log(res)
						localStorage.setItem('user', JSON.stringify(res))
						this.context.router.history.push('/stream')
					}
				})
		}
		// this.props.registerUser(this.state)

		// if (this.state.password1 !== this.state.password2) {
		// 	alert('Passwords must match')
		// }
		// // else if (this.state.password1.length < 8) { alert('Password must be at least 8 characters')}
		// else if (!this.state.email || !this.state.username || !this.state.password1 || !this.state.password2) {
		// 	alert('Please ensure all fields are filled out')
		// }
		// else {
		// }
	}

	isValid() {
		const {errors, isValid} = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors })
		}

		return isValid;
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { errors } = this.state
		return (
				<form onSubmit={this.register} className="container">
					<div className={classnames("form-group", { 'has-error': errors.email })}>
						<label>Email</label>
						<input name="email"
						       value={this.state.email}
						       onChange={this.onChange}
						       placeholder="Enter your email"
						       type="text"
						       className="form-control"/>
						{errors.email && <span className="help-block">{errors.email}</span>}
					</div>

					<div className={classnames("form-group", { 'has-error': errors.displayName })}>
						<label >Display Name</label>
						<input name="displayName"
						       value={this.state.displayName}
						       onChange={this.onChange}
						       placeholder="Enter your displayName"
						       type="text"
						       className="form-control"/>
						{errors.displayName && <span className="help-block">{errors.displayName}</span>}
					</div>

					<div className={classnames("form-group", { 'has-error': errors.username })}>
						<label >Username</label>
						<input name="username"
						       value={this.state.username}
						       onChange={this.onChange}
						       placeholder="Enter your username"
						       type="text"
						       className="form-control"/>
						{errors.username && <span className="help-block">{errors.username}</span>}
					</div>

					<div className={classnames("form-group", { 'has-error': errors.password1 })}>
						<label>Password</label>
						<input name="password1"
						       value={this.state.password1}
						       onChange={this.onChange}
						       placeholder="Enter your password"
						       type="password"
						       className="form-control"/>
						{errors.password1 && <span className="help-block">{errors.password1}</span>}
					</div>

					<div className={classnames("form-group", { 'has-error': errors.password2 })}>
						<label>Re-enter your password</label>
						<input name="password2"
						       value={this.state.password2}
						       onChange={this.onChange}
						       placeholder="Re-type your password here"
						       type="password"
						       className="form-control"/>
						{errors.password2 && <span className="help-block">{errors.password2}</span>}
					</div>

					<div className="form-group">
						<label>Account Type</label>
						<select name="accountType"
						        value={this.state.accountType}
						        onChange={this.onChange}
						        className="form-control"
						        style={{width: 200}}>
							<option value="listener">Listener</option>
							<option value="artist">Artist</option>
							<option value="artistPro">Artist Pro</option>
						</select>
					</div>

					<div className="form-group">
						<button className="btn btn-secondary" style={{marginRight: 10}}>Register</button>
					</div>

					<Link to={'/login'}>
						<button className="btn btn-primary">Login</button>
					</Link>
				</form>
		)
	}
}

// export default RegisterForm

RegisterForm.propTypes = {
	registerUser: PropTypes.func.isRequired
}

RegisterForm.contextTypes = {
	router: PropTypes.object.isRequired
}

function mapStateToProps(state) {

}

function mapDispatchToProps() {
	return {
		userRegistrationRequest: userRegistrationRequest
	}
}

export default connect((state) => { return {} }, { userRegistrationRequest })(RegisterForm)