const {Schema, model} = require('mongoose');

const MessageSchema = new Schema(
    {
        conversationId:{
            type: String,
        },
        sender:{
            type: String
        },
        text:{
            type: String,
        },
        liked:{
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = model('Message', MessageSchema);