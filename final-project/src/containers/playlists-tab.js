import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PlaylistService from '../services/playlist.service.client'

class PlaylistTab extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			playlists: []
		}
		this.playlistService = PlaylistService.instance
		this.renderPlaylists = this.renderPlaylists.bind(this)
		this.createPlaylist = this.createPlaylist.bind(this)
	}

	componentDidMount() {
		if (this.props.profile && this.props.profile._id) {
			this.playlistService
				.findAllPlaylistsForUser(this.props.profile._id)
				.then(playlists => {
					this.setState({
						user: this.props.profile,
						playlists: playlists
					}, this.renderPlaylists())
				})
		}
	}

	createPlaylist() {
		this.playlistService
			.createPlaylistForUser()
			.then(playlistId => {
				window.location.href = 'http://localhost:3000/playlist/' + playlistId
			})
	}

	renderPlaylists() {
		let playlists
		if (this.state.playlists) {
			playlists = this.state.playlists.map((playlist, key) => {
				if (playlist !== null) {
					return (
						<Link key={key} className="container">
							<p>Playlist placeholder</p>
							<p>{playlist.name}</p>
							<p>Number of songs: {playlist.songs.length}</p>
							{/*<Playlist songs={playlist} key={playlist._id}/>*/}
						</Link>
					)
				}
			})
		} else {
			console.log('no playlists here')
		}
		return playlists
	}

	render() {
		return (
			<div className="card-body">
				<button onClick={this.createPlaylist} className="btn btn-primary">Create playlist</button>
				<h5 className="card-title">Your playlists</h5>
				<ul className="list-group list-group-flush">
					{this.renderPlaylists()}
				</ul>
			</div>
		)
	}
}

export default PlaylistTab