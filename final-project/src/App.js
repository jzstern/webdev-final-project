import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Home from './containers/Home'

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
					<Home/>
				</div>
			</Router>
		)
	}
}
export default App
