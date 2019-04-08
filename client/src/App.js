import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
// import Home from './components/Home'
// import axios from 'axios'

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AddItem from './components/add-item/AddItem';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}


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
      <Provider store = {store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className = "container">
            <Route exact path ="/register" component = {Register} />
            <Route exact path ="/login" component = {Login} />

            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/add-item" component={AddItem} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
