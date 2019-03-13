import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends Component {

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    console.log('test Dashboard');
    let userContent;

    if (user.userType === 'Customer') {
      userContent = (
        <div className="btn-group mb-4" role="group">
          <div className="col-md-12">
            <div className="row">
            </div>
          </div>
        </div>
      );
    } else {
      userContent = (
         <div className="btn-group mb-4" role="group">
          <div className="col-md-12">
            <div className="row">
              <Link to="/add-item" className="btn btn-light">
                <i className="fas fa-hand-holding-usd text-secondary mr-1" />
                Add Item
              </Link>
            </div>

            <div className="row">
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">Welcome {user.name}</p>{' '}
              {userContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Dashboard);
