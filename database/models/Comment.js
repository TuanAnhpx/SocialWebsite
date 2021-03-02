const mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.set('runValidators', true);

const CommentSchema = new Schema({
    comment_desc:{
        type: String,
        required: [true, "Comment_desc is required!"]
    },
    comment_pic:{
        type : String
    },
    author_comment: {
        type: String
    }
},{
    timestamp: true,
});

module.exports = mongoose.model("CommentSchema", CommentSchema)