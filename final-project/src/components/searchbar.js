import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../styles.css'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
        this.searchMovie = this.searchMovie.bind(this);
    }
    searchMovie() {

        this.setState({
            query: this.search.value
        });
        alert(this.search.value);
    }

    render() {
        return (
            <div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2"
                               type="search"
                               placeholder="Search"
                               aria-label="Search"
                                ref={input => this.search = input}/>
                        <button onClick={this.searchMovie}
                                className="btn btn-outline-success my-2 my-sm-0"
                                type="submit">Search</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default SearchBar


