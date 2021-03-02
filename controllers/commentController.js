const Comment = require('../database/models/Comment');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const SuccessResponse = require('../model/SuccessResponse');
const ErrorResponse = require('../model/ErrorResponse');

exports.getAllComment = asyncMiddleware(async (req, res, next) =>{
    const comments = await Comment.find();
    res.status(200).json(new SuccessResponse(200, posts));
});

exports.createNewComment = asyncMiddleware(async (req, res, next) =>{
    const {comment_desc, comment_pic, author_comment} = req.body;
    const newComment = new Comment({comment_desc, comment_pic, author_comment});
    const comment = await newComment.save();
    res.status(201).json(new SuccessResponse(201, comment));
});

exports.updateCommentById = asyncMiddleware(async (req, res, next) =>{
    const {commentId} = req.params;
    if(!commentId.trim()){
        return next(new ErrorResponse(400, "Comment is not found!"));
    }

    const updatedComment = await Comment.findOneAndUpdate(
        {_id : commentId},
        req.body,
        {new: true}
    );

    if(!updatedComment){
        return next(new ErrorResponse(400, "Can not update"));
    }
    res.status(200).json(new SuccessResponse(200, updatedComment));
});

exports.deleteCommentById = asyncMiddleware(async (req, res, next) =>{
    const {commentId} = req.params;
    if(!commentId.trim()){
        return next(new ErrorResponse(400, "Comment is not found!"));
    }

    const deletedComment = await Comment.findOneAndDelete(commentId);
    if(!deletedComment){
        return next(new ErrorResponse(400, "Can not delete!"));
    }
    res.status(200).json(new SuccessResponse(200, "Deleted !"))
})