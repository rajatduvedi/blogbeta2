var express = require('express');
var router = express.Router();
// var mail = require('../service/send-mail');
var Blog = require('../models/blog');

module.exports = {
  createBlogCategory: createBlogCategory,
  getAllBlogCategory: getAllBlogCategory,
  getAllBlogCategoryById:getAllBlogCategoryById,
  createBlog: createBlog,
  getAllBlogs:getAllBlogs,
  getBlogById: getBlogById,
  getBlogBysubcategory: getBlogBysubcategory,
  getRecentBlog:getRecentBlog,
  getPopularBlog: getPopularBlog,
  deleteBlogById: deleteBlogById,
  getBlogBycategory:getBlogBycategory,
  getBlogByintrestedcategory:getBlogByintrestedcategory
}

  function createBlogCategory(req, res, next) {
    console.log(req.body);
    console.log(req.body.blogimageUrl);

    managePCategory = Blog.BlogCategory(req.body);
    if(req.body.parentCategoryId == 0) {
      managePCategory.save().then(newBlog => {
        return res.status(200)
          .json("category created");
      },err => {
        return next(err);
      });
    } else {
      manageCategory = Blog.BlogCategory;
      manageCategory.findOneAndUpdate({_id: req.body.parentCategoryId}, {$push: {subCategory: req.body}},{new: true}).then( doc =>{
        return res.status(200)
          .json(doc);
      },err => {
        return next(err);
      });
    }
  }

  function getAllBlogCategory(req, res, next) {
    // console.log()
    blogCategory = Blog.BlogCategory;
    blogCategory.find().exec(function(err, blogCategories) {
      if(err) {
        return next(err);
      }
      if(blogCategories) {
        return res.status(200)
          .json(blogCategories);
      }else {
        return res.status(404)
          .json({message: "Sorry there is no category"});
      }
    });
  }

  function getAllBlogCategoryById(req, res, next) {
    // console.log()
    console.log(req.query);
    console.log(req.query.id.length);
    blogCategory = Blog.BlogCategory;
    for($i = 0; $i<req.query.id.length; $i++) {
      CallBackCategory(req.query.id[$i]);
  }
  }

  function CallBackCategory(id) {
    console.log(id);
    blogCategory.find().exec(function(err, blogCategories) {
      if(err) {
        return next(err);
      }
      if(blogCategories) {
        return res.status(200)
          .json(blogCategories);
      }else {
        return res.status(404)
          .json({message: "Sorry there is no category"});
      }
    });
  }

  function createBlog(req, res, next){
    // blog = Blog.Blog;
    blog = Blog.Blog;
    console.log(req.body._id);
      blog.findOne({_id: req.body._id}).then(blogDoc => {
        if(blogDoc) {
          blog.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}).then(doc => {
            return res.status(200)
              .json(doc);
          },err => {
            return next(err);
          });
        }else {
          newBlog = new Blog.Blog(req.body);
          newBlog.blogCreationDate = new Date();
          newBlog.save().then(newBlog => {
            return res.status(200)
              .json(newBlog);
          },err => {
            return next(err);
          });
        }
      });
    // }
    // else{
    //   newBlog = new Blog.Blog(req.body);
    //   newBlog.blogCreationDate = new Date();
    //   newBlog.save().then(newBlog => {
    //     return res.status(200)
    //       .json(newBlog);
    //   },err => {
    //     return next(err);
    //   });
    // }
  }

  function getAllBlogs(req, res, next){
    blog = Blog.Blog;
    blog.find().populate('author').exec(function(err, blogDoc) {
      if(err) {
        return next(err);
      }
      if(blogDoc) {
        console.log(blogDoc)
        return res.status(200)
          .json(blogDoc);
      }else {
        return res.status(404)
          .json({message: "Sorry there is no Blog"});
      }
    })
  }

  function getBlogById(req, res, next) {
    blog = Blog.Blog;
    console.log(req.params);

    blog.findOne({_id: req.params.blogId}).populate('author').populate('comments.user').then(blogDoc => {
      if(blogDoc) {
        console.log(blogDoc)
        return res.status(200)
          .json(blogDoc);
      } else {
        return res.status(404)
          .json({message: "Sorry there is no Blog"});
      }
    })
  }


    function getBlogBysubcategory(req, res, next) {
      blog = Blog.Blog;
      console.log(req.params);
      console.log(req.params.subCategoryKey);
      var limit = 6;
      var index = req.params.index;
      blog.find({ category: req.params.category,subCategory: req.params.subCategory}).skip(limit*index).limit(limit).then(blogDoc => {
        if(blogDoc) {
          return res.status(200)
            .json(blogDoc);
        } else {
          return res.status(404)
            .json({message: "Sorry there is no Blog"});
        }
      })
    }

    function getBlogByintrestedcategory(req, res, next) {
      blog = Blog.Blog;
      console.log(req.params);
      console.log(req.params.id);
      var limit = 6;
      var index = req.params.index;
      blog.find({subCategory: req.params.id}).populate('author').skip(limit*index).limit(limit).then(blogDoc => {
        if(blogDoc) {
          return res.status(200)
            .json(blogDoc);
        } else {
          return res.status(404)
            .json({message: "Sorry there is no Blog"});
        }
      })
    }
  function getRecentBlog(req, res, next) {
    blog = Blog.Blog;
    var limit = 6;
    var index = req.params.index;
    blog.find().populate('author').skip(limit*index).limit(limit).sort({blogCreationDate: 'desc'}).exec(function(err, blogDoc) {
      if(err) {
        return next(err);
      }
      if(blogDoc) {
        return res.status(200)
          .json(blogDoc);
      }else {
        return res.status(404)
          .json({message: "Sorry there is no Blog"});
      }
    })
  }

  function getPopularBlog(req, res, next) {
    blog = Blog.Blog;
    var limit = 6;
    var index = req.params.index;
    blog.find().skip(limit*index).populate('author').limit(limit).sort({totalLikes: 'desc', comments: 'desc'}).exec(function(err, blogDoc) {
      if(err) {
        return next(err);
      }
      if(blogDoc) {
        return res.status(200)
          .json(blogDoc);
      }else {
        return res.status(404)
          .json({message: "Sorry there is no Blog"});
      }
    })
  }

  function getBlogBycategory(req, res, next){
    blog = Blog.Blog;
    console.log(req.params);
    var limit = 6;
    var index = req.params.index;
    blog.find({ category: req.params.category}).populate('author').skip(limit*index).limit(limit).then(blogDoc => {
      if(blogDoc) {
        return res.status(200)
          .json(blogDoc);
      } else {
        return res.status(404)
          .json({message: "Sorry there is no Blog"});
      }
    })
  }

  function deleteBlogById(req, res, next){
    blog = Blog.Blog;
    console.log(req.body.data);
    blog.findOne({_id: req.body._id})
      .exec(function(error, blogData){
        if(error) {
          console.log(error);
          return next(error);
        }
        if(blogData){
          blog.findOneAndRemove({_id: req.body._id}).then((doc) => {
            console.log(doc);
            return res.status(200)
              .json(doc);
          },
          (err) => {
            console.log(err);
            return next(err)
          });
        }
        else {
          return res.status(404)
           .json({"message": "Blog not found"});
        }
      });
  }

  function deleteCategory(req, res, next){
    blog = Blog.Blog;

  }
