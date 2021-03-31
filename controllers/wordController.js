module.exports = {
    getWords: function(req, res, next) {
        return res.status(200).send({ message: 'getWords()' });
    },
    createWord: function(req, res, next) {
        return res.status(200).send({ message: 'createWord()' });
    }
}