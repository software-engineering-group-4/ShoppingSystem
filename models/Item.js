const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({

  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  
});

module.exports = Item = mongoose.model('items', ItemSchema);
