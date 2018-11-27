const Users = require('../database/models/users');
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
    {
        usernameFiled: 'username' // not necessary, DEFAULT
    },
    function(username, password, done){
        Users.findOne({ username: username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: "Username incorrect, please enter a valid username"})
            }
            if (!user.checkPassword(password)){
                return done(null, false, {message: "The password you entered is incorrect, please enter the correct password."})
            }
            return done(null, user);
        })
    }
)

module.exports = strategy