const express = require('express');
const router = express.Router();
const Users = require('../database/models/users');
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log('New User Signing Up');

    const {username, password } = req.body;
    //ADD Validation
    Users.findOne({ username: username}, (err, users) => {
        if (err) {
            console.log('Posting Error, new user cannot be recorded in database: ', err)
        } 
        else if (users) {
            res.json({
                error: `${username} Username Taken`
            });
        }
        else {
            const newUser = new Users({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            });
        }
    });
});

router.post(
    './login',
    function (req, res, next) {
        console.log('routes/users.js, login, req.body: ');
        console.log(req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('Login Successful', req.users);
        var userInfo = {
            username: req.users.username
        };
        res.send(userInfo);
    }
);

router.get('/', (req, res, next) => {
    console.log('======user!!======');
    console.log(req.users);
    if (req.users) {
        res.json({user: req.users})
    } else {
        res.json({ user: null});
    }
});

router.post('/logout', (req, res) => {
    if (req.users) {
        console.log(req.users);
        req.logout();
        res.send({ msg: 'logging out'})
    } else {
        res.send({msg: 'no user to logout'})
    }
});

module.exports = router;