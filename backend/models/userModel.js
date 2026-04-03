const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        minLength: [5, "username must be atleast 3 chars long"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email must be unique"],
        trim: true,
        match: [
      /^\S+@\S+\.\S+$/,
      "Please use a valid email address"
    ]
    },
    password: {
        type: String,
        select: false,
        required: [function() {return !this.googleId}, "password is required"],
        trim: true,
        minLength: [6, "password must be atleast 6 characters"]
    },
    googleId: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);