import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'
import validateInput from '../helpers/validate-login-input'
import classnames from 'classnames'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			errors: {}
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
		const { errors } = this.state
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

				<button className="btn btn-primary" style={{marginRight: 10}}>Login</button>

				<Link to={'/register'}>
					<button className="btn btn-info">Register</button>
				</Link>
			</div>
		)
	}
}
export default Login
