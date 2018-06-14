import React, {Component} from 'react'
import SongItem from '../components/song-item'
import '../styles.css'

var songList = [
	<SongItem/>,
	<SongItem/>,
	<SongItem/>,
	<SongItem/>,
	<SongItem/>,
	<SongItem/>,
	<SongItem/>,
	<SongItem/>
]

class Stream extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songList: null,
			currentlyPlaying: null
		}
	}

	componentDidMount() {}


	render() {
		return (
			<div className="container">
				<div>
					<a href="#">
						<span className="glyphicon glyphicon-filter"/>
					</a>
				</div>

				<ul className="list-group list-group-flush">
					{songList.map(song => (
						<li className="list-group-item">
							<SongItem/>
						</li>
					))}

					{/*{songList.map(song => (*/}
						{/*<li className="list-group-item">*/}
							{/*<SongItem key={song.id}*/}
							          {/*title={song.title}*/}
							          {/*artist={song.artist}*/}
							          {/*playCount={song.playCount}*/}
							          {/*repostCount={song.repostCount}*/}
							          {/*comments={song.comments}/>*/}
						{/*</li>*/}
					))}
				</ul>
			</div>
		)
	}
}

export default Stream