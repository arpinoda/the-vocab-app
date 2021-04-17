import React from 'react';
import './Login.css';
import { NeomorphicButton } from '../common';

function Login() {
    return (
        <header className='header'>
            <p className='text-dark'>
                You are not logged in
            </p>
            <NeomorphicButton
                className='google-strategy'
                faIcon='fab fa-google'
                text='Login with Google'
                style={{ minWidth: '20rem'}}
                onClick={() => window.location = '/auth/google'}
            ></NeomorphicButton>            
        </header>
    );
}

export default Login;