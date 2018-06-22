import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'
import validateInput from '../helpers/validate-upload-input'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import SongService from "../services/song.service.client"
var propTypes = require('prop-types')

class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songTitle: '',
			songDescription: '',
			genre: '',
			albumArtUrl: '',
			errors: {}
		}

		this.songService = SongService.instance;
		this.createSong = this.createSong.bind(this);
		this.isValid = this.isValid.bind(this);
		this.onChange = this.onChange.bind(this)
	}

  // componentDidMount() { }

	createSong() {
		if (this.isValid()) {
			this.setState({errors: {}, isLoading: true})

			let newSong = {
				title: this.state.songTitle,
				description: this.state.songDescription,
				genre: this.state.genre,
				albumArtUrl: this.state.albumArtUrl
			};

			console.log(newSong);
			this.songService
				.createSong(newSong)
				// .then(() => {
				//  this.context.router.history.push('/stream')
				// })
		}
	}


	isValid() {
		const {errors, isValid} = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors })
		}

		return isValid;
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { errors } = this.state
		return (
			<form onSubmit={this.createSong} className="container">
				<div className={classnames("form-group", { 'has-error': errors.songTitle })}>
					<label>Song Title</label>
					<input name="songTitle"
					       onChange={this.onChange}
					       value={this.state.songTitle}
					       placeholder="Enter your a song title"
					       type="text"
					       className="form-control"/>
					{errors.songTitle && <span className="help-block">{errors.songTitle}</span>}
				</div>

				<label>Description</label>
				<input name="songDescription"
				       value={this.state.songDescription}
				       onChange={this.onChange}
				       placeholder="Enter a description for the track"
				       type="text"
				       className="form-control"/>

				<label>Genre</label>
				<input name="genre"
				       value={this.state.genre}
				       onChange={this.onChange}
				       placeholder="Pick a genre (or make one up!)"
				       type="text"
				       className="form-control"/>

				<div className={classnames("form-group", { 'has-error': errors.albumArtUrl })}>
					<label>Album Artwork</label>
					<input name="albumArtUrl"
					       value={this.state.albumArtUrl}
					       onChange={this.onChange}
					       placeholder="Paste a link to the URL of your album artwork"
					       type="text"
					       className="form-control"/>
					{errors.albumArtUrl && <span className="help-block">{errors.albumArtUrl}</span>}
				</div>

				<div className="form-group">
					<button className="btn btn-success"
					        // onClick={this.createSong}
							    style={{marginRight: 10}}>Upload</button>
				</div>
			</form>
		)
	}
}
export default Upload

Upload.contextTypes = {
	router: PropTypes.object.isRequired
}
