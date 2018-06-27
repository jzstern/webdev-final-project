import React, {Component} from 'react'
import SongItem from '../components/song-item'
import SongService from "../services/song.service.client"
import UserService from "../services/user.service.client"
import {Link, Route} from 'react-router-dom'
import Likes from "./likes"
import Reposts from "./reposts"
import Tracks from "./tracks"
import '../styles.css'
import Admin from '../containers/admin'

class ProfilePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: {},
			// profile: [],
			user: {},
			userId: null,
			songList: null,
			currentlyPlaying: null
		}

		this.songService = SongService.instance
		this.userService = UserService.instance
		this.setSongs = this.setSongs.bind(this)
		this.renderSongs = this.renderSongs.bind(this)
		this.getFollowers =  this.getFollowers.bind(this)
		this.getFollowing = this.getFollowing.bind(this)
		this.followUser = this.followUser.bind(this)
		this.unfollowUser = this.unfollowUser.bind(this)
		this.isFollowingUser = this.isFollowingUser.bind(this)
	}

	componentDidMount() {
		// this.userService
		// 	.fetchUser()
		// 	.then(user => this.setState({user: user}))
		let url = window.location.href
		let chunks = url.split("/")
		let profileId = chunks[4]

		this.userService.findUserById(profileId)
			.then(profile => {
				let user, userId
				if (!localStorage.getItem('user')) {
					user = null
					userId = null
				} else {
					user = JSON.parse(localStorage.getItem('user'))
					userId = user._id
					if (user.accountType === 'admin') {
                        window.location.href = 'http://localhost:3000/admin'
                    }
				}
				this.setState({
					profile: profile,
					user: user,
					userId: userId
				})
			});

	}

	componentWillReceiveProps(newProps) {
		//TODO  after an update is made, should fetch the user from server again and store in browser local storage
		let url = window.location.href
		let chunks = url.split("/")
		let profileId = chunks[4]

		this.userService.findUserById(profileId)
			.then(profile => {
				let user, userId
				if (!localStorage.getItem('user')) {
					user = null
					userId = null
				} else {
					user = JSON.parse(localStorage.getItem('user'))
					userId = user._id
				}
				this.setState({
					profile: profile,
					user: user,
					userId: userId
				})
			})
	}

	setSongs(songs) {
		this.setState({
			songList: songs
		})
		this.renderSongs()
	}

	followUser() {
		let user = JSON.parse(localStorage.getItem('user'))
		let artist = this.state.profile
		user.following.push(artist._id)
		artist.followers.push(user._id)

		this.userService
			.updateUser(user)
			.then(() => {
				localStorage.setItem('user', JSON.stringify(user))
				this.userService
					.updateUser(artist)
					.then(this.setState({ profile: artist, user: user }))
			})

		// this.userService
		// .followUser(this.state.profile._id)
		// .then(res => {
		// 	if (res.statusCode === 404) {
		// 		console.log('jeez')
		// 	} else {
		// 		alert("You are now following this user")
		// 	}
		// })
	}

	unfollowUser() {
		let user = JSON.parse(localStorage.getItem('user'))
		let artist = this.state.profile
		let uIndex = user.following.indexOf(artist._id)
		let aIndex = artist.followers.indexOf(user._id)
		user.following.splice(uIndex, 1)
		artist.followers.splice(aIndex, 1)

		this.userService
			.updateUser(user)
			.then(() => {
				localStorage.setItem('user', JSON.stringify(user))
				this.userService
					.updateUser(artist)
					.then(this.setState({ profile: artist, user: user }))
			})
		// this.userService
		// 	.unfollowUser(this.state.profile._id)
		// 	.then(res => {
		// 		alert("You are no longer following this user")
		// 	})
	}

	isFollowingUser() {
		if (!localStorage.getItem('user')) {
			return false
		} else {
			let following = JSON.parse(localStorage.getItem('user')).following

			if (following.indexOf(this.state.profile._id) === -1) {
				return false
			} else {
				return true
			}
		}
	}

	getFollowers() {
		if (this.state.profile && this.state.profile.followers) {
		return <h4>{this.state.profile.followers.length}</h4>
		}
	}

	getFollowing() {
		if (this.state.profile && this.state.profile.following) {
		return <h4>{this.state.profile.following.length}</h4>
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

				<div hidden={this.state.profile._id === this.state.userId}
				     style={{marginBottom: 10}}
				     className="container-fluid">
					{!this.isFollowingUser() && <button type="button"
					                                    className="btn btn-secondary"
					                                    onClick={this.followUser}>Follow</button>}
					{this.isFollowingUser() && <button type="button"
					                                   className="btn btn-secondary"
					                                   onClick={this.unfollowUser}>Unfollow</button>}
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
							<div className="row">
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
