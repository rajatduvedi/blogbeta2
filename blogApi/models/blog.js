var mongoose = require('../config/dbconnection');
var Schema = mongoose.Schema;

var blogCategorySchema = Schema({
 categorykey: { type: String, unique: true},
 categoryValue: String,
 subCategory: [{
    categorykey: { type: String, unique: true},
   categoryValue: String,
 }],
});

var blogSchema = Schema({
  userId: String,
  authorId: String, // userId -- hidden
  authorName: String, // username of Owner -- displayed on the blog
  authorImage: String,
  blogTitle: String, // article title max 80 char
  blogContent: String, // Full Article
  excerptText: String,
  blogimageUrl: String, // optional -- for future
  blogGuidelinesHTML: String, // guidelines for the user
  readingTime: String,
  blogCreationDate: Date,
  totalLikes: Number,
  comments: [{
    _id: false,
    message: String,
    timePosted: Date,
    owner: String,
    userProfileName: String,
    userAvatarUrl: String,
    totalLikes: Number,
    likes: [{
      _id: false,
      likeDislike: { type: Number, default: 0},
      userId: String
    }],
    replies: [{
      _id: false,
      message: String,
      timePosted: Date,
      owner: String,
      userProfileName: String,
      userAvatarUrl: String,
      totalLikes: Number,
      likes: [{
        _id: false,
        likeDislike: { type: Number, default: 0},
        userId: String
      }],
    }]
  }],
  likes: [{
    _id: false,
    likeDislike: { type: Number, default: 0},
    userId: String
  }],
  socialMediaShares: [{
    _id: false,
    sharedOn: String,
    userId: String
  }],
  favorites: [String], // userIds
  tags: [{
    name: String
  }],
  category: String,
  subCategory: String,
  status: String,
  scheduledActivationDate: Date,
  scheduledDeActivationDate: Date,
  // getTotalLikes(): number;
  critics: [{
    criticContent: String,// [html , video,  images]
    timePosted: Date,
    owner: String, // userId
    blogTag: [String],
    replies: [{
      _id: false,
      message: String,
      timePosted: Date,
      owner: String,
      userProfileName: String,
      userAvatarUrl: String
    }],
  }]
})

var BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
var Blog = mongoose.model('Blog', blogSchema);
module.exports = {
  BlogCategory: BlogCategory,
  Blog: Blog
}
