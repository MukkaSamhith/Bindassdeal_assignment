import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

class Register extends Component {
  state = {
    username: '',
    password: '',
    isSignedIn: false,
    reason: '',
    invalid: false,
  }

  signIn = event => {
    event.preventDefault()
    const {username, password} = this.state
    localStorage.setItem(username, password)
    if (username === '' || password === '') {
      this.setState({invalid: true, reason: 'Enter Details Correctly'})
    } else {
      this.setState({isSignedIn: true})
    }
  }

  userInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isSignedIn, invalid, reason} = this.state
    if (isSignedIn) {
      return <Redirect to="/home" />
    }
    return (
      <form className="signIn-page" onSubmit={this.signIn}>
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
        <button type="submit" className="register-button">
          Register
        </button>
        {invalid && <span className="invalid-data">{reason}</span>}
        <p>
          Already Signed In ? <Link to="/">Login</Link>
        </p>
      </form>
    )
  }
}

export default Register
