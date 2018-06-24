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
			title: '',
			description: '',
			genre: '',
			imgUrl: '',
			errors: {}
		}

		this.songService = SongService.instance
		this.createSong = this.createSong.bind(this)
		this.isValid = this.isValid.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	// componentWillReceiveProps(props) {}

	// componentDidMount() { }

	createSong() {
		if (this.isValid()) {
			this.setState({errors: {}, isLoading: true})

			let newSong = {
				title: this.state.title,
				artist: JSON.parse(localStorage.getItem('user')).displayName,
				artistId: JSON.parse(localStorage.getItem('user'))._id,
				description: this.state.description,
				genre: this.state.genre,
				imgUrl: this.state.imgUrl
			}

			this.songService
				.createSong(newSong)
				.then(() => {
					this.context.router.history.push('/stream')
				})
		}
	}


	isValid() {
		const {errors, isValid} = validateInput(this.state)

		if (!isValid) {
			this.setState({ errors })
		}

		return isValid
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { errors } = this.state
		return (
			//<form onSubmit={this.createSong} className="container">
			<div className="container">
				<div className={classnames("form-group", { 'has-error': errors.title })}>
					<label>Song Title</label>
					<input name="title"
					       onChange={this.onChange}
					       value={this.state.title}
					       placeholder="Enter your a song title"
					       type="text"
					       className="form-control"/>
					{errors.title && <span className="help-block">{errors.title}</span>}
				</div>

				<label>Description</label>
				<input name="description"
				       value={this.state.description}
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

				<div className={classnames("form-group", { 'has-error': errors.imgUrl })}>
					<label>Album Artwork</label>
					<input name="imgUrl"
					       value={this.state.imgUrl}
					       onChange={this.onChange}
					       placeholder="Paste a link to the URL of your album artwork"
					       type="text"
					       className="form-control"/>
					{errors.imgUrl && <span className="help-block">{errors.imgUrl}</span>}
				</div>

				<div className="form-group">
					<button className="btn btn-success"
					        onClick={this.createSong}
					        style={{marginRight: 10}}>Upload</button>
				</div>
			</div>
		)
	}
}
export default Upload

Upload.contextTypes = {
	router: PropTypes.object.isRequired
}
