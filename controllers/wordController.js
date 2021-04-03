const mongoose = require('mongoose');
const Word = mongoose.model('Word');

module.exports = {

    createWord: async function(req, res, next) {
        let word = req.body.word;
        let user = req.user;
        let userExistingWord;

        try {
            userExistingWord = await Word.find({ user: user.id, value: word });
        } catch (error) {
            res.status(500).send('An error occurred, please try again');
            return next(error);
        }
        
        if (userExistingWord.length === 0) {
            // Does not exist, create new word
            let newWord = new Word({
                value: word,
                user: user.id,
            });
            
            try {
                newWord = await newWord.save();
                res.json(newWord);
            } catch (error) {
                res.status(403).send(`Save failed for ${word}`);
                next(error);
            }
        } else {
            let message = `${word} already exists. Save failed`;
            res.status(400).send(message);
            next(new Error(message));
        }
        
    },

    deleteWord: async function(req, res) {
        let { id } = req.body;
        
        try {
            let result = await Word.findByIdAndDelete(id);
            res.json(result);
        } catch (error) {
            res.status(500).send('An error occurred, please try again');
            next(error);
        }
    },

    getAllWords: async function(req, res, next) {
        try {
            const words = await Word
                .find({ user : req.user.id })
                .cache({ key: req.user.id });

            res.json(words);
        } catch (error) {
            res.status(500).send('An error occurred, please try again');
            next(error);
        }
    },
}