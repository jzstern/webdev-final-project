import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Stream from './containers/stream'
import NavigationBar from './components/navigation-bar'
import FixedBottomBar from "./components/fixed-bottom-bar"
import Login from './components/login'
import Register from './components/register'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container-fluid">
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
					<link rel="stylesheet" href="../src/styles.css"/>
					<NavigationBar/>
					<Route path="/stream" component={Stream}/>
					<Route path="/login" component={Login}/>
					<Route path="/register" component={Register}/>
					<FixedBottomBar/>
				</div>
			</Router>
		)
	}
}
export default App
