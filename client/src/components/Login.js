import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


export class Login extends Component{
  state = {
    username: '',
    password: '',
    loginError: false,
    redirect: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const loginInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    this.state.ws.send(loginInfo)
    this.state.ws.onmessage = (event) => {
      console.log(event.data)
    }
  }



  render(){
    const token = localStorage.getItem("key")
    if(token) return <Redirect to="/profile" />
    return(
      <div className="container">
        <h3>Login</h3>
        <div className="row z-depth-2">
          <div className="col s12 white z-depth-">
            <form>
              <div className="input-field">
                <input type="text" id="username" value={this.state.username} onChange={this.handleChange} />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field">
                <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
            </form>

            <div className="btn blue waves-effect waves-light" onClick={this.handleSubmit} >Login</div>
            <br />
            {
               //Check if login failed
               (this.state.loginError === true) ? <div className="red-text">Incorrect Login Info. Please try again</div> : <br />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Login
