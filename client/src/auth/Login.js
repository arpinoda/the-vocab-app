import React, { useState } from 'react';
import { AuthAPI } from '../api';
import { NeomorphicButton } from '../common';
import './Login.css';

function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const onDemoButtonClick = async () => {
        
        setIsLoading(true);

        try {
            const data = await AuthAPI.doLocalLogin();
            const { status, message } = data;

            if (status === 'ok') {
                window.location.reload();
            } else {
                alert(message);
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            alert(err.message);
        }
    }

    return (
        <header className='header'>
            <p className='text-dark'>
                You are not logged in
            </p>
            <NeomorphicButton
                className='google-strategy'
                disabled={isLoading}
                faIcon='fab fa-google'
                onClick={() => {
                    setIsLoading(true);
                    window.location = '/auth/google'
                }}
                style={{ minWidth: '20rem'}}
                text='Login with Google'
            />
            <NeomorphicButton
                className='mt-3'
                disabled={isLoading}
                faIcon='fas'
                onClick={onDemoButtonClick}
                style={{ minWidth: '20rem'}}
                text='Login as demo user'
            />
        </header>
    );
}

export default Login;