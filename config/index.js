if (process.env.NODE_ENV === 'production') {

} else if (process.env.NODE_ENV === 'ci') {

} else {
    module.exports = require('dotenv').config();
}