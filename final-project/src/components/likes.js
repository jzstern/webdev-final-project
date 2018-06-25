import React, {Component} from 'react'

export default class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="card-body">
                <h5 className="card-title">Likes Component</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional
                    content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        )
    }
}