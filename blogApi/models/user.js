var mongoose = require('../config/dbconnection');
var Schema = mongoose.Schema;

var user = Schema({
  name: String,
  email: { type: String, unique: true},
  token: String,
  phone: Number,
  register_type: String,
  identificationId:String,
  imageUrl: String,
  role:[],
  status: String,
  intrestedCategory: [{ type: String}],
})
var User = mongoose.model('User', user);
module.exports = User
