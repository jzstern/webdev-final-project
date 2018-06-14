import React, { Component } from 'react'
import '../styles.css'

class FixedBottomBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songId: '',
			artistId: '',
			songTitle: '',
			songArtist: '',
			songPlaying: false
		}
	}

	render() {
		return (
			<footer className="page-footer font-small blue footer">
				<div className="container-fluid flex-row">
					<div className="pull-left align-middle p-2">
						<button href="#">
							<i className="fa fa-step-backward fa-fw"/>
						</button>
						<button href="#">
							<i className="fa fa-play fa-fw"/>
							<i className="fa fa-pause fa-fw"/>
						</button>
						<button href="#">
							<i className="fa fa-step-forward fa-fw"/>
						</button>
						<button href="#">
							<i className="fa fa-random fa-fw"/>
						</button>
						<button href="#">
							<i className="fa fa-retweet fa-dw"/>
						</button>
					</div>
				</div>
			</footer>
		)
	}
}
export default FixedBottomBar
