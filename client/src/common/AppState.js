import React from 'react';
import { endpoints, methods } from '../api/enums';
import { AxiosResponseInterceptor, AxiosResponseHandler } from './AppStateAxios';


/** 
 * Reducer-related
 * * * * * * * * * * * */
const initialState = {
    user: { displayName: '' },
    words: []
}

const actions = {
    ADD_WORD: 'APP/ADD_WORD',
    DELETE_WORD: 'APP/DELETE_WORD',
    SET_USER: 'APP/SET_USER'
};

function appStateReducer(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_WORD:
            return {
                ...state,
                words: Array.isArray(action.word) 
                    ? [...state.words, ...action.word] 
                    : [...state.words, action.word]
            }
        case actions.DELETE_WORD:
            return {
                ...state,
                words: state.words.filter(w => w._id !== action.word._id)
            }
        case actions.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            throw new Error(`Invalid action sent to appStateReducer ${action}`);
    }
}



/** 
 * Intercept Axios responses and update state
 * * * * * * * * * * * * * * * * * * * * * * * */
const setUser = (user) => ({ type: actions.SET_USER, user });
const addWord = (word) => ({ type: actions.ADD_WORD, word });
const deleteWord = (word) => ({ type: actions.DELETE_WORD, word });

const axiosInterceptor = new AxiosResponseInterceptor([
    new AxiosResponseHandler({ 
        method: methods.GET, 
        endpoint: endpoints.WORD, 
        onDispatch: addWord 
    }),
    new AxiosResponseHandler({
        method: methods.POST,
        endpoint: endpoints.WORD,
        onDispatch: addWord
    }),
    new AxiosResponseHandler({
        method: methods.DELETE,
        endpoint: endpoints.WORD,
        onDispatch: deleteWord
    }),
    new AxiosResponseHandler({
        method: methods.GET,
        endpoint: endpoints.AUTH,
        onDispatch: setUser
    })
]);

/** 
 * Context 
 * * * * * * * * * * * */
 const AppState = React.createContext();
 const Dispatch = React.createContext();

 AppState.displayName = 'AppState';
 Dispatch.displayName = 'Dispatch';

 // One context for managing state (user and words)
 export const useAppState = () => React.useContext(AppState);

 // Another context when needing to dispatch updates
 export const useDispatch = () => React.useContext(Dispatch);

 export const AppStateProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(appStateReducer, initialState);
    
    axiosInterceptor.updateDispatch(dispatch);

    return (
        <AppState.Provider value={state}>
            <Dispatch.Provider value={dispatch}>
            {children}
            </Dispatch.Provider>
        </AppState.Provider>
    );
 }