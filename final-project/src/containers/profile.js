import React, {Component} from 'react'
import SongItem from '../components/song-item'
import SongService from "../services/song.service.client"
import UserService from "../services/user.service.client"
import {Link, Route} from 'react-router-dom'
import Likes from "../components/likes"
import Reposts from "../components/reposts"
import Tracks from "../components/tracks"
import '../styles.css'

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userId: null,
            songList: null,
            currentlyPlaying: null,
			profile: []
        }

        this.songService = SongService.instance
        this.userService = UserService.instance
        this.setSongs = this.setSongs.bind(this)
        this.renderSongs = this.renderSongs.bind(this)
        this.getFollowers =  this.getFollowers.bind(this);
        this.getFollowing = this.getFollowing.bind(this);
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    componentDidMount() {
        // this.userService
        // 	.fetchUser()
        // 	.then(user => this.setState({user: user}))
        let url = window.location.href
        let chunks = url.split("/")
        let profileId = chunks[4]

        var profile = {}

        this.userService.findUserById(profileId)
            .then(user => {
                profile = user

                this.setState({
                    profile: profile,
                    user: JSON.parse(localStorage.getItem('user')),
                    userId: JSON.parse(localStorage.getItem('user'))._id
                })
            })
    }

    componentWillReceiveProps(newProps) {
        //TODO
        // after an update is made, should fetch the user from server again and store in browser local storage

    }

    setSongs(songs) {
        this.setState({
            songList: songs
        })
        this.renderSongs()
    }

    followUser() {
        alert("you are following this user")
    }

    unfollowUser() {
        alert("unfollow user")
    }

    getFollowers() {
        if (this.state.user && this.state.user.followers) {
            console.log(this.state.user)
            return <h4>{this.state.user.followers.length}</h4>
        }
    }

    getFollowing() {
        if (this.state.user && this.state.user.following) {
            console.log(this.state.user)
            return <h4>{this.state.user.following.length}</h4>
        }
    }

    renderSongs() {
        let songs
        if (this.state.songList !== null) {
            songs = this.state.songList.map((song) => {
                return <SongItem key={song._id}
                                 artistId={song.artistId}
                                 title={song.title}
                                 genre={song.genre}
                                 stats={song.stats}

					// comments={song.comments}
                                 liked={song.liked}
                                 reposted={song.reposted}
                                 tweeted={song.tweeted}
                                 imgUrl={song.imgUrl}
                                 description={song.description}/>
            })
        }
        return songs
    }

    render() {
        return (
            <div className="container">
				<h2>{this.state.profile.displayName}</h2>
                <div hidden={this.state.profile._id === this.state.userId} className="container-fluid">
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={this.followUser}>Follow</button>
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={this.unfollowUser}>Unfollow</button>
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
                                    <Route path='/profile/:userId/tracks' render={(props) => <Tracks user={this.state.user}/>}/>
                                    <Route path='/profile/:userId/reposts' render={(props) => <Reposts user={this.state.user}/>}/>
                                    <Route path='/profile/:userId/likes' render={(props) => <Likes user={this.state.user}/>}/>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    Followers
                                </div>
                                <div className="col-sm-6">
                                    Following
                                </div>
                            </div>
                            <div class="row">
                                <div className="col-sm-6">
                                    {this.getFollowers()}
                                </div>
                                <div className="col-sm-6">
                                    {this.getFollowing()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfilePage
