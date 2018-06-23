import React, {Component} from 'react'
import '../styles.css'
import NavigationBar from './../components/navigation-bar'
import SongItem from '../components/song-item'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state= {
            results: []
        }
        this.renderResults = this.renderResults.bind(this);
    }

    componentDidMount() {
    }

    // when songs are received, set to state then render
    renderResults(results) {
        console.log(results);
        this.setState({results: results});
    }

    renderSongs() {
        let songs;
        if (this.state.results !== null) {
            songs = this.state.results.map((song) => {
                return <SongItem key={song._id}
                                 title={song.title}
                                 artist={song.artist}
                                 genre={song.genre}
                                 stats={song.stats}
                                 liked={song.liked}
                                 reposted={song.reposted}
                                 tweeted={song.tweeted}
                                 imgUrl={song.imgUrl}
                                 description={song.description}/>
            });
        }

        return songs;
    }

    render() {
        return (
            <div className="container-fluid">
            <NavigationBar renderResults={this.renderResults}/>
                <h3 hidden={this.state.results.length == 0}>Search Results</h3>
                {this.renderSongs()}
                <h3>Other people are listening</h3>
            </div>
        )
    }
}