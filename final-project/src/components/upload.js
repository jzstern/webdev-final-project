import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'

class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songTitle: '',
			songDescription: '',
			genre: '',
		}
	}

	render() {
		return (
			<div className="container">
				<label for="title">Song Title</label>
				<input id="title"
				       value={this.state.songTitle}
				       placeholder="Enter your a song title"
				       type="text"
				       className="form-control"/>

				<label for="description">Description</label>
				<input id="description"
				       value={this.state.description}
				       placeholder="Enter a description for the track"
				       type="text"
				       className="form-control"/>

				<button className="btn btn-success" style={{marginRight: 10}}>Upload</button>

				<label for="genre">Genre</label>
				<input id="genre"
				       value={this.state.genre}
				       placeholder="Pick a genre (or make one up!)"
				       type="text"
				       className="form-control"/>

				<button className="btn btn-success" style={{marginRight: 10}}>Upload</button>
			</div>
		)
	}
}
export default Upload
