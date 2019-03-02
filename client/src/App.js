import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import axios from 'axios'

class App extends Component {

  state: {
    loggedIn: false
  }

  componentWillMount(){
    axios.post(`/auth`, {"token" : localStorage.getItem("key")}).then(res => {
      if (res.data === "invalid"){
        this.setState({loggedIn: false})
      }
      else if (res.data === "clear"){
        localStorage.removeItem("key")
        this.setState({loggedIn: false})
      }
      else if (res.data === "valid"){
        console.log('success')
        this.setState({loggedIn: true})
        console.log(this.state)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="App">
                <Switch>
                  <Route exact path ='/' component={Home} />
                  <Route path ='/login' component={Login} />
                  <Route path ='/signup' component={Signup} />
                </Switch>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
