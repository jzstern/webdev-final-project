import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import React, { Component } from 'react'
import NavigationBar from './components/navigation-bar'
import Stream from "./containers/stream";

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				{/*<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>*/}
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
				<NavigationBar/>
				<h1>hey guys asuhh. we're killin it right now this looks great!</h1>
				<Stream/>
			</div>
		)
	}
}
export default App
