import React from 'react';
import { Card } from './';

const CardFront = (props) => {
    const { word = '<unset-word>', phoneticText = '', children } = props;

    return (
        <Card {...props}>
            {children}

            <div
                className="vertical-center w-100 text-center"
                data-value={word}
            >
                <div className="title">{word}</div>
                <div className="subtitle">{phoneticText}</div>
            </div>
        </Card>
    );
};

export default CardFront;
