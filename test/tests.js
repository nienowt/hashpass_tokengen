'use strict';

let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let expect = chai.expect;
let request = chai.request;
let User = require(__dirname + '/../models/user-model')
require(__dirname + '/../server')

describe('/user creation and login routes', ()=> {
  after((done) =>{
    User.remove({}, (err, users) => {
      console.log('users cleared')
      done();
    });
  });
  it('should log new user on post to /users/new', (done) => {
    request('localhost:3000')
    .post('/users/new')
    .auth('pepper','password')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('User Saved');
      done()
    });
  });
  it('should respond to valid password at /users/login with new token', (done) => {
    request('localhost:3000')
    .post('/users/login')
    .auth('pepper','password')
    .end((err, res) => {
      let token =JSON.parse(res.text);
      expect(err).to.eql(null);
      expect(token).to.be.an('object')
      expect(token.token.length).to.eql(148)
      done();
    });
  });
  it('should remove users if password valid', (done) => {
    request('localhost:3000')
    .post('/users/delete')
    .auth('pepper','password')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('User Removed');
      done();
    });
  });
});
