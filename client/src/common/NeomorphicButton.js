import React from 'react';
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

export default NeomorphicButton;