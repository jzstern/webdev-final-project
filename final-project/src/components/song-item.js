import React, {Component} from 'react'
import '../styles.css'
import songService from "../services/song.service.client";

class SongStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playCount: this.props.playCount,
            likeCount: this.props.likeCount,
            comments: this.props.comments
        }
    }
    render() {
        return (
            <div className="row pull-right">
                <span className="fa fa-sm fa-play fa-fw"/>
                <p className="pr-2">{this.props.playCount}</p>
                <span className="fa fa-heart" aria-hidden="true"/>
                <p>{this.props.likeCount}</p>

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
            imgUrl: 'https://i1.sndcdn.com/artworks-000206480020-ejb3mq-t500x500.jpg',
            stats: {
                playCount: 0,
                likeCount: 0,
                repostCount: 0,
            },
            comments: [],
            genre: 'Custom Genre',
            liked: false,
            reposted: false,
            tweeted: false,
            currentlyPlaying: false,
            description: 'This is a song! Here is where the waveform will go or something'
        }
        this.songService = songService.instance;
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
            id: this.props.id,
            title: this.props.title,
            artist: this.props.artist,
            genre: this.props.genre,
            description: this.props.description,
            playCount: this.props.stats.playCount,
            likeCount: this.props.stats.likeCount,
            repostCount: this.props.stats.repostCount,
            // comments: this.props.comments,
            liked: this.props.liked,
            reposted: this.props.reposted,
            tweeted: this.props.tweeted,
            imgUrl: this.props.imgUrl
        });
    }

    componentWillReceiveProps(newProps) {
        // TODO ; fill out
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
            liked: newProps.liked,
            reposted: newProps.reposted,
            tweeted: newProps.tweeted,
            imgUrl: newProps.imgUrl
        });

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

        this.songService
            .likeSongById(this.props.id)
            .then(()=>
                this.setState({id: this.props.id})); // to trigger song component re-rendered

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

                            <SongStats likeCount={this.state.likeCount}
                                       playCount={this.state.playCount}
                                        comments={this.state.comments}/>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SongItem