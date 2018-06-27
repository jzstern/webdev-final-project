import React, {Component} from 'react'
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
		this.playlistService
			.findAllPlaylistsForUser(this.props.user._id)
			.then(playlists => {
				this.setState({
					user: this.props.user,
					playlists: playlists
				}, this.renderPlaylists())
			})
	}

	createPlaylist() {
		
	}

	renderPlaylists() {
		let playlists
		if (this.state.playlists) {
			playlists = this.state.playlists.map((playlist, key) => {
				if (playlist !== null) {
					return (
						<div key={key} className="container">
							<Playlist songs={playlist} key={playlist._id}/>
						</div>
					)
				}
			})
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