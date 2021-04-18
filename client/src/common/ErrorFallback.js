import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div onClick={resetErrorBoundary} className="absolute-center card-image loading-failed">
        <div className="w-100 text-center text-secondary vertical-center">
            
            <h5 className="w-100">
                Uh oh, something went wrong.
            </h5>
            <h6>
                ({error.message})
            </h6>
            <h5 className="w-100 text-primary">
                Tap to reload
            </h5>
        </div>
    </div>
);

export default ErrorFallback;