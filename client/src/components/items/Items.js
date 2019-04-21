import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getItem, getItems } from '../../actions/itemActions';
import ItemItem from './ItemItem';

class Items extends Component {
  componentDidMount() {

    const { user } = this.props.auth;

    if (user.userType === 'Customer' || user.userType === 'Admin') {
      this.props.getItems();
    }
  }



  render() {
    const { items } = this.props.item;
    const { user } = this.props.auth;
    // const items = this.props.item.item;
    let itemContent;
    let itemValues = [];
      if (items.length > 0) {
        itemContent = items.map(item => (
          <ItemItem key={item._id} item={item} auth={user} />
        ));
        items.forEach(item =>
          itemValues.push({ key: item._id, value: item.description })
        );
      } else {
        itemContent = <h4> NO items available...</h4>;
      }
    console.log("Item"+user.name)

    

    return (
      <div className="items">
        <div className="container">
          <div className="row">
            <div className="col-md-16">
              
              <h1 className="display-6 text-left">Grocery</h1>
              {itemContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Items.propTypes = {
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getItem, getItems }
)(Items);
