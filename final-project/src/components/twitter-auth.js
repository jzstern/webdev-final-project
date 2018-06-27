import React, {Component} from 'react'
import TwitterLogin from 'react-twitter-auth'
import '../styles.css'

class TwitterAuth extends Component {

  constructor(props) {
    super(props)
    this.state = {twitter: { isAuthenticated: false, user: null, token: ''}}
  }
  // log out
  logout = () => {
    this.setState({
      twitter: {isAuthenticated: false, token: '', user: null}})
  };

  // successful authentication
  onSuccess = (response) => {
    console.log("success")
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  // failed authentication
  onFailed = (error) => {
    console.log("failure")
    alert(error);
  };

  // render component
  render() {
    let content = !!this.state.isAuthenticated ?
    (
      <div>
        <p>Authenticated</p>
        <div>
          {this.state.user.email}
        </div>
        <div>
          <button onClick={this.logout} className="button" >
            Log out
          </button>
        </div>
      </div>
    ) :
    (
      <TwitterLogin loginUrl="http://localhost:4000/api/auth/twitter"
        onFailure={this.onFailed} onSuccess={this.onSuccess}
        requestTokenUrl="http://localhost:4000/api/auth/twitter/reverse"/>
    );

    return (
      <div className="Twitter">
        {content}
      </div>
    );
  }
}
export default TwitterAuth
