const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');  //importing the dateFormat function

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
     reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String, 
        required: true, 
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }    
});

const ThoughtSchema = ({
    thoughtText: {
        type: String, 
        required: true, 
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String, 
        required: true,
        reactions: [ReactionSchema]
    }
});

ReactionSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;