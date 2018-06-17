import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
		}
	}

	render() {
		return (
			<div className="container">
				<label for="username">Username</label>
				<input id="username"
				       title="Username"
				       placeholder="Enter your username"
				       type="text"
				       className="form-control"/>

				<label for="password">Password</label>
				<input id="password"
				       title="Password"
				       placeholder="Enter your password"
				       type="password"
				       className="form-control"/>

				<button className="btn btn-primary" style={{marginRight: 10}}>Login</button>

				<Link to={'/register'}>
					<button className="btn btn-info">Register</button>
				</Link>
			</div>
		)
	}
}
export default Login
