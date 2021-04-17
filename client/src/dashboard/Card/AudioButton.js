import React from 'react';
import { Button } from 'reactstrap';
import SpeakerIcon from '../../images/speaker-icon.png';

const AudioButton = ({className, style, onButtonClicked, isAnimating}) => {

    return (
        <Button
            close
            className={`
                ${className} 
                ${isAnimating ? ' pulse ' : ' '}
            `}
            onClick={onButtonClicked}
            style={{...style}}
        >
            <span aria-hidden="true">
                <img
                    src={SpeakerIcon} 
                    alt="Tap to listen"
                />
            </span>
        </Button>
    );
}

export default AudioButton;
