const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const Users = require('../database/models/users');

//Called on login, saved the id to session req.session.passport.users = {id: '..'}
passport.serializeUser((user, done) => {
    console.log('*** SerializeUser has been initiated, user: ');
    console.log(user);
    console.log('-------------');
    done(null, {_id: user._id});
});

//Attach user object to the request
passport.deserializeUser((id, done) => {
    console.log('*** DeserializeUser Initiated');
    Users.findOne(
        {
            _id: id 
        },
        'username',
        (err, user) => {
            console.log("*** DeserializeUser Completed, user: ");
            console.log(user);
            console.log('-------------');
            done(null, user)
        }    
    );
});

//User Strategies 
passport.use(LocalStrategy);

module.exports = passport;