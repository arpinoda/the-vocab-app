module.exports = function () {
    if (process.env.NODE_ENV === 'production') {
    
    } else if (process.env.NODE_ENV === 'ci') {
    
    } else {
        require('dotenv').config();
    }

    require('./dbConfig')();
}