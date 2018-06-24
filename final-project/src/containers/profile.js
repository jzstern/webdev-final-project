import React, {Component} from 'react'
import SongItem from '../components/song-item'
import SongService from "../services/song.service.client"
import UserService from "../services/user.service.client"
import '../styles.css'

class ProfilePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			songList: null,
			currentlyPlaying: null
		}

		this.songService = SongService.instance
		this.userService = UserService.instance
		this.setSongs = this.setSongs.bind(this)
		this.renderSongs = this.renderSongs.bind(this)
	}

	componentDidMount() {
		this.userService
			.fetchUser()
			.then(user => this.setState({user: user}))
		this.songService
			.findAllSongs()
			.then((songs) => {
				this.setSongs(songs)
			})
	}

	setSongs(songs) {
		this.setState({
			songList: songs
		})
		this.renderSongs()
	}

	renderSongs() {
		let songs
		if (this.state.songList !== null) {
			songs = this.state.songList.map((song) => {
				return <SongItem key={song._id}
				                 title={song.title}
				                 artist={song.artist}
				                 genre={song.genre}
				                 stats={song.stats}
					// comments={song.comments}
					               liked={song.liked}
					               reposted={song.reposted}
					               tweeted={song.tweeted}
					               imgUrl={song.imgUrl}
					               description={song.description}/>
			});
		}
		return songs;
	}

	render() {
		return (
			<div className="container">
				<h1>PROFILE PAGE</h1>
				<div>
					<a href="#">
						<span className="glyphicon glyphicon-filter"/>
					</a>
				</div>

				<ul className="list-group list-group-flush">
					{/*{songList.map((song) => (*/}
					{/*<li key={song.id}*/}
					{/*className="list-group-item">*/}
					{/*<SongItem/>*/}
					{/*</li>*/}
					{/*))}*/}
					{this.renderSongs()}

					{/*{songList.map(song => (*/}
					{/*<li className="list-group-item">*/}
					{/*<SongItem key={song.id}*/}
					{/*title={song.title}*/}
					{/*artist={song.artist}*/}
					{/*playCount={song.playCount}*/}
					{/*repostCount={song.repostCount}*/}
					{/*comments={song.comments}/>*/}
					{/*</li>*/}
					{/*// ))}*/}
				</ul>
			</div>
		)
	}
}

export default ProfilePage