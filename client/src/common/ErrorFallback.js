import React from 'react';
import PropTypes from 'prop-types';
import { NeomorphicButton } from './';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div className='absolute-center card-image loading-failed'>
        <div className='w-100 text-center text-secondary vertical-center'>
            
            <h5 className='w-100'>
                Uh oh, something went wrong.
            </h5>
            <h6>
                ({error.message})
            </h6>
            <NeomorphicButton
                className='mt-3 text-primary'
                faIcon='fas'
                onClick={resetErrorBoundary}
                style={{ minWidth: '20rem'}}
                text='Tap to reload'
            />
        </div>
    </div>
);

ErrorFallback.propTypes = {
    error: PropTypes.object,
    resetErrorBoundary: PropTypes.func,
};

export default ErrorFallback;