const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'rajatduvedi.axovel@gmail.com',
    pass: 'rajatduvedi@xovel'
  }
});

module.exports = transport;
