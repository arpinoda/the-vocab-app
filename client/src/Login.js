import React from 'react';
import './App.css';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    You are not logged in
                </p>
                <a
                    className="App-link"
                    href={"/auth/google"}
                >
                    Login With Google
                </a>
            </header>
        </div>
    );
}

export default Login;