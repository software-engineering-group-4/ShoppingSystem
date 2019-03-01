const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); 

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');


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

app.get('/', (req, res) => res.send('Hello'));

//Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));