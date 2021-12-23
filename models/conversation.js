const {Schema, model} = require('mongoose');

const ConversationSchema = new Schema({
        members:{
            type: Array,
        },
        favorite:{
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = model('Conversation', ConversationSchema);