import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, to as interpolate } from 'react-spring';
import { DictionaryAPI } from '../../api';
import { CardFront, CardBack } from './';
import AudioButton from './AudioButton';

import './Card.css';

Audio.prototype.stop = function() {
    this.pause();
    this.currentTime = 0;
}

const Physics = {
    FLIP_FRICTION: 80,
    FLIP_MASS: 5,
    FLIP_TENSION: 700,
};

const handleError = (err) => {
    if (err.response) { 
        const { error } = err.response.data;
        alert(error);
    }
    console.log('Error received.', err);
}

/**
 * Wraps child components and manages their state
 * - is the card flipped
 * - audio object
 * - API request
 */
const CardWrapper = ({backgroundColor, data, drag, i, rot, rotX, scale, x, y}) => {
    
    const [dictEntry, setDictEntry] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [audio, setAudio] = useState(null);
    const transformFn = (r, s, rX) => `perspective(2000px) rotateX(${isFlipped ? 0 : rX}deg) rotateY(${r / 10}deg) rotateZ(${r * 2}deg) scale(${s})`;

    // Setup animation effects & styles
    const { transform, opacity } = useSpring({
        opacity: isFlipped ? 0 : 1,
        transform: interpolate([rot, scale, rotX], transformFn),
        config: { 
            mass: Physics.FLIP_MASS, 
            tension: Physics.FLIP_TENSION, 
            friction: Physics.FLIP_FRICTION 
        }
    });

    const cardBackStyle = {
        backgroundColor,
        opacity: opacity.to(o => 1 - o),
        transform,
        zIndex: isFlipped ? '1' : '0',
    };

    const cardFrontStyle = {
        backgroundColor,
        opacity: opacity,
        transform: transform.to(t =>`${t} rotateX(180deg)`),
        zIndex: isFlipped ? '0' : '1',
    };

    // Request dictionary entry from API upon component load
    useEffect(() => {
        DictionaryAPI.getEntry(data.value)
            .then(setDictEntry)
            .catch(handleError);
    }, [data.value]);

    // Create the audio object when the API response is received
    useEffect(() => {
        const { phoneticUrl } = dictEntry;

        if (!phoneticUrl) return;

        const audio = new Audio(phoneticUrl);

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = (err) => {
            setIsPlaying(false);
            handleError(err);
        }
        
        setAudio(audio);
    }, [dictEntry]);

    // Invoked by our parent Deck component
    function onCardDiscarded() {
        audio && audio.stop();
        setIsFlipped(false);
    }

    // Invoked on card double-click
    function onCardFlipped() {
        audio && audio.stop();
        setIsFlipped(current => !current);
    }

    async function onAudioButtonClicked() {
        try{
            if (!isPlaying) {
                await audio.play();
            }
        } catch (err) {
            handleError(err);
        }
    }

    // Convenience method to centralize component configuration
    const createAudioButton = (style) => (
        <AudioButton
            className={`position-absolute p-3
                ${dictEntry.phoneticUrl
                    ? 'd-block' 
                    : 'd-none'}`
            }
            onButtonClicked={onAudioButtonClicked}
            isAnimating={isPlaying}
            style={style}
        />
    );

    return (
        <animated.div
            key={`animated-${data._id}`} 
            onDoubleClick={onCardFlipped}
            style={{ x, y }}
            {...drag(i, onCardDiscarded)}
        >
            <CardBack
                className={`deck-card back`}
                style={cardBackStyle}
                word={data.value}
                wordId={data._id}
                definition={dictEntry.definition}
                synonyms={dictEntry.synonyms}
            >
                {createAudioButton({
                    top: '0',
                    right: '0',
                    bottom: '0',
                })}
            </CardBack>
            
            <CardFront
                className={`deck-card front`}
                style={cardFrontStyle}
                word={data.value}
                phoneticText={dictEntry.phoneticText}
            >
                {createAudioButton({
                    top: '0.5rem',
                    right: '0',
                })}
            </CardFront>
        </animated.div>
    );
}

CardWrapper.propTypes = {
    backgroundColor: PropTypes.string,
    data: PropTypes.object,
    drag: PropTypes.func,
    i: PropTypes.number,
    rot: PropTypes.number,
    rotX: PropTypes.number,
    scale: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
};

export default CardWrapper;
