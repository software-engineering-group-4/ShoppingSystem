const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CheckoutSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	cart: [{
		itemName: String,
		itemPrice: Number,
		itemQuantity: Number
	}],
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = Checkout = mongoose.model('checkout', CheckoutSchema)
