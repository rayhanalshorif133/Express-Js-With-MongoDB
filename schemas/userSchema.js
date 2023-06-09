const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo',
            }
        ]


    }
);

// make a json for insert user


module.exports = userSchema;

