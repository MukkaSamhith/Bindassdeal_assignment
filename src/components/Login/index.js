import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', reason: '', isLogin: false}

  changeToLandPage = event => {
    event.preventDefault()
    const {username, password} = this.state

    const x = localStorage.getItem(username)
    if (username === '') {
      this.setState({isLogin: true, reason: 'Enter Username'})
    } else if (x !== password) {
      this.setState({isLogin: true, reason: 'Invalid Username or Password'})
    } else if (x === password) {
      const {history} = this.props
      history.replace('/home')
    }
  }

  userInput = event => {
    this.setState({username: event.target.value, isLogin: false})
  }

  passwordInput = event => {
    this.setState({password: event.target.value, isLogin: false})
  }

  render() {
    const {reason, isLogin} = this.state
    return (
      <div className="login-page">
        <form className="form-container" onSubmit={this.changeToLandPage}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            placeholder="Enter Username"
            id="username"
            onChange={this.userInput}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={this.passwordInput}
          />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          {isLogin && <span className="user-value">{reason}</span>}
          <p>
            If You have&apos;t logged In ?
            <span>
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    )
  }
}

export default Login
