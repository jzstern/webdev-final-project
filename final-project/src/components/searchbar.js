import React, { Component } from 'react'
import songService from '../services/song.service.client'

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			query: '',
			results: []
		}
		this.songService = songService.instance
		this.handleChange = this.handleChange.bind(this)
		this.fetchData = this.fetchData.bind(this)
		this.setSongResults = this.setSongResults.bind(this)
	}

	handleChange(e) {
		this.setState({
			query: e.target.value
		}, () => {
			if (this.state.query && this.state.query.length > 2) {
				this.fetchData(this.state.query)
			}
		})
	}

	fetchData(name) {
		this.songService
			.findSongsByName(name)
			.then((songs) => {
				this.setSongResults(songs)
			})
	}
	setSongResults(results) {
		this.setState({results: results})
		this.props.renderResults(results)
	}

	render() {
		return (
          <form className="navbar-form form-inline my-auto" id="navbarSupportedContent">
              <input className="form-control"
                     type="text"
                     placeholder="Search"
                     aria-label="Search"
                     value={this.state.query}
                     onChange={this.handleChange}/>
              <button className="btn btn-outline-success"
                      type="submit">Search</button>

              <h1 style={{color: 'white'}}>{this.results}</h1>
          </form>
		)
	}
}
export default SearchBar


