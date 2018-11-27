//Connect to Mongo database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

//Connect to local database url
//27017, default mongoDB port
const uri = 'mongodb://locahost:27017/spillor';

mongoose.connect(uri).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Mongo Connection has been initialized');
    },
    err =>{
        /** handle initial connection error */
        console.log('Mongo Connection has failed... Reason for failure: ');
        console.log(err);
    }
);

module.exports = mongoose.connection;