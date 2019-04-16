import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Col , Row, Modal} from 'react-bootstrap';
import axios from 'axios';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
//import { Link } from 'react-router-dom';

class ItemItem extends Component {
  state={
    showModal:false,
    modalPrice: this.props.item.value,
    modalQuantity: 0,
    modalError: false
  }
  onClick = () =>{
    console.log(this.props.item.name)
    console.log(this.props.auth)
  }
  addToCart = () =>{
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
      var purchase = {"customer":this.props.auth.email,"itemName":this.props.item.name,"itemQuantity":this.state.modalQuantity,"itemPrice":this.state.modalPrice}
      console.log(purchase)
      axios.post(`/api/cart/add`, purchase)
      .then(res => {
        console.log(res.data)
      })
      this.setState({
        showModal: false,
        modalQuantity: 0
      })
    }
  }

  delete = () => {

    axios.delete(`/api/items/${this.props.item._id}`)
    .then(res => {
      console.log(res.data)
      window.location.reload();
    })

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
            <h3>{item.name}</h3>
            <p>{item.description} </p>
            <button type="button" className="btn btn-primary" onClick={this.buy}>Buy</button>
            <button className="btn btn-danger" onClick={this.delete}>Delete</button>
          </div>

          <div className="col-md-7 d-none d-md-block">
            <h5>Value: {item.value} </h5>
          </div>

        </div>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Price: ${item.value}
            <br />Quantity:
            <input type="number" name="quantity" value={this.state.modalQuantity} onChange={this.handleQuantity} />
            <br />
            {
               (this.state.modalError === true) ? <div>Please enter a positive/whole integer quantity</div> : <br />
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addToCart}>
              Add To Cart
            </Button>
          </Modal.Footer>
        </Modal>

         <Col xs={5} sm={2}>
        <img src={this.props.item.images} responsive />
        </Col>
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
