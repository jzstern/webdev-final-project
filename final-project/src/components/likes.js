import React, {Component} from 'react'
import SongItem from '../components/song-item'
import songService from '../services/song.service.client'
import SongItemWrapper from './song-item-wrapper'

export default class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            likedSongsId: [],
            song: null
        }
        this.renderSongs = this.renderSongs.bind(this);
    }
    componentDidMount() {
        this.setState(
            {user: this.props.user,
                likedSongsId: this.props.user.likedSongs}
        );

    }

    renderSongs() {
        let songs;
        if (this.state.likedSongsId) {
            songs = this.state.likedSongsId.map((song, key) => {
                if (song !== null) {
                    return <div className="container">
                        <SongItemWrapper song={song}/>
                    </div>
                }
            })
        }
        return songs
    }

    render() {
        return (
            <div className="card-body">
                <h5 className="card-title">Songs you liked</h5>
                <ul className="list-group list-group-flush">
                    {this.renderSongs()}
                </ul>
            </div>
        )
    }
}