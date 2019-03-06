import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
// import Home from './components/Home'
// import axios from 'axios'

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

class App extends Component {



  // state: {
  //   loggedIn: false
  // }

  // componentWillMount(){
  //   axios.post(`/auth`, {"token" : localStorage.getItem("key")}).then(res => {
  //     if (res.data === "invalid"){
  //       this.setState({loggedIn: false})
  //     }
  //     else if (res.data === "clear"){
  //       localStorage.removeItem("key")
  //       this.setState({loggedIn: false})
  //     }
  //     else if (res.data === "valid"){
  //       console.log('success')
  //       this.setState({loggedIn: true})
  //       console.log(this.state)
  //     }
  //   })
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className = "container">
            <Route exact path ="/register" component = {Register} />
            <Route exact path ="/login" component = {Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
