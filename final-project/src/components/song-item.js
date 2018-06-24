import React, {Component} from 'react'
import songService from "../services/song.service.client"
import userService from "../services/user.service.client"
import '../styles.css'

class SongStats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playCount: this.props.playCount,
			likeCount: this.props.likeCount,
			comments: this.props.comments,
			repostCount: this.props.repostCount
		}
	}
	render() {
		return (
			<div className="row pull-right">
				<span className="fa fa-sm fa-play fa-fw"/>
				<p className="pr-2">{this.props.playCount}</p>

				<span className="fa fa-heart" aria-hidden="true"/>
				<p>{this.props.likeCount}</p>

				<span className="fa fa-retweet" aria-hidden="true"/>
				<p>{this.props.repostCount}</p>

				<span className="fa fa-sm fa-comment fa-fw"/>
				<p>{this.props.comments.length}</p>
			</div>
		)
	}
}

class SongItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			title: '',
			artist: '',
			imgUrl: '',
			stats: {
				playCount: 0,
				likeCount: 0,
				repostCount: 0,
			},
			description: '',
			comments: [],
			genre: 'Custom Genre',
			liked: false,
			reposted: false,
			currentlyPlaying: false
		}
		this.songService = songService.instance
		this.userService = userService.instance
		this.isLoggedIn = this.isLoggedIn.bind(this)
		this.tweet = this.tweet.bind(this)
		this.shareLink = this.shareLink.bind(this)
		this.toggleLike = this.toggleLike.bind(this)
		this.toggleRepost = this.toggleRepost.bind(this)
		this.likeSongForUser = this.likeSongForUser.bind(this)
		this.unlikeSongForUser = this.unlikeSongForUser.bind(this)
		this.repostSongForUser = this.repostSongForUser.bind(this)
		this.unrepostSongForUser = this.unrepostSongForUser.bind(this)
	}

	componentDidMount() {
		this.setState({
			id: this.props.id,
			title: this.props.title,
			artist: this.props.artist,
			genre: this.props.genre,
			description: this.props.description,
			playCount: this.props.stats.playCount,
			likeCount: this.props.stats.likeCount,
			repostCount: this.props.stats.repostCount,
			// comments: this.props.comments,
			imgUrl: this.props.imgUrl
		})

		// load user info
		const user = localStorage.getItem('user')
		this.setState({user: user})

		if (this.isLoggedIn()) {
			let likes = JSON.parse(user || "[]").likedSongs
			let reposts = JSON.parse(user || "[]").repostedSongs

			if (likes.length !== 0) {
				if (likes.indexOf(this.props.id) !== -1) {
					this.state.liked = true
				}
			}
			if (reposts.length !== 0) {
				if (reposts.indexOf(this.props.id) !== -1) {
					this.state.reposted = true
				}
			}
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			id: newProps.id,
			title: newProps.title,
			artist: newProps.artist,
			genre: newProps.genre,
			description: newProps.description,
			playCount: newProps.stats.playCount,
			likeCount: newProps.stats.likeCount,
			repostCount: newProps.stats.repostCount,
			// comments: this.props.comments,
			imgUrl: newProps.imgUrl
		})
	}

	isLoggedIn() {
		return localStorage.getItem('user') !== null
	}

	likeSongForUser() {
		var user = JSON.parse(localStorage.getItem('user'))
		user.likedSongs.push(this.props.id)

		return this.userService
			.updateUser(user)
			.then(() => {
				localStorage.setItem('user', JSON.stringify(user))
				this.songService
					.likeSongById(this.props.id)
					.then(() => this.setState({id: this.props.id})) // to trigger song component re-rendered
			})
	}

	unlikeSongForUser() {
		var user = JSON.parse(localStorage.getItem('user'))
		// let likes = JSON.parse(user || "[]").likedSongs

		var index = user.likedSongs.indexOf(this.props.id)
		user.likedSongs.splice(index, 1)

		this.userService
			.updateUser(user)
			.then(() => {
				localStorage.setItem('user', JSON.stringify(user))
				this.songService
					.unlikeSongById(this.props.id)
					.then(() => this.setState({id: this.props.id})) // to trigger song component re-rendered
			})
	}

	repostSongForUser() {
		var user = JSON.parse(localStorage.getItem('user'))
		user.repostedSongs.push(this.props.id)

		return this.userService
			.updateUser(user)
			.then(() => {
				localStorage.setItem('user', JSON.stringify(user))
				this.songService
					.repostSongById(this.props.id)
					.then(() => this.setState({id: this.props.id})) // to trigger song component re-rendered
			})
	}

	unrepostSongForUser() {
		var user = JSON.parse(localStorage.getItem('user'))
		// let likes = JSON.parse(user || "[]").likedSongs

		var index = user.repostedSongs.indexOf(this.props.id)
		user.repostedSongs.splice(index, 1)

		this.userService
			.updateUser(user)
			.then(() => {
				localStorage.setItem('user', JSON.stringify(user))
				this.songService
					.unrepostSongById(this.props.id)
					.then(() => this.setState({id: this.props.id})) // to trigger song component re-rendered
			})
	}

	tweet() {
		if (this.isLoggedIn()) {
			let songURL = 'http://webdev.halhyatt.com/song/' + this.state.id
			this.setState({tweeted: !this.state.tweeted})
			//	make API call to post tweet
		} else {
			alert('You must be logged in to tweet a song')
		}
	}

	toggleLike() {
		if (this.isLoggedIn()) {
			this.setState({liked: !this.state.liked}, () => {
				if (this.state.liked) {
					this.likeSongForUser()
					this.state.likeCount++
				} else {
					this.unlikeSongForUser()
					this.state.likeCount--
				}
			})
		} else {
			alert('You must be logged in to like a song')
		}
	}

	toggleRepost() {
		if (this.isLoggedIn()) {
			this.setState({reposted: !this.state.reposted}, () => {
				if (this.state.reposted) {
					this.repostSongForUser()
					this.state.repostCount++
				} else {
					this.unrepostSongForUser()
					this.state.repostCount--
				}
			})
		} else {
			alert('You must be logged in to tweet a song')
		}
	}

	shareLink() {
		// TODO ; have a popup module w/ a url & a button to copy it to clipboard
		console.log('here is your url')
	}

	render() {
		return (
			<div className="container card">
				<div className="flex-row">
					<div className="pull-left p-3" style={{marginLeft: -14}}>
						<img src={this.state.imgUrl} style={{height: 150, width: 150}}/>
					</div>
					<div className="p-4">
						<div className="row">
							<button className="btn btn-primary mr-4">
								<span className="glyphicon glyphicon-play"/>
							</button>
							<h4>{this.state.title}</h4>
							<a href="#" className="pull-right">
								<h4>{this.state.artist}</h4>
							</a>
						</div>
						<div className="p-4">
							<h4>{this.state.description}</h4>
						</div>
						<div className="flex-row">
							<div className="pull-left">
								<i className="btn" onClick={this.toggleLike}>
									{/*<span className="fa fa-heart-o fa-fw" hidden={!this.state.liked}/>*/}
									{!this.state.liked && <span className="fa fa-heart-o fa-fw"/>}
									{this.state.liked && <span className="fa fa-heart fa-fw" style={{color: 'blue'}}/>}
								</i>
								<i className="btn" onClick={this.toggleRepost}>
									{!this.state.reposted && <span className="fa fa-retweet fa-fw"/>}
									{this.state.reposted && <span className="fa fa-retweet fa-fw" style={{color: 'blue'}}/>}
									{/*<span className="fa fa-retweet fa-dw"/>*/}
								</i>
								<i className="btn" onClick={this.shareLink}>
									<span className="glyphicon glyphicon-share fa-fw"/>
								</i>
								<i className="btn" onClick={this.tweet}>
									{/*<span className="fa fa-twitter fa-fw"/>*/}
									{!this.state.tweeted && <span className="fa fa-twitter fa-fw"/>}
									{this.state.tweeted && <span className="fa fa-twitter fa-fw" style={{color: 'blue'}}/>}
								</i>
							</div>

							<SongStats likeCount={this.state.likeCount}
							           playCount={this.state.playCount}
							           comments={this.state.comments}
							           repostCount={this.state.repostCount}/>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default SongItem