var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Local DB

mongoose.connect('mongodb://alteensaka:shikaibai24@ds231749.mlab.com:31749/alteensaka-blog');


module.exports = mongoose;
