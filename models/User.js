const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');  //importing the dateFormat function

const UserSchema = ({
    username: {
        type: String,
        unique: true, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

//get user's friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;