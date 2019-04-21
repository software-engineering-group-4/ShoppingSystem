import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import classnames from 'classnames';



class Checkout extends Component {

  state={
    email: this.props.auth.user.email,
    cart:[],
    total: 0,
    street: '',
    city: '',
    state: '',
    zipcode: '',
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

  onChange =(e)=> {
    this.setState({[e.target.name]: e.target.value });
  }

  onSubmit =(e)=> {

    const order = this.state

    console.log(order)
    if(order.cart.length!==0){
      axios.post('/api/checkout/checkout', order)
      .then(res =>{
        console.log(res.data)
        window.location.replace("http://localhost:3000/dashboard");
      })
    }
  }

  render() {

    // const items = this.props.item.item;


    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="display-4 text-center">Order Summary</h1>
            <div className="items">
            <ul>
            {this.state.cart.length<=0 ?
              console.log(this.state.cart.length)
              :
              this.state.cart.map(function(item){
                return(
                  <li key={item._id}><b>Item Name:</b> {item.itemName},<br /><b>Item Quantity:</b> {item.itemQuantity},<br /><b>Item Price:</b> {item.itemPrice}</li>
                )
              })
            }
            </ul>
            </div>
          </div>

          <div className="col-lg-6">
          <div className="login">
           <div className="container">
             <div className="row">
               <div className="col-md-8 m-auto">
                 <h1 className="display-4 text-center">Shipping Information</h1>
                 <form onSubmit = {this.onSubmit}>
                   <div className="form-group">
                     <input
                     type="text"
                     className={classnames ('form-control form-control-lg')}
                     placeholder="Street Address"
                     name="street"
                     value = {this.state.street}
                     onChange = {this.onChange}
                     />

                   </div>
                   <div className="form-group">
                     <input
                     type="text"
                     className={classnames ('form-control form-control-lg')}
                     placeholder="City"
                     name="city"
                     value = {this.state.city}
                     onChange = {this.onChange}/>
                   </div>
                 </form>
                 <form onSubmit = {this.onSubmit}>
                   <div className="form-group">
                     <input
                     type="text"
                     className={classnames ('form-control form-control-lg')}
                     placeholder="Zipcode"
                     name="zipcode"
                     value = {this.state.zipcode}
                     onChange = {this.onChange}/>
                   </div>
                 </form>
                 <form onSubmit = {this.onSubmit}>
                   <div className="form-group">
                     <input
                     type="text"
                     className={classnames ('form-control form-control-lg')}
                     placeholder="State"
                     name="state"
                     value = {this.state.state}
                     onChange = {this.onChange}/>
                   </div>
                 </form>
               </div>
               <div>
               </div>
             </div>
           </div>
         </div>
          </div>
        </div>
        <h3>Cart Total: ${this.state.total}</h3>
        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>SUBMIT ORDER</button>
      </div>
    );
  }
}

Checkout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Checkout);
