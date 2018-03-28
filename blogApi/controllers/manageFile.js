var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    if(path.extname(file.originalname) === '.jpg' || path.extname(file.originalname) === '.jpeg' || path.extname(file.originalname) === '.png') {
      callback(null, './private/assets/images');
    }else if(path.extname(file.originalname) === '.pdf') {
      callback(null, './private/assets/pdf');
    }else if(path.extname(file.originalname) === '.zip') {
      callback(null, './private/assets/zip');
    }else if(path.extname(file.originalname) === '.mp4'){
      callback(null, './private/assets/video');
    }
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

module.exports = {
  uploadBlogImage: uploadBlogImage,
}

function uploadBlogImage(req, res, next) {
  var upload = multer({
    storage: storage,
  }).single('blogImage');
  upload(req, res, function(err) {
    if(err) {
      console.log(err);
      return next(err);
    }
    console.log(req.file.path);
    res.status(200)
      .json({"message": "file uploaded successfully", "path": req.file.path})
  });
}
