import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions';
import SelectListGroup from '../common/SelectListGroup';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
      userType: '',
			errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors});
    }
  }

	onChange(e) {
		this.setState({[e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
      userType: this.state.userType,
			password: this.state.password,
			password2: this.state.password2
		}
    
		this.props.registerUser(newUser, this.props.history);
	}

  render() {

    const user_roles = [
      { label: 'Select your role'},
      { label: 'Customer', value: 'Customer' },
      { label: 'Admin', value: 'Admin' }
    ];

  	const { errors } = this.state;
    return (
      <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Shopping account</p>
          <form onSubmit = {this.onSubmit}>
            <div className="form-group">
              <input 
              type="text" 
              className={classnames ('form-control form-control-lg', {
              	'is-invalid' : errors.name
              })} 
              placeholder="Name" 
              name="name" 
              value = {this.state.name}
              onChange = {this.onChange}
               />
               {errors.name && (
               	<div className = "invalid-feedback"> {errors.name} </div> )}
            </div>
            <div className="form-group">
              <input 
              type="email" 
              className={classnames ('form-control form-control-lg', {
              	'is-invalid' : errors.email
              })} 
              placeholder="Email Address" 
              value = {this.state.email}
              name="email" 
              onChange = {this.onChange}
              />
              {errors.email && (
               	<div className = "invalid-feedback"> {errors.email} </div> )}
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className={classnames ('form-control form-control-lg', {
              	'is-invalid' : errors.password
              })} 
              placeholder="Password" 
              value = {this.state.password}
              onChange = {this.onChange}
              name="password" />
              {errors.password && (
               	<div className = "invalid-feedback"> {errors.password} </div> )}
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className={classnames ('form-control form-control-lg', {
              	'is-invalid' : errors.password2
              })} 
              placeholder="Confirm Password" 
              value = {this.state.password2}
              onChange = {this.onChange}
              name="password2" />
              {errors.password2 && (
               	<div className = "invalid-feedback"> {errors.password2} </div> )}
            </div>
            <SelectListGroup
                  placeholder="User Roles"
                  name="userType"
                  value={this.state.userType}
                  onChange={this.onChange}
                  options={user_roles}
                  error={errors.status}
                  info="Select User Role"
                />
            <input 
            type="submit" 
            className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
     
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
