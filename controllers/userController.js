const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    createUser: function(googleId, name) {
        return new User({
            googleId: googleId,
            displayName: name,
        }).save();
    },
    findById: function(id) {
        return User.findById(id);
    },
    findByGoogleId: function(googleId) {
        return User.findOne({ googleId: googleId });
    },
};
