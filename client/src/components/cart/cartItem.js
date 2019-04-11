import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Col , Row, Modal} from 'react-bootstrap';
import axios from 'axios';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
//import { Link } from 'react-router-dom';

class CartItem extends Component {
  state={
    showModal:false,
    modalPrice: this.props.item.itemPrice,
    modalQuantity: this.props.item.itemQuantity,
    modalError: false,
    showDeleteModal: false,
  }
  onClick = () =>{
    console.log(this.props.item.name)
    console.log(this.props.auth)
  }
  editCart = () =>{
    /*var array = [...this.props.auth.cart]
    let array1 = [...array,{"itemName":"Coke","itemPrice": 2, "itemQuantity": 3}]*/
    if(this.state.modalQuantity<1 || this.state.modalQuantity%1!==0){
      this.setState({
        modalError: true
      })
      console.log(this.state.modalQuantity)
    }
    else{
      this.setState({
        modalError: false
      })
      var purchase = {"customer":this.props.auth,"itemName":this.props.item.itemName,"itemQuantity":this.state.modalQuantity,"itemPrice":this.state.modalPrice}
      console.log(purchase)
      axios.post(`/api/cart/edit`, purchase)
      .then(res => {
        console.log(res.data)
      })
      window.location.reload(true);
    }
  }
  buy = () =>{
    this.setState({
      showModal:true
    })
  }
  handleClose = () =>{
    this.setState({
      showModal:false
    })
  }
  handleDeleteShow = () =>{
    this.setState({
      showDeleteModal: true
    })
  }
  handleDeleteClose = () =>{
    this.setState({
      showDeleteModal:false
    })
  }
  handleDelete = () =>{
    console.log(this.props.auth)
    console.log(this.props.item.itemName)
    axios.post('/api/cart/delete', {"customer":this.props.auth,"itemName":this.props.item.itemName})
    .then(res => {
      window.location.reload(true);
    })
  }
  handleQuantity = (e) =>{
    e.persist()
    this.setState({
      modalQuantity : e.target.value
    })
  }

  render() {
    const { item } = {...this.props};
    const {auth} = {...this.props};
    return (
      <div className="card card-body bg-light mb-4">

        <div className="row">
          <div className="col-lg-9 col-md-5 col-8">
            <h3>{item.itemName}</h3>

          </div>

          <div className="col-md-7 d-none d-md-block">
            <h5>Price: {item.itemPrice} </h5>
            <h5>Quantity: {item.itemQuantity} </h5>
            <h5>Total: ${item.itemPrice*item.itemQuantity}</h5>
            <button type="button" onClick={this.buy}>EDIT</button>
            <button type="button" onClick={this.handleDeleteShow}>DELETE</button>
          </div>

        </div>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Price: ${item.itemPrice}
            <br />Quantity:
            <input type="number" name="quantity" value={this.state.modalQuantity} onChange={this.handleQuantity} />
            <br />
            {
               (this.state.modalError === true) ? <div>Please enter a positive/whole integer quantity</div> : <br />
            }<p>Total: ${this.state.modalQuantity*item.itemPrice}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.editCart}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showDeleteModal} onHide={this.handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>{item.itemName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {item.itemName} from your cart?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );


  }
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default CartItem;
