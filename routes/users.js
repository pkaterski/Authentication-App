const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const User = require('../models/user');

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            
            res.json({ success: false, msg: 'Failed to Register User.' });
        } else {
            res.json({ success: true, msg: 'Success - Register User.' });
        }
    });
});

router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, msg: 'No Such User' });
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800 // 1 week
                    });

                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        user: {
                            id: user._id,
                            name:  user.name,
                            username: user.username,
                            email: user.email
                        }
                    })
                } else {
                    res.json({ success: false, msg: 'Wrong Password' });
                }
            });
        }
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('PROFILE');
});

module.exports = router;