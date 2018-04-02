import { IUser, User } from './user.model';
export interface IBlog {
    _id: string;
    userId: string;
    author: IUser; // userId -- hidden
    authorName: string; // username of Owner -- displayed on the blog
    authorImage: string;
    blogId: string; // format: xxxxxx_nnn  x is a alphabet except underscore
    blogTitle: string; // article title max 80 char
    blogContent: string; // Full Article
    blogimageUrl: string; // optional -- for future
    blogGuidelinesHTML: string; // guidelines for the user
    excerptText: string;
    comments: IComment[];
    likes: ILikes[];
    totalLikes: number;
    socialMediaShares: ISocialMediaShare [];
    favorites: string[]; // userIds
    tags: string[];
    category: ICategory[];
    status: string;
    blogCreationDate: Date;
    scheduledActivationDate: Date;
    scheduledDeActivationDate: Date;
    getTotalLikes(): number;
    critics: ICritics[];
}

export class Blog implements IBlog {
  _id: string;
  userId: string;
  author: IUser; // userId -- hidden
  authorName: string; // username of Owner -- displayed on the blog
  authorImage: string;
  blogId: string; // format: xxxxxx_nnn  x is a alphabet except underscore
  blogTitle: string; // article title max 80 char
  blogContent: string; // Full Article
  blogimageUrl: string; // optional -- for future
  blogGuidelinesHTML: string; // guidelines for the user
  excerptText: string;
  comments: IComment[];
  likes: ILikes[];
  totalLikes: number;
  socialMediaShares: ISocialMediaShare [];
  favorites: string[]; // userIds
  tags: string[];
  category: ICategory[];

  status: string;
  blogCreationDate: Date;
  scheduledActivationDate: Date;
  scheduledDeActivationDate: Date;
  critics: ICritics[];


    constructor() {
        this.likes = [] ;
        this.socialMediaShares = [];
        this.favorites = [];
        this.scheduledActivationDate = new Date();
        const d = new Date() ;
        this.scheduledDeActivationDate = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
    }

  public getTotalLikes() {
    let total = 0;
    for(let like of this.likes) {
      total = total + like.likeDislike;
    }
    return total;
  }

}
export interface ISocialMediaShare {
    sharedOn: string; // twitter, facebook, google+ , linkedin etc.
    userId: string;
}

export class SocialMediaShare implements ISocialMediaShare {
    sharedOn: string; // twitter, facebook, google+ , linkedin etc.
    userId: string;
    constructor() {
    }
}

export interface ILikes {
    likeDislike: number; // -1, or 1
    userId: string;
}

export class Likes implements ILikes {
    likeDislike: number; // -1, or 1
    userId: string;
    constructor() {

    }
}

export interface IComment {
    message: string;
    timePosted: Date;
    user: string; // username displayed on the blog
    likes: ILikes[];
    totalLikes: number;
    // totalLikes: number; // future
    // totalDislikes: number;
    replies: IComment[];  //  reply or comment
}

export class Comment implements IComment {
    message: string;
    timePosted: Date;
    user: string; // userId
    likes: ILikes[];
    totalLikes: number;
    // totalLikes: number; // future
    // totalDislikes: number; // future
    replies: IComment[];  //  reply or comment
    constructor() {
        //
    }

}

export interface ICritics {
    criticContent: string;// [html , video,  images]
    timePosted: Date;
    owner: string; // userId
    blogTag: String[];
    replies: IComment[];  //  reply or comment
}

export class Critics implements ICritics {
    criticContent: string;
    timePosted: Date;
    owner: string; // userId
    blogTag: String[];
    replies: IComment[];  //  reply or comment
    constructor() {
        //
    }

}

export interface ICategory {
  categorykey: string;
  categoryValue: string;
  parentCategoryId: string;
  subCategories: ISubCategories[];
}

export class Category implements ICategory {
  categorykey: string;
  categoryValue: string;
  parentCategoryId: string;
  subCategories: ISubCategories[];
    constructor() {
        // this.key = data.key;
        // this.displayedValue = data.displayedValue;
        // this.parentCategoryId = data.parentCategoryId
    }

}

export interface ISubCategories {

}

export class SubCategories implements ISubCategories {

    constructor() {
        //
    }

}
