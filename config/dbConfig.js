const mongoose = require('mongoose');

function onDatabaseError() {
    console.log('Unable to connect to mongo db');
}

module.exports = function(){
    require('../models');

    mongoose.promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', onDatabaseError);
}