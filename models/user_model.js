var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    battletag: { type: String, required: true },
    displayRank: String,
    tankSR: Number,
    dpsSR: Number,
    supportSR: Number,
    profileImage: String
});

const User = mongoose.model('user', userSchema);
module.exports = User;