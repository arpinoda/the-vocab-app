import React from 'react';

const ErrorFallback = ({ error }) => (
    <>
        <h4>There was an error.</h4>
        {
        error && 
        <h5>{error.message}</h5>
        }
        
    </>
);

export default ErrorFallback;
