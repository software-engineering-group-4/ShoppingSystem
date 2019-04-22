const mongoose = require('mongoose');
const User = require('../models/User');
const Item = require('../models/Item');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const validateItemInput = require('../validation/item');
const validateCheckoutInput = require('../validation/checkout');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//chai.config.includeStack = true;
chai.use(chaiHttp);

//clear database before each test
describe('Users', () => {
  before((done) => {
    User.remove({}, (err) => {
      done();
    });
  });


  describe('Register User', () => {

    it('should not create a user without email address', () => {
      let user = {
        name: "Admin",
        password: "123456",
        password2: "123456",
        userType: "Admin"
      }
      const { errors, isValid } = validateRegisterInput(user);
      errors.should.have.property('email');
    });

    it('should not create a user without password', () => {
      let user = {
        name: "Admin",
        email: "bad@gmail.com",
        password2: "123456",
        userType: "Admin"
      }
      const { errors, isValid } = validateRegisterInput(user);
      errors.should.have.property('password');
    });

    it('should not create a user without password verification', () => {
      let user = {
        name: "Admin",
        email: "bad@gmail.com",
        password: "123456",
        userType: "Admin"
      }
      const { errors, isValid } = validateRegisterInput(user);
      errors.should.have.property('password2');
    });

    it('should not create a user if passwords do not match', () => {
      let user = {
        name: "Admin",
        email: "bad@gmail.com",
        password: "123456",
        password2: "583948",
        userType: "Admin"
      }
      const { errors, isValid } = validateRegisterInput(user);
      errors.should.have.property('password2');
    });

    it('should not create a user without name', () => {
      let user = {
        name: "",
        email: "bad@gmail.com",
        password: "123456",
        password2: "123456",
        userType: "Admin"
      }
      const { errors, isValid } = validateRegisterInput(user);
      errors.should.have.property('name');
    });

    it('should not create a if password is too short', () => {
      let user = {
        name: "User",
        email: "user@gmail.com",
        password: "123",
        password2: "123",
        userType: "User"
      }
      const { errors, isValid } = validateRegisterInput(user);
      errors.should.have.property('password');
    });

    it('should create a user', (done) => {
      let user = {
        name: "User",
        email: "user@gmail.com",
        password: "123456",
        password2: "123456",
        userType: "User"
      }
      chai.request('http://localhost:5000')
      .post('/api/users/register')
      .send(user)
      .end((err, res) => {
        (err === null).should.equal(true);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.should.have.property('userType');
        done();
      });
    });
  });


  describe('Login', () => {
    it('should not login with wrong email', (done) => {
      let user = {
        email: "WrongEmail@gmail.com",
        password: "WrongPassword",
      }
      chai.request('http://localhost:5000')
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        (err === null).should.equal(true);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('email').eql('User not found');
        done();
      });
    });

    it('should throw error for invalid email', () => {
      let user = {
        email: "asdf",
        password: "WrongPassword",
      }
      const { errors, isValid } = validateLoginInput(user);
      errors.should.have.property('email').eql('Email is invalid');
    });


    it('should login', (done) => {
      let user = {
        email: "admin@gmail.com",
        password: "123456",
      }
      chai.request('http://localhost:5000')
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        (err === null).should.equal(true);
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
    });
  })
})


