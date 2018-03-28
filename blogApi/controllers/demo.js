var express = require('express');
var router = express.Router();
var mail = require('../service/send-mail');

module.exports = {
  subscribeMail: subscribeMail,
}

 function subscribeMail(req, res, next) {
   console.log(req.body);
   mail.sendWelcomeMail('rajatduvedi.axovel@gmail.com', req.body.email, function(err, info) {
     if(err) return next(err);
     return res.status(200)
       .json({message: "Registered successfully!"});
   });
 }
