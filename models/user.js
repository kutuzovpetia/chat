const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    details: { type: String },
    imgUrl: { type: String }
});

module.exports = model('User', userSchema);