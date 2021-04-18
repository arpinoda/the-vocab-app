const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    createUser: function({ googleId, displayName, photo }) {
        return new User({
            googleId,
            displayName,
            photo,
        }).save();
    },
    findById: function(id) {
        return User.findById(id);
    },
    findByGoogleId: function(googleId) {
        return User.findOne({ googleId: googleId });
    },
};
