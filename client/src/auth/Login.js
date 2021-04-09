import React from 'react';
import './Login.css';

function Login() {
    return (
        <header className="header">
            <p>
                You are not logged in
            </p>
            <a className="link" href={"/auth/google"}>
                Login With Google
            </a>
        </header>
    );
}

export default Login;