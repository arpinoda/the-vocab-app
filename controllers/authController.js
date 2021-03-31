module.exports = {
    createSession: function(req, res, next) {
        res.send(200);
    },
    getCurrentSession: function(req, res, next) {
        res.send(req.user);
    },
}