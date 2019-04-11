const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const items = require('./routes/api/items');
const cart = require('./routes/api/cart');
const checkout = require('./routes/api/checkout');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/key').mongoURI;

//connect to mongodb
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/items', items);
app.use('/api/cart', cart);
app.use('/api/checkout', checkout);

const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server
