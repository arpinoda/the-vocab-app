import axios from 'axios';
import wrapPromise from './wrapPromise';
import { endpoints } from './enums';

const endpoint = endpoints.AUTH;

function getCurrentSession() {
    const path = `${endpoint}`;
    const promise = axios.get(path)
        .then(res => res.data);

    return wrapPromise(promise);
}

function doLocalLogin() {
    const path = `${endpoint}/local`;
    return axios.post(path)
        .then(res => res.data);
}

export {
    doLocalLogin,
    getCurrentSession,
}