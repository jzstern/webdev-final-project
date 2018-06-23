import React, { Component } from 'react'
import '../styles.css'
import songService from "../services/song.service.client";
import SongItem from '../components/song-item'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.songService = songService.instance;
        this.setSongResults = this.setSongResults.bind(this);
    }

    handleChange(e) {
        this.setState({
            query: e.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 2) {
                this.fetchData(this.state.query);
            }
        });
    }

    fetchData(name) {
        this.songService
            .findSongsByName(name)
            .then((songs) => {
              this.setSongResults(songs);
            })
    }
    setSongResults(results) {
        this.setState({results: results});
       this.props.renderResults(results);
    }

    render() {
        return (
            <div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2"
                               type="text"
                               placeholder="Search"
                               aria-label="Search"
                               value={this.state.query}
                               onChange={this.handleChange}/>
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                type="submit">Search</button>

                        <h1 style={{color: 'white'}}>{this.results}</h1>
                    </form>
                </div>
            </div>
        )
    }
}
export default SearchBar


