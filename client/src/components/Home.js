import React from 'react'
import { Link, Redirect } from 'react-router-dom'

const Home = () => {
  return(
    <div className="container">
      <h3>Home</h3>
      <div className="row">
        <div className="col s12">
          <div className="card white z-depth-3">
            <div className="card-content">
              <span className="card-title">Fake Grocers</span>
              <p>
              Get yo fake foods here
              </p>
            </div>
            <div className="card-action">
              <Link to="/signup" className="btn blue waves-effect waves-light">Sign Up</Link>
              &nbsp;
              <Link to="/login" className="btn blue waves-effect waves-light">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
