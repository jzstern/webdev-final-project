import React, {Component} from 'react'

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

export default SongStats