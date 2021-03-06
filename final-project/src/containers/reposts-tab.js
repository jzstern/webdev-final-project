import React, {Component} from 'react'
import SongItemWrapper from '../components/song-item-wrapper'

export default class Reposts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			repostedSongs: []
		}
		this.renderSongs = this.renderSongs.bind(this)
	}

	componentDidMount() {
		this.setState(
			{user: this.props.profile,
				repostedSongs: this.props.profile.repostedSongs}
		)
	}

	renderSongs() {
		let songs
		if (this.state.repostedSongs) {
			songs = this.state.repostedSongs.map((song, key) => {
				if (song !== null)
					return <div key={key} className="container">
              <SongItemWrapper song={song} key={song._id}/>
          </div>
			})
		}
		return songs
	}

	render() {
		return (
      <div className="card-body">
          <h5 className="card-title">Songs you reposted</h5>

          <ul className="list-group list-group-flush">
						{this.renderSongs()}
          </ul>
      </div>
		)
	}
}