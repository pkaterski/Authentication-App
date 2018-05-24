const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    User.findOne({ username: username }, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err; 
        callback(null, isMatch);
    });
}