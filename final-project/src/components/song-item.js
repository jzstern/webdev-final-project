import React, {Component} from 'react'
import '../styles.css'

class SongItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			title: 'Me & You',
			artist: 'Palmingo',
			albumArtUrl: 'https://i1.sndcdn.com/artworks-000206480020-ejb3mq-t500x500.jpg',
			playCount: 6423,
			likesCount: 257,
			repostCount: 59,
			comments: [],
			genre: 'Custom Genre',
			liked: false,
			reposted: false,
			currentlyPlaying: false,
			description: 'This is a song! Here is where the waveform will go or something'
		}

		this.tweet = this.tweet.bind(this)
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
			genre: this.props.genre,
			description: this.props.description
		});

	}
	
	componentWillReceiveProps(newProps) {
		// TODO ; fill out
	}

	tweet() {
		let songURL = 'http://webdev.halhyatt.com/song/' + this.state.id
	//	make API call to post tweet
	}

	toggleLike() {
		this.state.liked = !this.state.liked
		console.log("toggling like!")
	}

	toggleRepost() {
		this.state.reposted = !this.state.reposted
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
								<a href="#" onClick={() => this.toggleLike}>
									<span className="fa fa-heart-o fa-fw" hidden={!this.state.liked}/>
									<span className="fa fa-heart fa-fw" hidden={this.state.liked}/>
								</a>
								<a href="#">
									<span className="fa fa-retweet fa-dw"/>
								</a>
								<a href="#">
									<span className="glyphicon glyphicon-share fa-fw"/>
								</a>
								<a href="#">
									<span className="fa fa-twitter fa-fw"/>
								</a>
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