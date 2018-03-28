var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Local DB

mongoose.connect('mongodb://localhost:27017/BlogRj');


module.exports = mongoose;
