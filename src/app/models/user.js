const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const outlaySchema = new mongoose.Schema({
  local:{
    reference: String,
    value: Number
  },
});

const userSchema = new mongoose.Schema({
  local:{
    email: String,
    password: String,
    outlay : [outlaySchema]
  },
});

userSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model('user', userSchema);
