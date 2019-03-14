import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class ItemItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-9 col-md-4 col-8">
            <h3>{item.name}</h3>

            <p>{item.description} </p>
          </div>
          <div className="col-md-7 d-none d-md-block">
          </div>
          <div className="col-md-7 d-none d-md-block">
            <h5>Value: {item.value} </h5>
          </div>
        </div>
      </div>
    );
  }
}

ItemItem.propTypes = {
  item: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default ItemItem;
