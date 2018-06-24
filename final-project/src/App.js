import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Stream from './containers/stream'
import NavigationBar from './components/navigation-bar'
import FixedBottomBar from "./components/fixed-bottom-bar"
import LoginForm from './components/login-form'
import RegisterForm from './components/register-form'
import Upload from './components/upload'
import Profile from './containers/profile'


import { userRegistrationRequest } from './actions/register.actions'
import { loginRequest } from './actions/login.actions'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
	}
	render() {
		return (
			<Router>
				<div className="container-fluid">
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
					<link rel="stylesheet" href="../src/styles.css"/>
					<NavigationBar/>
					<Route path="/stream" component={Stream}/>
					{/*<Route path="/login" component={LoginForm}/>*/}
					<Route path="/login" render={(props) => <LoginForm {...props} login={loginRequest}/>}/>
					{/*<Route path="/register" component={RegisterPage} registerUser={userRegistrationRequest}/>*/}
					{/*<RegisterForm registerUser={userRegistrationRequest}/>*/}
					<Route path="/register" render={(props) => <RegisterForm {...props} registerUser={userRegistrationRequest}/>}/>
					<Route path="/profile" render={(props) => <Profile/>}/>
					{/*<Route path="/upload" component={Upload}/>*/}
					<Route path="/upload" render={(props) => <Upload {...props} user={this.state.user}/>}/>
					<FixedBottomBar/>
				</div>
			</Router>
		)
	}
}
export default App
