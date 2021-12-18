const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    details: { type: String, required: true },
    phoneOrEmail: { type: String, required: true },
    password: {type: String, required: true}
});

module.exports = model('User', userSchema);