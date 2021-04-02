const mongoose = require('mongoose');
const Word = mongoose.model('Word');

module.exports = {

    createWord: async function(req, res) {
        let word = req.body.word;
        let user = req.user;
               
            const userExistingWord = await Word.find({ user: user.id, value: word });
            
            if (userExistingWord.length === 0) {
                // Does not exist, create new word
                let newWord = new Word({
                    value: word,
                    user: user.id,
                });
                
                newWord = await newWord.save();

                return res.json(newWord);
            } else {
                res.status(403).send(`Save failed. ${word} already exists`);
            }
        
    },

    deleteWord: async function(req, res) {
        let { id } = req.body;
        
        let result = await Word.findByIdAndDelete(id);
        
        res.json(result);
    },

    getAllWords: async function(req, res) {
        const words = await Word.find({ user : req.user.id });
        return res.json(words);
    },
}