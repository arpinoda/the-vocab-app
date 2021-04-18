import axios from 'axios';

/**
 * Intercepts Axios responses and updates relevant App state
 */
class AxiosResponseInterceptor {
    constructor(handlers = []) {
        this.handlers = handlers;
        this.dispatch = null;
        axios.interceptors.response.use(this.updateAppState.bind(this));
    }

    register(handler) {
        this.handlers.push(handler);
    }

    updateDispatch(newValue) {
        this.dispatch = newValue;
    }

    updateAppState(response) {
        const { method, url } = response.config;
        const { data } = response;
        
        // Find any handler(s) with matching HTTP verb & endpoint
        const handlers = this.handlers.filter(i =>
            i.method === method 
            && i.endpoint === url
        );
            
        // Use the class's dispatch property and the handler's
        // onDispatch() to update the App's state
        handlers.forEach(handler => {
            this.dispatch(handler.onDispatch(data));
        });
    
        return response;
    }
}

/**
 * Each object contains an http verb, endpoint, and dispatch handler.
 * When an Axios' response matches the verb & endpoint, the dispatch
 * handler is invoked. This class helps AxiosResponseInterceptor obey
 * the open/closed principle.
 */
class AxiosResponseHandler {
    constructor({ method = null, endpoint = '', onDispatch = () => {} }) {
        this.method = method;
        this.endpoint = endpoint;
        this.onDispatch = onDispatch;
    }

    onDispatch(data) {
        return this.onDispatch(data);
    }
}

export {
    AxiosResponseInterceptor,
    AxiosResponseHandler
}