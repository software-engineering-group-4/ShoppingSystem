import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class ItemItem extends Component {
  onClick = () =>{
    console.log(this.props.item.name)
    console.log(this.props.auth.name)
  }
  render() {
    const { item } = {...this.props};
    const {auth} = {...this.props};
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-9 col-md-4 col-8">
            <h3>{item.name}</h3>
            <button type="button" className="btn btn-primary" onClick={this.onClick}>Add To Cart</button>
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
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default ItemItem;
