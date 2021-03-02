const Post = require('../database/models/Post');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const SuccessResponse = require('../model/SuccessResponse');
const ErrorResponse = require('../model/ErrorResponse');

exports.getAllPost = asyncMiddleware(async (req, res, next) =>{
    const posts = await Post.find();
    res.status(200).json(new SuccessResponse(200, posts));
});

exports.createNewPost = asyncMiddleware(async (req, res, next) =>{
    const {post_desc, post_pic, author_post} = req.body;
    const newPost = new Post({post_desc, post_pic, author_post});
    const post = await newPost.save();
    res.status(201).json(new SuccessResponse(201, post));
});

exports.updatePostById = asyncMiddleware(async (req, res, next) =>{
    const {postId} = req.params;
    if(!postId.trim()){
        return next(new ErrorResponse(400, "Post is not found!"));
    }

    const updatedPost = await Post.findOneAndUpdate(
        {_id : postId},
        req.body,
        {new: true}
    );

    if(!updatedPost){
        return next(new ErrorResponse(400, "Can not update"));
    }
    res.status(200).json(new SuccessResponse(200, updatedPost));
});

exports.deletePostById = asyncMiddleware(async (req, res, next) =>{
    const {postId} = req.params;
    if(!postId.trim()){
        return next(new ErrorResponse(400, "Post is not found!"));
    }

    const deletedPost = await Post.findOneAndDelete(postId);
    if(!deletedPost){
        return next(new ErrorResponse(400, "Can not delete!"));
    }
    res.status(200).json(new SuccessResponse(200, "Deleted !"))
})