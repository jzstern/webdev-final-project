import React, {Component} from 'react'

export default class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
    }
    componentDidMount() {
        this.setState({userId: this.props.userId});
    }
    render() {
        return (
            <div>
                <h1>USERID: {this.userId}</h1>
                <h5 className="card-title">Tracks Component</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional
                    content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        )
    }
}
