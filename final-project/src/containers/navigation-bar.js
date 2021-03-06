import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import UserService from '../services/user.service.client'
import SearchBar from '../components/searchbar'
import NavBarButtons from '../components/navbar-buttons'

class NavigationBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: '',
			username: '',
			userId: ''
		}

		this.userService = UserService.instance
	}

	componentDidMount() {}

	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to={'/stream'}>
							<span className="glyphicon glyphicon-cloud" style={{color: 'blue'}}/>StreamCloud
						</Link>
					</div>
					<SearchBar renderResults={this.props.renderResults}/>
					<NavBarButtons/>
				</div>
			</nav>
		)
	}
}
export default NavigationBar
