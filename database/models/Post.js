const mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.set('runValidators', true);

const PostSchema = new Schema({
    post_desc:{
        type: String,
        required: [true, "Post_desc is required!"]
    },
    post_pic:{
        type : String
    },
    author_post: {
        type: String
    }
},{
    timestamp: true,
});

module.exports = mongoose.model("PostSchema", PostSchema)