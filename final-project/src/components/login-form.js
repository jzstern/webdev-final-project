import '../styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import validateInput from '../helpers/validate-login-input'
import UserService from '../services/user.service.client'
import PropTypes from 'prop-types'
import { loginRequest } from "../actions/login.actions"
var propTypes = require('prop-types')

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			errors: {},
			isLoading: false
		}

		this.login = this.login.bind(this)
		this.isValid = this.isValid.bind(this)
		this.onChange = this.onChange.bind(this)
		this.userService = UserService.instance
	}

	login() {
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true })

			let user = {
				username: this.state.username,
				password: this.state.password,
			}

			this.userService
				.login(user)
				.then(res => {
					this.context.router.history.push('/stream')
				})
				// .then(res => {
				// 	if (res.status === 404) {
				// 		alert('Login credentials incorrect')
				// 	} else {
				// 		this.context.router.history.push('/stream')
				// 	}
				// })

			// this.props.loginRequest(this.state)
			// 	.then(res => this.context.router.history.push('/'),
			// 		err => this.setState({ errors: err.data.errors, isLoading: false }))
		}
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
		const { errors, isLoading } = this.state
		return (
			<div className="container">
				<div className={classnames("form-group", { 'has-error': errors.username })}>
					<label>Username</label>
					<input name="username"
					       value={this.state.username}
					       onChange={this.onChange}
					       placeholder="Enter your username"
					       type="text"
					       className="form-control"/>
					{errors.username && <span className="help-block">{errors.username}</span>}
				</div>

				<div className={classnames("form-group", { 'has-error': errors.password })}>
					<label>Password</label>
					<input name="password"
					       value={this.state.password}
					       onChange={this.onChange}
					       placeholder="Enter your password"
					       type="password"
					       className="form-control"/>
					{errors.password && <span className="help-block">{errors.password}</span>}
				</div>

				<button onClick={this.login} className="btn btn-primary" style={{marginRight: 10}}>Login</button>

				<Link to={'/register'}>
					<button className="btn btn-info">Register</button>
				</Link>
			</div>
		)
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { loginRequest })(LoginForm)