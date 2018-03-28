var transport = require('../config/transport-mail');

function sendWelcomeMail(fromMail, toMail, callback) {

    let mailOptions = {
      from: fromMail, // sender address
      to: toMail, // list of receivers
      subject: 'Email From rj', // Subject line
      html: '<b>hellooo user <button>alert</button></b>'
    };

    console.log(mailOptions)

    // send mail with defined transport object
    transport.sendMail(mailOptions, (error, info) => {
      callback(error, info);
    });
}

module.exports = {
  sendWelcomeMail: sendWelcomeMail
}
