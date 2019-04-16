const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Item = require('../../models/Item');
const Category = require('../../models/Category');
// const Profile = require('../../models/Profile');



// Load Input Validation
const validateItemInput = require('../../validation/item');

// @route   GET api/items/test
// @desc    Tests items route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Items Works' }));


// @route DELETE api/items/item_id
// @desc Delete item

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  Item.findOneAndDelete({ _id: req.params.id })
  .then(() => {
    res.json({success: true})
  })
  .catch(err => res.status(404).json(err))
})

// @route   Get api/items/images
// @desc    Get item images
// @access  Public

router.get('/images', function(req, res){

    const imgFolder = __dirname + '/images/';
    // REQUIRE FILE SYSTEM
    const fs = require('fs');
    //READ ALL FILES IN THE DIRECTORY
    fs.readdir(imgFolder, function(err, files){
      if(err){
        return console.error(err);
      }
      //CREATE AN EMPTY ARRAY
      const filesArr = [];
      // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
      files.forEach(function(file){
        filesArr.push({name: file});
      });
      // SEND THE JSON RESPONSE WITH THE ARARY
      res.json(filesArr);
    })
  })


// @route   GET api/items/categories
// @desc    Get categories
// @access  Public
router.get('/categories', (req, res) => {
  console.log('get Categories backend');
  Category.find()
    .sort({ date: -1 })
    .then(categories => {
      console.log("after getting back");
      console.log(categories);
      res.json(categories);
    })
    .catch(err =>
      res.status(404).json({ nocategoriesfound: 'No categories found' })
    );
});

// @route   GET api/items
// @desc    Get items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => {
      res.json(items);
    })
    .catch(err => res.status(404).json({ noitemsfound: 'No items found' }));
});

// @route   GET api/items/:id
// @desc    Get item by id
// @access  Public
router.get('/:id', (req, res) => {
  // console.log('get with', req.params.id);

  // console.log('get with certain ID', req.params.id);

  Item.find({ _id: req.params.id })
    .then(items => {
      console.log(items);
      res.json(items);
    })
    .catch(err =>
      res.status(404).json({ noitemfound: 'No item found with that ID' })
    );
});

// @route   POST api/items/create
// @desc    Create item
// @access  Public
router.post('/create', (req, res) => {
  console.log('add item api');
  const { errors, isValid } = validateItemInput(req.body);

  // Check Validation
  if (!isValid) {
    console.log('item is invalid');
    return res.status(400).json(errors);
  }

  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    category: req.body.category,
    value: req.body.value
  });

  newItem.save().then(item => res.json(item));
});




module.exports = router;
