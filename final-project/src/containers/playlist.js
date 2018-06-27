import React, {Component} from 'react'
import SongItem from '../components/song-item'
import SongService from "../services/song.service.client"
import PlaylistService from "../services/playlist.service.client"
import '../styles.css'

class Playlist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songs: null,
		}

		this.songService = SongService.instance
		this.playlistService = PlaylistService.instance
		// this.setSongs = this.setSongs.bind(this)
		// this.renderSongs = this.renderSongs.bind(this)
	}

	componentDidMount() {
		this.songService
			.findAllSongs()
			.then((songs) => {
				this.setSongs(songs)
			})
	}

	// setSongs(songs) {
	// 	this.setState({songList: songs})
	// 	this.renderSongs()
	// }
	//
	// renderSongs() {
	// 	let songs
	// 	if (this.state.songList !== null) {
	// 		songs = this.state.songList.map((song, key) => {
	// 			return <SongItem key={key}
	// 			                 id = {song._id}
	// 			                 title={song.title}
	// 			                 artistId={song.artistId}
	// 			                 genre={song.genre}
	// 			                 stats={song.stats}
	// 				// comments={song.comments}
	// 				               imgUrl={song.imgUrl}
	// 				               description={song.description}/>
	// 		})
	// 	}
	// 	return songs
	// }

	render() {
		return (
			<div className="container">
				<ul className="list-group list-group-flush">
					{/*{this.renderSongs()}*/}
				</ul>
			</div>
		)
	}
}
export default Playlist