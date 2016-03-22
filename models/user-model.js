'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [21, 'Password max length: 21 characters']
  },
  Access: {type: Number, default: 0}
});



userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, 'CHANGE ME');
};


module.exports = mongoose.model('users', userSchema);
