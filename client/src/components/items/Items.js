import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getItem, getItems } from '../../actions/itemActions';
import ItemItem from './ItemItem';

class Items extends Component {
  componentDidMount() {

    const { user } = this.props.auth;

    if (user.userType === 'Customer') {
      this.props.getItems();
    }
  }

  render() {
    const { items, loading } = this.props.item;
    // const items = this.props.item.item;
    let itemContent;
    let itemValues = [];
      if (items.length > 0) {
        itemContent = items.map(item => (
          <ItemItem key={item._id} item={item} />
        ));
        items.forEach(item =>
          itemValues.push({ key: item._id, value: item.description })
        );
      } else {
        itemContent = <h4> NO items available...</h4>;
      }
    

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