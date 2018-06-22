import React, {Component} from 'react'
import '../styles.css'

class SongItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			title: '',
			artist: '',
			albumArtUrl: 'https://i1.sndcdn.com/artworks-000206480020-ejb3mq-t500x500.jpg',
			playCount: 6423,
			likesCount: 257,
			repostCount: 59,
			comments: [],
			genre: 'Custom Genre',
			liked: false,
			reposted: false,
			tweeted: false,
			currentlyPlaying: false,
			description: 'This is a song! Here is where the waveform will go or something'
		}

		this.tweet = this.tweet.bind(this)
		this.shareLink = this.shareLink.bind(this)
		this.toggleLike = this.toggleLike.bind(this)
		this.toggleRepost = this.toggleRepost.bind(this);
	}

	componentDidMount() {
		// TODO ; fill out
		// api call - did the user like the song?
		// api call - did the user repost the song?
		// this.setState();
		this.setState({
			id: this.props.key,
			title: this.props.title,
			artist: this.props.artist,
			genre: this.props.genre,
			description: this.props.description,
			playCount: this.props.playCount,
			likesCount: this.props.likesCount,
			repostCount: this.props.repostCount,
			// comments: this.props.comments,
			liked: this.props.liked,
			reposted: this.props.reposted,
			tweeted: this.props.tweeted,
			albumArtUrl: this.props.albumArtUrl
		});
	}
	
	componentWillReceiveProps(newProps) {
		// TODO ; fill out
	}

	tweet() {
		let songURL = 'http://webdev.halhyatt.com/song/' + this.state.id
		this.setState({tweeted: !this.state.tweeted})
	//	make API call to post tweet
	}

	toggleLike() {
		// this.state.liked = !this.state.liked
		this.setState({liked: !this.state.liked})
		console.log("toggling like!")
		console.log(this.state.liked)

	}

	toggleRepost() {
		this.setState({reposted: !this.state.reposted})
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
						<img src={this.state.albumArtUrl} style={{height: 150, width: 150}}/>
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
									{this.state.liked && <span className="fa fa-heart-o fa-fw"/>}
									{!this.state.liked && <span className="fa fa-heart fa-fw" style={{color: 'blue'}}/>}
								</i>
								<i className="btn" onClick={this.toggleRepost}>
									{this.state.reposted && <span className="fa fa-retweet fa-fw"/>}
									{!this.state.reposted && <span className="fa fa-retweet fa-fw" style={{color: 'blue'}}/>}
									{/*<span className="fa fa-retweet fa-dw"/>*/}
								</i>
								<i className="btn" onClick={this.shareLink}>
									<span className="glyphicon glyphicon-share fa-fw"/>
								</i>
								<i className="btn" onClick={this.tweet}>
									{/*<span className="fa fa-twitter fa-fw"/>*/}
									{this.state.tweeted && <span className="fa fa-twitter fa-fw"/>}
									{!this.state.tweeted && <span className="fa fa-twitter fa-fw" style={{color: 'blue'}}/>}
								</i>
							</div>

							<div className="row pull-right">
								<span className="fa fa-sm fa-play fa-fw"/>
								<p className="pr-2">{this.state.playCount}</p>
								<span className="fa fa-sm fa-comment fa-fw"/>
								<p>{this.state.comments.length}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SongItem