import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			password2: '',
			email: ''
		}
	}

	render() {
		return (
			<div className="container">
				<label for="email">Email</label>
				<input id="email"
				       value={this.state.email}
				       placeholder="Enter your email"
				       type="text"
				       className="form-control"/>

				<label for="username">Username</label>
				<input id="username"
				       value={this.state.username}
				       placeholder="Enter your username"
				       type="text"
				       className="form-control"/>

				<label for="password">Password</label>
				<input id="password"
				       value={this.state.password}
				       placeholder="Enter your password"
				       type="password"
				       className="form-control"/>

				<label for="password2">Re-enter your password</label>
				<input id="password2"
				       value={this.state.password2}
				       placeholder="Re-type your password here"
				       type="password"
				       className="form-control"/>

				{/*<Link to={'/register'}>*/}
					<button className="btn btn-secondary" style={{marginRight: 10}}>Register</button>
				{/*</Link>*/}
				<Link to={'/login'}>
					<button className="btn btn-primary">Login</button>
				</Link>
			</div>
		)
	}
}
export default Register
