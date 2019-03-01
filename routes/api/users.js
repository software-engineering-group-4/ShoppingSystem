const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

//Load User model
const User = require('../../models/User');


// @route GET api/users/test
// @desc Tests user route
// @access Public
router.get('/test', (req, res) => res.json({msg: "User works"}));

// @route GET api/users/register
// @desc Register user
// access Public
router.post('/register', (req, res) => {


	User.findOne({ email: req.body.email })
	.then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => res.json(user))
						.catch(err => console.log(err))
				})
			})
		}
	})
});

module.exports = router;