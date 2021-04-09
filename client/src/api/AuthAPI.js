import axios from 'axios';
import wrapPromise from './wrapPromise';
import { endpoints } from './enums';

const path = endpoints.AUTH;

function getCurrentSession() {
    const promise = axios.get(path)
        .then(res => res.data);

    return wrapPromise(promise);
}

export {
    getCurrentSession,
}