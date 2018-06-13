import React, {Component} from 'react'

class SongItem extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<div className="container-fluid card">
				<a href="#">
					<span className="glyphicon glyphicon-play"/>
				</a>
				<h4>This is a song! Here is where the waveform will go or something</h4>
				<a href="#">
					<span className="glyphicon glyphicon-heart"/>
					<span className="glyphicon glyphicon-share"/>
				</a>
			</div>
		)
	}
}

export default SongItem