import React, {Component} from 'react'
import '../styles.css'
import NavigationBar from './../components/navigation-bar'
import SongItem from '../components/song-item'

export default class extends Component {
    constructor(props) {
        super(props);
    this.renderResults = this.renderResults.bind(this);
    }

    componentDidMount() {

    }
    renderResults(results) {
        console.log(results);
        let songs;
        if (results !== null) {
            songs = results.map((song) => {
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
                <h3>Search Results</h3>
                {this.renderResults}
            </div>
        )
    }
}