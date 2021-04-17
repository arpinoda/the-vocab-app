const mongoose = require('mongoose');

function onDatabaseError(error) {
    console.log(`Unable to connect to mongo db - ${error}`);;
}

module.exports = function(){
    require('../models');
    require('../services/cache');

    mongoose.promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch(onDatabaseError);

    const db = mongoose.connection;

    db.on('error', onDatabaseError);
}