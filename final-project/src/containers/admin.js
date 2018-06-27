import React, {Component} from 'react'
import SongItem from '../components/song-item'
import SongService from "../services/song.service.client"
import UserService from "../services/user.service.client"
import {Link, Route} from 'react-router-dom'
import '../styles.css'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            email: '',
            displayName: '',
            password: '',
            accountType:'listener'

        }
        this.userService = UserService.instance;
        this.renderUsers = this.renderUsers.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        this.userService
            .findAllUsers()
            .then(users => this.setState({users: users}))
    }

    delete(userId) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.userService
                .deleteUser(userId)
                .then(() => {
                    this.fetchUsers()
                });
        }
    }

    register(e) {
        e.preventDefault()

        let user = {
            email: this.state.email,
            displayName: this.state.displayName,
            username: this.state.username,
            password: this.state.password1,
            accountType: this.state.accountType
        }

        this.userService
            .createUser(user)
            .then((res) => {
                if (res.status === 500) {
                    alert('Sorry, that username is already taken')
                } else {
                   this.fetchUsers();
                }
            })
    }

    edit(userId) {

    }

    renderUsers() {
        let userlist
        if (this.state.users !== null) {
            userlist = this.state.users.map((user) => {
                return <li className="list-group-item">
                    {user.displayName}
                    <span className="float-right">
                     <button onClick={() =>
                     {this.delete(user._id)}}><i className="fa fa-trash"></i>
                     </button>
                     <button onCLick={() =>
                     {this.edit(user._id)}}><i className="fa fa-pencil"></i>
                     </button>
            </span>
                </li>
            })
        }
        return userlist
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-6">
                    <h1>Users</h1>
                    <ul className="list-group">

                        {this.renderUsers()}
                    </ul>
                </div>
                <div className="col-sm-6">
                    <h1>Create/Edit User</h1>
                    <form onSubmit={this.register} className="container">
                        <div className="container">
                            <label>Email</label>
                            <input name="email"
                                   value={this.state.email}
                                   onChange={this.onChange}
                                   placeholder="Enter your email"
                                   type="text"
                                   className="form-control"/>
                        </div>

                        <div className="container">
                            <label >Display Name</label>
                            <input name="displayName"
                                   value={this.state.displayName}
                                   onChange={this.onChange}
                                   placeholder="Enter your displayName"
                                   type="text"
                                   className="form-control"/>

                        </div>

                        <div className="container">
                            <label >Username</label>
                            <input name="username"
                                   value={this.state.username}
                                   onChange={this.onChange}
                                   placeholder="Enter your username"
                                   type="text"
                                   className="form-control"/>

                        </div>

                        <div className="container">
                            <label>Password</label>
                            <input name="password1"
                                   value={this.state.password1}
                                   onChange={this.onChange}
                                   placeholder="Enter your password"
                                   type="password"
                                   className="form-control"/>

                        </div>
                        <div className="container">
                            <label>Re-enter password</label>
                            <input name="password2"
                                   value={this.state.password2}
                                   onChange={this.onChange}
                                   placeholder="Re-type your password here"
                                   type="password"
                                   className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Account Type</label>
                            <select name="accountType"
                                    value={this.state.accountType}
                                    onChange={this.onChange}
                                    className="form-control"
                                    style={{width: 200}}>
                                <option value="listener">Listener</option>
                                <option value="artist">Artist</option>
                                <option value="artistPro">Artist Pro</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-secondary" style={{marginRight: 10}}>Create User</button>
                        </div>

                        <Link to={'/login'}>
                            <button className="btn btn-primary">Edit User</button>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}
export default Admin
