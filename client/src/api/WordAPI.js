import axios from 'axios'
import wrapPromise from './wrapPromise';
import { endpoints } from './enums';

let path = endpoints.WORD || null;

function createWord(word = null) {
    if (!word) return;
    
    const promise = axios.post(path, { word: word })
        .then(res => res.data);
    
    return promise;
}

function deleteWord(id) {
    if (!id) return;

    const promise = axios.delete(path, { data: {id : id } })
        .then(res => res.data);
    
    return promise;
}

function getWords() {
    const promise = axios.get(path)
        .then(res => res.data);

    // Wrapping will throw promise
    // This particular endpoint is called within Suspense
    return wrapPromise(promise);
}

export {
    createWord,
    deleteWord,
    getWords,
};