import React, {Component} from 'react'
import SongItem from '../components/song-item'

export default class Reposts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            repostedSongs: []
        }
        this.renderSongs = this.renderSongs.bind(this);
    }
    componentDidMount() {
        this.setState(
            {user: this.props.user,
                repostedSongs: this.props.user.repostedSongs}
        );

    }
    renderSongs() {
        console.log(this.props.user);
        console.log(this.props.user.repostedSongs);
        let songs;
        if (this.state.repostedSongs) {
            songs = this.state.repostedSongs.map((song, key) => {
                return (
                    <li className="list-group-item">{song}</li>
                )

            })
        }
        return songs
    }

    render() {
        return (
            <div className="card-body">
                <h5 className="card-title">Reposts Component</h5>

                <ul className="list-group list-group-flush">

                    {this.renderSongs()}

                </ul>
            </div>
        )
    }
}