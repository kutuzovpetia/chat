const {Schema, model} = require('mongoose');

const ConversationSchema = new Schema({
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            }
        ],
        favorite:{
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = model('Conversation', ConversationSchema);