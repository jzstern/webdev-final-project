import React, {Component} from 'react'
import SongService from "../services/song.service.client"
import SongItem from '../components/song-item'

export default class Tracks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: null,
			tracks: []
		}
		this.songService = SongService.instance
	}

	componentDidMount() {
		if (this.props.user && this.props.user._id) {
			this.songService
				.findAllSongsByArtist(this.props.user._id)
				.then((res) => {
					this.setState({
						tracks: res,
						user: this.props.user,
						userId: this.props.user._id
					})
				})
		}
	}

	renderSongs() {
		// console.log(this.state.tracks)
		// console.log(this.state.tracks.length)
		let songs
		if (this.state.tracks && this.state.tracks.length !== 0) {
			songs = this.state.tracks.map((song, key) => {
				if (song !== null) {
					return  (
            <SongItem id={song._id}
                      key={song._id}
                      artistId={song.artistId}
                      title={song.title}
                      genre={song.genre}
                      stats={song.stats}
              // comments={song.comments}
                      imgUrl={song.imgUrl}
                      description={song.description}/>)
				}
			})
		} else {
			return <h5>You don't have any song yet.</h5>
		}

		return songs
	}

	render() {
		return (
      <div className="card-body">
          <h5 className="card-title">Your songs</h5>
          <ul className="list-group list-group-flush">
						{this.renderSongs()}
          </ul>
      </div>
		)
	}
}
