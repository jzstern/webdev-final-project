import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import SongItem from '../components/song-item'
import Stream from '../containers/stream'
import FixedBottomBar from "../components/fixed-bottom-bar"
import LoginForm from '../components/login-form'
import RegisterForm from '../components/register-form'
import Upload from '../components/upload'
import Profile from '../containers/profile'
import EditProfile from '../components/edit-profile'
import Playlist from '../containers/playlist'
import { userRegistrationRequest } from '../actions/register.actions'
import { loginRequest } from '../actions/login.actions'
import Admin from '../containers/admin'
import '../styles.css'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state= {
			results: []
		}
		this.renderResults = this.renderResults.bind(this)
	}

	componentDidMount() {
		let url = window.location.href
		if (url === 'http://localhost:3000/') {
			window.location.href = 'http://localhost:3000/stream'
		}
	}

	// when songs are received, set to state then render
	renderResults(results) {
		this.setState({results: results})
	}

	renderSongs() {
		let songs;
		if (this.state.results !== null) {
			songs = this.state.results.map((song) => {
				return <SongItem key={song._id}
				                 title={song.title}
				                 artistId={song.artistId}
				                 genre={song.genre}
				                 stats={song.stats}
				                 liked={song.liked}
				                 reposted={song.reposted}
				                 tweeted={song.tweeted}
				                 imgUrl={song.imgUrl}
				                 description={song.description}/>
			})
		}

		return songs
	}

	render() {
		return (
			<div className="container-fluid">
				<NavigationBar renderResults={this.renderResults}/>
				<h3 hidden={this.state.results.length == 0}>Search Results</h3>
				{this.renderSongs()}
				<h3>Other people are listening</h3>

				<Route path="/stream" component={Stream}/>
				{/*<Route path="/login" component={LoginForm}/>*/}
				<Route path="/login" render={(props) => <LoginForm {...props} login={loginRequest}/>}/>
				{/*<Route path="/register" component={RegisterPage} registerUser={userRegistrationRequest}/>*/}
				{/*<RegisterForm registerUser={userRegistrationRequest}/>*/}
				<Route path="/register" render={(props) => <RegisterForm {...props} registerUser={userRegistrationRequest}/>}/>
				<Route path="/profile" render={(props) => <Profile/>}/>
				<Route path="/edit-profile" render={(props) => <EditProfile/>}/>
				<Route path="/playlist" render={(props) => <Playlist/>}/>
				<Route path="/upload" render={(props) => <Upload {...props} user={this.state.user}/>}/>

				<Route path="/admin" render={(props) => <Admin {...props} />}/>

				<FixedBottomBar/>
			</div>
		)
	}
}