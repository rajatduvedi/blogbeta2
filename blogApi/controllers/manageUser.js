var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = {
  register: register,
  loginUser: loginUser,
  updateUser: updateUser,
  getUserById: getUserById
}

  function register(req, res, next) {
    console.log(req.body)
    console.log('reg')
    var data = req.body
    data.role = ['reader']
    console.log(data)
    var user = new User({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      register_type: data.register_type,
      identificationId: data.identificationId,
      imageUrl: data.imageUrl,
      role: data.role,
      token: data.token
    })
    user.save().then(u => {
      console.log(u)
      return res.status(200)
        .json(u);
    },err => {
      console.log(err)
      return next(err);
    });
  }

  function loginUser (req, res, next) {
    console.log(req.body)
    console.log('login')
    var data = req.body
    console.log(data)
    if (data.register_type === 'mail') {
      User.findOne({identificationId: data.identificationId}).then(u => {
        // console.log(u)
        // console.log("u")
        return res.status(200)
          .json(u);
      },err => {
        console.log(err)
        return next(err);
      });
    }
  }
  function updateUser (req, res, next) {
    console.log(req.body)
    console.log('reg')
    var data = req.body
    console.log(data)
    if (data.register_type === 'mail') {
      User.findOneAndUpdate({_id: data.id},
            {
              // $set: {
              $push: {intrestedCategory: { $each: data.ids }}
            //  }
            },
     { new: true }).then(u => {
        console.log(u)
        return res.status(200)
          .json(u);
      },err => {
        console.log(err)
        return next(err);
      });
    }
  }


  function getUserById(req, res, next) {
    console.log(req.params);

    User.findOne({_id: req.params.id}).then(userDoc => {
      if(userDoc) {
        return res.status(200)
          .json(userDoc);
      } else {
        return res.status(404)
          .json({message: "Sorry there is no Blog"});
      }
    })
  }
