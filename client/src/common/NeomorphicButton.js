import React from 'react';
import PropTypes from 'prop-types';
import './NeomorphicButton.css';

const NeomorphicButton = ({ 
    className = '', 
    children, 
    disabled,
    faIcon, 
    onClick, 
    style, 
    text 
}) => (
    <button
        className={`neo-button p-4 ${className}`}
        disabled={disabled}
        onClick={onClick}
        style={style}
    >
        {faIcon && (
            <i className={`${faIcon} fa-lg`}>
                <span>{text}</span>
            </i>
        )}
        {!faIcon && <span>{text}</span>}
        {children}
    </button>
);

NeomorphicButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    faIcon: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
}

export default NeomorphicButton;