const mongoose = require('mongoose');
const User = require('../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

//chai.config.includeStack = true;
chai.use(chaiHttp);


//clear database before each test
describe('Users', () => {
	beforeEach((done) => {
		User.remove({}, (err) => {
			done();  
		});
	});


	describe('/POST register', () => {

		it('it should not create a user without email address', (done) => {
            let user = {
                name: "Admin",
				password: "123456",
				password2: "123456",
				userType: "Admin"
            }
             chai.request('http://localhost:5000')
              .post('/api/users/register')
              .send(user)
              .end((err, res) => {
              		(err === null).should.equal(true);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('Email is invalid');
                done();
              });

          });
		it('it should create a user', (done) => {
			let user = {
				name: "User",
				email: "user@gmail.com",
				password: "123456",
				password2: "123456",
				userType: "User"
			}
			chai.request('http://localhost:5000')
		//chai.request(server)
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
		})
	})	
	})

	
	describe('/POST login', () => {

		it('it should not login with wrong email', (done) => {
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

		it('it should login', (done) => {
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





