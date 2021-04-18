const mongoose = require('mongoose');
const Word = mongoose.model('Word');
const dictionaryApi = require('../services/dictionaryApi');

const MAX_WORD_COUNT_PER_USER = 20;

module.exports = {

    createWord: async function(req, res, next) {
        const word = req.body.word;
        const user = req.user;
        let userWords;

        // Query all words created by this user
        try {
            userWords = await Word.find({ user: user.id });
        } catch(err) {
            res.status(500).send({ error: 'An error occurred, please try again'});
            return next(error);
        }

        // Ensure user has not exceeded max word count
        if (userWords.length === MAX_WORD_COUNT_PER_USER) {
            let message = `Doh! The max number of words you can have is ${MAX_WORD_COUNT_PER_USER}. ` +
                'Delete a word and try again!';
            return res.status(400).send({ error: message});
        }

        // Check if word already exists for this user
        const existingWord = userWords.find(w => w.value === word);
        if (existingWord) {
            const message = `"${word}" already exists. Save failed.`;
            return res.status(400).send({ error: message});
        }
        
        try {
            const response = await dictionaryApi.getEntry(word);

            // Check if the API returns an entry for this word
            if (response.status === 404) {
                const message = 'We couldn\'t find "' + word + '" in the dictionary. ' +
                'Plase check your spelling and try again.'; 
                return res.status(404).send({ error: message});
            } else {

                // Create the word & save to MongoDB
                let newWord = new Word({
                    value: word,
                    user: user.id,
                });
                
                try {
                    newWord = await newWord.save();
                    res.json(newWord);
                } catch (error) {
                    res.status(403).send({ error:`Save failed for ${word}`});
                    next(error);
                }
            }
        } catch (error) {
            res.status(403).send({ error:`Could not lookup entry for ${word} via api`});
            next(error);
        }        
    },

    deleteWord: async function(req, res) {
        const { id } = req.body;
        
        try {
            const result = await Word.findByIdAndDelete(id);
            res.json(result);
        } catch (error) {
            res.status(500).send({ error: 'An error occurred, please try again'});
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
            res.status(500).send({ error: 'An error occurred, please try again' });
            next(error);
        }
    },
}