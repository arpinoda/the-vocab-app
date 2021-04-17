import axios from 'axios'
import { endpoints } from './enums';

const { localStorage } = window;
const path = endpoints.DICTIONARY || null;

function getEntry(word) {

    const cachedString = getFromLocalStorage(word);

    if (cachedString) {
        return new Promise((resolve) => {
            let json = JSON.parse(cachedString);
            resolve(json);
        });
    } else {
        const url = `${path}/${word}`;
        const promise = axios.get(url)
            .then(res => {
                const json = transform(res.data);
                setToLocalStorage(word, JSON.stringify(json));
                return json;
            });
    
        return promise;
    }
}

const transform = (data) => {
    if (data.length === 0 ) {
        throw new Error('API data is empty');
    }

    let entry = data[0];
    let definition = '';
    let phoneticUrl = '';
    let phoneticText = '';
    let synonyms = [];

    let { phonetics, word, meanings } = entry;
    
    if (meanings.length > 0) {
        let { definitions } = meanings[0];

        if (definitions.length > 0) {
            ({ definition, synonyms } = definitions[0]);

            if (synonyms && synonyms.length > 0) {
                synonyms.sort((a, b) => a.length - b.length);
            }
        }
    }

    if (phonetics.length > 0) {
        phoneticText = phonetics[0].text;
        phoneticUrl = phonetics[0].audio;
    } 

    return {
        definition,
        word,
        phoneticUrl,
        phoneticText,
        synonyms,
    }
}

const getFromLocalStorage = (key) => localStorage.getItem(key);
const setToLocalStorage = (key, value) => localStorage.setItem(key, value);

export {
    getEntry,
};