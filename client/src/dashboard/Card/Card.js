import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

const Card = ({ style, className, children}) => (
    <animated.div
        className={className}
        style={style}
    >
        {children}
    </animated.div>
);

Card.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Card;
