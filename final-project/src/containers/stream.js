import React, {Component} from 'react'
import SongItem from '../components/song-item'

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

		}
	}


	render() {
		return (
			<div className="container-fluid">
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
				</ul>
			</div>
		)
	}
}

export default Stream