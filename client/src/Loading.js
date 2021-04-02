import React from 'react';
import { Spinner } from 'reactstrap';
import './App.css';

function Loading() {
    return (
        <div className="App">
            <header className="App-header">
                <Spinner color="secondary" />
            </header>
        </div>
    );
}

export default Loading;