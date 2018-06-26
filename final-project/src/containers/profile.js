import React, {Component} from 'react'
import SongItem from '../components/song-item'
import SongService from "../services/song.service.client"
import UserService from "../services/user.service.client"
import '../styles.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Likes from "../components/likes";
import Reposts from "../components/reposts";
import Tracks from "../components/tracks";


class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userId: null,
            songList: null,
            currentlyPlaying: null
        }

        this.songService = SongService.instance
        this.userService = UserService.instance
        this.setSongs = this.setSongs.bind(this)
        this.renderSongs = this.renderSongs.bind(this)
    }

    componentDidMount() {
        // this.userService
        // 	.fetchUser()
        // 	.then(user => this.setState({user: user}))
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            userId: JSON.parse(localStorage.getItem('user'))._id
        });
        this.songService
            .findAllSongsByArtist(JSON.parse(localStorage.getItem('user'))._id)
            .then((songs) => {
                console.log(songs)
                this.setSongs(songs)
            })
    }

    componentWillReceiveProps(newProps) {
    }

    setSongs(songs) {
        this.setState({
            songList: songs
        })
        this.renderSongs()
    }

    renderSongs() {
        let songs
        if (this.state.songList !== null) {
            songs = this.state.songList.map((song) => {
                return <SongItem key={song._id}
                                 title={song.title}
                                 artist={song.artist}
                                 genre={song.genre}
                                 stats={song.stats}
					// comments={song.comments}
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
            <div className="container">
                <h2>{JSON.parse(localStorage.getItem('user')).displayName}</h2>

                <div>
                    <a href="#">
                        <span className="glyphicon glyphicon-filter"/>
                    </a>
                </div>

                <div className="container-fluid">
                    <button type="button" className="btn btn-secondary">Follow/Unfollow</button>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="card text-center">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link to={`/profile/${this.state.userId}/tracks`}>Tracks</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/profile/${this.state.userId}/reposts`}>Repost</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/profile/${this.state.userId}/likes`}>Likes</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <Route path='/profile/:userId/tracks' render={(props) => <Tracks/>}/>
                                    <Route path='/profile/:userId/reposts' render={(props) => <Reposts user={this.state.user}/>}/>
                                    <Route path='/profile/:userId/likes' render={(props) => <Likes user={this.state.user}/>}/>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="col-sm-6">
                                Followers
                            </div>
                            <div className="col-sm-6">
                                Following
                            </div>

                        </div>
                    </div>
                </div>


                <ul className="list-group list-group-flush">
                    {/*{songList.map((song) => (*/}
                    {/*<li key={song.id}*/}
                    {/*className="list-group-item">*/}
                    {/*<SongItem/>*/}
                    {/*</li>*/}
                    {/*))}*/}
                    {this.renderSongs()}

                    {/*{songList.map(song => (*/}
                    {/*<li className="list-group-item">*/}
                    {/*<SongItem key={song.id}*/}
                    {/*title={song.title}*/}
                    {/*artist={song.artist}*/}
                    {/*playCount={song.playCount}*/}
                    {/*repostCount={song.repostCount}*/}
                    {/*comments={song.comments}/>*/}
                    {/*</li>*/}
                    {/*// ))}*/}
                </ul>
            </div>
        )
    }
}
export default ProfilePage