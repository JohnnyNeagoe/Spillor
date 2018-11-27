const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Defining userSchema
const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: false,
        required: true,
    }
});

//Define Schema methods
usersSchema.methods = {
    checkPassword: function (inputPassword){
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
};

//Define hooks for pre-saving
usersSchema.pre('save', function(next){
    if (!this.password){
        console.log('modules/users.js ============NO PASSWORD PROVIDED============')
        next()
    } else {
        console.log('models/user.js hashPassword in pre save');
        this.password = this.hashPassword(this.password);
        next();
    }
});


const Users = mongoose.model('Users', usersSchema);
module.exports = Users;