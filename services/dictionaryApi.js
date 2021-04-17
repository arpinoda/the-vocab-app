const fetch = require('node-fetch');

const PATH = 'https://api.dictionaryapi.dev/api/v2/entries/en_US';

module.exports = {
    getEntry: (word) => fetch(`${PATH}/${word}`),
};