import React, { Component } from 'react'
import '../styles.css'
import {Link} from 'react-router-dom'
import SongService from "../services/SongService";

class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songTitle: '',
			songDescription: '',
			genre: '',
		}
        this.songService = SongService.instance;
		this.createSong = this.createSong.bind(this);
		this.titleChanged = this.titleChanged.bind(this);
		this.desChanged = this.desChanged.bind(this);
		this.genreChanged = this.genreChanged.bind(this);
	}

    componentDidMount() {
        // this.findAllSongs();
    }
    // findAllSongs() {
    //     this.songService
    //         .findAllSongs()
    //         .then((songs) => {
    //             this.setState({songs: songs});
    //         })
    // }

	createSong() {
		alert("button clicked");

        let newSong = {
			title: this.state.songTitle,
			description: this.state.songDescription,
			genre: this.state.genre
        };
        console.log(newSong);
        this.songService
            .createSong(newSong);
	}

	titleChanged(event) {
		this.setState({
			songTitle: event.target.value
		});
	}

	desChanged(event) {
        this.setState({
            songDescription: event.target.value
        });
	}
    genreChanged(event) {
		this.setState( {
			genre: event.target.value
		})
	}

	render() {
		return (
			<div className="container">
				<label for="title">Song Title</label>
				<input id="title"
				       onChange={this.titleChanged}
                       value={this.state.songTitle}
				       placeholder="Enter your a song title"
				       type="text"
				       className="form-control"/>

				<label for="description">Description</label>
				<input id="description"
				       value={this.state.description}
					   onChange={this.desChanged}
				       placeholder="Enter a description for the track"
				       type="text"
				       className="form-control"/>

				<label for="genre">Genre</label>
				<input id="genre"
				       value={this.state.genre}
                       onChange={this.genreChanged}
				       placeholder="Pick a genre (or make one up!)"
				       type="text"
				       className="form-control"/>

				<button className="btn btn-success"
						onClick={()=> this.createSong()} style={{marginRight: 10}}>Upload</button>
			</div>
		)
	}
}
export default Upload
