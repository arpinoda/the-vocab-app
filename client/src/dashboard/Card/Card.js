import React from 'react';
import { animated } from 'react-spring';

const Card = ({ style, className, children}) => (
    <animated.div
        className={className}
        style={style}
    >
        {children}
    </animated.div>
);

export default Card;
