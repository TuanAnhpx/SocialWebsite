const mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.set('runValidators', true);

const TokenSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    email: String,
    token: String,
    expired: String
});

module.exports = mongoose.model("TokenSchema", TokenSchema)