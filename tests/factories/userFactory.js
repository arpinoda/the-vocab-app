const mongoose = require('mongoose');
const User = mongoose.model('User');

const randomName = require('../helpers/randomName');
const randomChars = require('../helpers/randomChars');

/**
 * Creates a User model containing randomized attributes -
 * displayName and googleId.
 * @returns {User} Mongoose User model
 */
module.exports = () => {
    return new User({
        displayName: randomName(),
        googleId: randomChars(21),
    }).save();
}