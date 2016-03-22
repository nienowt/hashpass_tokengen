'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: String,
  Access: {type: Number, default: 0}
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  console.log(this.password);
  next();
});

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, 'CHANGE ME');
};

// let User = mongoose.model('users', userSchema);
// module.exports = User;
module.exports = mongoose.model('users', userSchema);