describe('Grocery Items', () => {
  before((done) => {
    Item.remove({}, (err) => {
      done();
    });
  });


  it('should respond', (done) => {
    chai.request('http://localhost:5000')
    .get('/api/items/test')
    .end((err, res) => {
      (err === null).should.equal(true);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('msg').eql('Items Works');
      done();
    });
  });

  describe('Add Item', () => {
    it('should add item', (done) => {
      const newItem = new Item({
        name: "Test Item",
        description: "It's a test",
        images: null,
        category: "Vegetable",
        value: 2
      });

      chai.request('http://localhost:5000')
      .post('/api/items/create')
      .send(newItem)
      .end((err, res) => {
        (err === null).should.equal(true);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql(newItem.name);
        res.body.should.have.property('description').eql(newItem.description);
        res.body.should.have.property('images').eql(newItem.images);
        res.body.should.have.property('category').eql(newItem.category);
        res.body.should.have.property('value').eql(newItem.value);
        
        chai.request('http://localhost:5000')
        .get('/api/items/')
        .end((err, res) => {
           res.should.have.status(200);
           res.body.should.be.a('array');
           res.body.should.have.length(1);
           done();
        });
      });
    });

    it('should contain categories', (done) => {
      chai.request('http://localhost:5000')
      .get('/api/items/categories')
      .end((err, res) => {
        (err === null).should.equal(true);
        res.body.should.be.a('array');
        res.body.should.not.have.length(0);
        done();
      });
    });

    it('passes acceptable item', () => {
      const newItem = new Item({
        name: "Test Item",
        description: "It's a test",
        images: null,
        category: "Vegetable",
        value: 2
      });

      const { errors, isValid } = validateItemInput(newItem);
      isValid.should.equal(true);
    });

    it('throws error if name is blank', () => {
      const newItem = new Item({
        name: "",
        description: "It's a test",
        images: null,
        category: "Vegetable",
        value: 2
      });

      const { errors, isValid } = validateItemInput(newItem);
      isValid.should.equal(false);
      errors.should.have.property('name').eql('Name field is required');
    });

    it('throws error if description is blank', () => {
      const newItem = new Item({
        name: "Test Item",
        description: "",
        images: null,
        category: "Vegetable",
        value: 2
      });

      const { errors, isValid } = validateItemInput(newItem);
      isValid.should.equal(false);
      errors.should.have.property('description').eql('Description field is required');
    });

    it('throws error if category is blank', () => {
      const newItem = new Item({
        name: "Test Item",
        description: "It's a test",
        images: null,
        category: "",
        value: 2
      });

      const { errors, isValid } = validateItemInput(newItem);
      isValid.should.equal(false);
      errors.should.have.property('category').eql('Category field is required');
    });

    it('throws error if value is negative', () => {
      const newItem = new Item({
        name: "Test Item",
        description: "It's a test",
        images: null,
        category: "Vegetable",
        value: -2
      });

      const { errors, isValid } = validateItemInput(newItem);
      isValid.should.equal(false);
      errors.should.have.property('value').eql('Value must be nonnegative');
    });
  });


  var validItem;

  describe('Get Items', () => {
    it('should get items', (done) => {
      chai.request('http://localhost:5000')
      .get('/api/items/')
      .end((err, res) => {
		    (err === null).should.equal(true);
        res.should.have.status(200);
		    res.body.should.be.a('array');
		    res.body.should.not.have.length(0);
		    validItem = res.body[0];
        done();
      });
    });
  });



  describe('Delete Item', () => {
	  it('should delete valid item', (done) => {
	  	chai.request('http://localhost:5000')
	  	.delete(`/api/items/${validItem._id}`)
	  	.end((err, res) => {
        (err === null).should.equal(true);
        res.should.have.status(200);

        chai.request('http://localhost:5000')
        .get('/api/items/')
        .end((err, res) => {
          res.body.should.have.length(0);
          done();
        });
	  	});
	  });
  });
});




// describe('Cart', () => {
//   before((done) => {
//     const newItem = new Item({
//       name: "Test Item",
//       description: "It's a test",
//       images: null,
//       category: "Vegetable",
//       value: 2
//     });

//     chai.request('http://localhost:5000')
//     .post('/api/items/create')
//     .send(newItem)
//     .end((err, res) => {
//       res.should.have.status(200);
//       done();
//     });
//   });

//   describe('Add to Cart', () => {
//     it('should add valid item', (done) => {
//       const purchase = {'customer': 'user@gmail.com', 'itemName': 'Test Item', 'itemQuantity': 2, 'itemPrice': 2 };

