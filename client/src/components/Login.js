import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


export class Login extends Component{
  state = {
    email: '',
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
        email: this.state.email,
        password: this.state.password,
      }
      axios.post(`/api/users/login`, loginInfo)
        .then(res => {
          if (res.data==='incorrect'){
            this.setState({
              loginError: true
            });
          }
          else{
            //localStorage.setItem("key", res.data);
            this.props.history.push("/");
          }
        })
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
                <input type="text" id="email" value={this.state.email} onChange={this.handleChange} />
                <label htmlFor="email">Email</label>
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
