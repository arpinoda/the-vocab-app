import React from 'react';
import PropTypes from 'prop-types';
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

CardFront.propTypes = {
    word: PropTypes.string,
    phoneticText: PropTypes.string,
    children: PropTypes.node,
};

export default CardFront;
