import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'


class Signup extends Component {
  state={
    name: '',
    password: '',
    email: '',
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
    const userInfo = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
    }
    axios.post(`/api/users/register`, userInfo)
      .then(res => {
        console.log("Sign Up Successful");
        this.props.history.push("/login");
      })

  }

  render(){
    const token = localStorage.getItem("key")
    if(token) return <Redirect to="/profile" />
    return(
      <div className="container">
        <h3>Sign Up</h3>
        <div className="row z-depth-2">
          <div className="col s12 white z-depth-1">
            <form>
              <div className="input-field">
                <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input type="text" id="password" value={this.state.password} onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field">
                <input type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
              </div>
            </form>

            <div className="btn blue waves-effect waves-light" onClick={this.handleSubmit}>Sign Up</div>
            <br />
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
