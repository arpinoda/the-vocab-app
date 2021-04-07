module.exports = function (app) {
    require('dotenv').config();
    require('./dbConfig')();
    
    // When in production or ci, serve our react files from build folder.
    // When in dev, react files are served by React's dev server
    if (app && ['production', 'ci'].includes(process.env.NODE_ENV)) {
        const express = require('express');
        app.use(express.static('client/build'));

        const path = require('path');
        app.get('/', (req, res) => {
            res.sendFile(path.resolve('client', 'build', 'index.html'));
        });
    }
}