//       chai.request('http://localhost:5000')
//       .post('/api/cart/add')
//       .send(purchase)
//       .end((err, res) => {
//         (err === null).should.equal(true);
//         res.should.have.status(200);
//         done();
//       });
//     });

//     it('should error when adding to cart of invalid customer', (done) => {
//       var purchase = {'customer': 'invalid@gmail.com', 'itemName': 'Test Item', 'itemQuantity': 2, 'itemPrice': 4 };

//       chai.request('http://localhost:5000')
//       .post('/api/cart/add')
//       .send(purchase)
//       .end((err, res) => {
//         (err === null).should.equal(false);
//         done();
//       });
//     });
//   });


//   describe('View Cart', () => {
//     it('should get items in cart', (done) => {
//       chai.request('http://localhost:5000')
//       .get('/api/cart/getCart')
//       .send({'customer': 'user@gmail.com'})
//       .end((err, res) => {
//         (err === null).should.equal(true);
//         res.body.should.be.a('object');
//         done();
//       });
//     });
//   });


//   describe('Delete from Cart', () => {
//     it('should remove valid item from cart', (done) => {
//       let customer = { "customer": 'admin@gmail.com', "itemName": 'Test Item' };

//       chai.request('http://localhost:5000')
//       .post('/api/cart/delete')
//       .send(customer)
//       .end((err, res) => {
//         (err === null).should.equal(true);
//         done();
//       });
//     });

//     it('should error when removing item not in cart', (done) => {
//       let customer = { "customer": 'admin@gmail.com', "itemName": 'invalid' };

//       chai.request('http://localhost:5000')
//       .post('/api/cart/delete')
//       .send(customer)
//       .end((err, res) => {
//         (err === null).should.equal(false);
//         done();
//       });
//     });
//   });
// });


describe('Checkout', () => {
  it('should accept valid checkout', () => {
    let checkout = {
      email: 'customer@gmail.com',
      city: 'Atlanta',
      state: 'GA',
      street: '1234 Gilmer St',
      zipcode: '30303'
    }

    const { errors, isValid } = validateCheckoutInput(checkout)
    isValid.should.equal(true);
  });

  it('should error if city is empty', () => {
    let checkout = {
      email: 'customer@gmail.com',
      city: '',
      state: 'GA',
      street: '1234 Gilmer St',
      zipcode: '30303'
    }

    const { errors, isValid } = validateCheckoutInput(checkout)
    isValid.should.equal(false);
    errors.should.have.property('city');

  });

  it('should error if state is empty', () => {
    let checkout = {
      email: 'customer@gmail.com',
      city: 'Atlanta',
      state: '',
      street: '1234 Gilmer St',
      zipcode: '30303'
    }

    const { errors, isValid } = validateCheckoutInput(checkout)
    isValid.should.equal(false);
    errors.should.have.property('state');
  });

  it('should error if street is empty', () => {
    let checkout = {
      email: 'customer@gmail.com',
      city: 'Atlanta',
      state: 'GA',
      street: '',
      zipcode: '30303'
    }

    const { errors, isValid } = validateCheckoutInput(checkout)
    isValid.should.equal(false);
    errors.should.have.property('street');
  });

  it('should error if zipcode is empty', () => {
    let checkout = {
      email: 'customer@gmail.com',
      city: 'Atlanta',
      state: 'GA',
      street: '1234 Gilmer St',
      zipcode: ''
    }

    const { errors, isValid } = validateCheckoutInput(checkout)
    isValid.should.equal(false);
    errors.should.have.property('zipcode');
  });

  it('should error if zipcode is not a number', () => {
    let checkout = {
      email: 'customer@gmail.com',
      city: 'Atlanta',
      state: 'GA',
      street: '1234 Gilmer St',
      zipcode: 'asdf'
    }

    const { errors, isValid } = validateCheckoutInput(checkout)
    isValid.should.equal(false);
    errors.should.have.property('zipcode');
  });
});
