import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import React, { Component } from 'react'
import Stream from "./containers/stream"
import NavigationBar from './components/navigation-bar'
import FixedBottomBar from "./components/fixed-bottom-bar"

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
				<link rel="stylesheet" href="../src/styles.css"/>
				<NavigationBar/>
				<h1>hey guys asuhh. we're killin it right now this looks great!</h1>
				<Stream/>
				<FixedBottomBar/>
			</div>
		)
	}
}
export default App
