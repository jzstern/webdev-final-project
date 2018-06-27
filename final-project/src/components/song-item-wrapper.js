import React, {Component} from 'react'
import SongItem from '../components/song-item'
import songService from "../services/song.service.client"
import '../styles.css'

// receive a song as a prop, pass it to SongItem to render
class SongItemWrapper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			song: null
		}
		this.songService = songService.instance
		this.renderSongItem = this.renderSongItem.bind(this)
	}
	componentDidMount() {
		this.songService
			.findSongById(this.props.song)
			.then(res => {
				this.setState({
					song: res
				})
			})
	}

	renderSongItem() {
		if (this.state.song) {
			return (
        <SongItem id={this.state.song._id}
                  key={this.state.song._id}
                  artistId={this.state.song.artistId}
                  title={this.state.song.title}
                  genre={this.state.song.genre}
                  stats={this.state.song.stats}
          // comments={song.comments}
                  imgUrl={this.state.song.imgUrl}
                  description={this.state.song.description}/>
			)
		}
	}
	render() {
		return (
      <div>
				{this.renderSongItem()}
      </div>

		)
	}
}
export default SongItemWrapper

