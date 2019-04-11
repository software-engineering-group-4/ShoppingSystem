import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartItem from './cartItem';
import axios from 'axios';

import { getItem, getItems } from '../../actions/itemActions';


class Cart extends Component {

  state={
    cart:[],
    total: 0
  }

  componentWillMount() {
    const { user } = this.props.auth;
    console.log(user.email)
    axios.post('/api/cart/getCart', {"customer":user.email})
    .then(res => {
      console.log("hello")
      console.log(res.data)
      console.log("")
      if(res.data){
        console.log(res.data)
        this.setState({
          cart: res.data
        })
        var sum=0;
        for(var x=0;x<this.state.cart.length;x++){
          sum += this.state.cart[x].itemPrice * this.state.cart[x].itemQuantity
        }
        this.setState({
          total: sum
        })
      }
    })
  }

  handleOrder=()=>{
    window.location.replace("http://localhost:3000/checkout");
  }

  render() {
    const { user } = this.props.auth;

    // const items = this.props.item.item;


    return (
      <div className="items">
      {this.state.cart.length<=0 ?
        console.log(this.state.cart.length)
        :
        this.state.cart.map(function(item){
          return(
            <CartItem item={item} auth={user.email} key={item._id} />
          )
        })
      }
      <h3>Cart Total: ${this.state.total}</h3>
      <button type="button" className="btn btn-primary" onClick={this.handleOrder}>ORDER</button>
      </div>
    );
  }
}

Cart.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Cart);
