import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PlaylistService from '../services/playlist.service.client'

class PlaylistTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            playlists: []
        }
        this.playlistService = PlaylistService.instance
        this.renderPlaylists = this.renderPlaylists.bind(this)
        this.createPlaylist = this.createPlaylist.bind(this)
    }

    componentDidMount() {
        if (this.props.profile && this.props.profile._id) {
            this.playlistService
                .findAllPlaylistsForUser(this.props.profile._id)
                .then(playlists => {
                    this.setState({
                        user: this.props.profile,
                        playlists: playlists
                    })})
                .then(
                    this.renderPlaylists())
        }
    }

    createPlaylist() {
        this.playlistService
            .createPlaylistForUser()
            .then(playlist  => {
                console.log(playlist)
                window.location.href = 'http://localhost:3000/playlist/' + playlist._id
            })
    }

    renderPlaylists() {
        let playlists
        if (this.state.playlists) {
            playlists = this.state.playlists.map((playlist, key) => {
            	console.log(playlist);
                if (playlist !== null) {
                    return (
                        <li className="list-group-item" key={key}>
                            <p>Playlist Id</p>
                            <p>{playlist._id}</p>
                            <p>Number of songs: {playlist.songs.length}</p>
                            {/*<Playlist songs={playlist} key={playlist._id}/>*/}
                        </li>
                    )
                }
            })
        } else {
            console.log('no playlists here')
        }
        return playlists
    }

    render() {
        return (
            <div className="card-body">
                <button onClick={this.createPlaylist} className="btn btn-primary">Create playlist</button>
                <h5 className="card-title">Your playlists</h5>
                <ul className="list-group list-group-flush">
                    {this.renderPlaylists()}
                </ul>
            </div>
        )
    }
}

export default PlaylistTab