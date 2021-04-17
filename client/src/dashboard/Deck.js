import React, { useState } from 'react';
import { useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { CardWrapper } from './Card';
import './Deck.css';

const Physics = {
    DRAG_BOUNDARY_PADDING_PX: 200,
    DRAG_FRICTION: 50,
    DRAG_MAX_VELOCITY: 0.2,
    DRAG_ROTATION_MULTIPLIER: 50,
    DRAG_SIZE_SCALE: 1.1,
    DRAG_TENSION_DEFAULT: 500,
    DRAG_TENSION_ONDISCARD: 200,
    DRAG_TENSION_ONDOWN: 800
}

const Helpers = {
    to: (i, total = Helpers.LONG_DELAY_CUTOFF_COUNT) => {
        const isTopCard = (i === total - 1);
        
        return { 
            x: 0, 
            y: isTopCard ? 0 : i * -4, 
            scale: isTopCard ? 1: 0.8, 
            rot: isTopCard ? 0 : -10 + Math.random() * 20, 
            rotX: isTopCard ? 180 : 220,
            delay: total > Helpers.LONG_DELAY_CUTOFF_COUNT ? i * 10 : i * 100
        };
    },
    from: () => ({ 
        x: 0, 
        rot: 0, 
        scale: 1.5, 
        y: 1500 
    }),
    shuffledBgColors: () => Helpers.CARD_COLORS_HEX
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value),
    LONG_DELAY_CUTOFF_COUNT: 15,
    RESET_DECK_TIMEOUT_MS: 600,
    CARD_COLORS_HEX:[
        'FFC84C', '66DB82', '4CCEFF', 'FF6521', '9C84FF', 
        'FA9824', '36BF6B', '4C96FF', 'DE4128', 'BD10E0'
    ],
};

const Deck = ({ data = [] }) => {

    // Manage spring collection
    const [discarded] = useState(() => new Set());
    discarded.clear();

    const [cardSprings, setCardSprings] = useSprings(data.length, (i) => ({ 
        ...Helpers.to(i, data.length), 
        from: Helpers.from(i) 
    }), [data]);

    // Create a drag gesture & set its handler
    const drag = useDrag(onCardDragged);

    function onCardDragged({ 
        args: [index, onCardDiscarded], 
        direction: [xDir], 
        down,
        event,
        movement: [mx], 
        velocity 
    }) {

        // Prevent button 'pointer downs' from continuing
        const { target, type } = event;
        const tagNames = ['IMG', 'BUTTON', 'A'];
        
        if (type === 'pointerdown' && (tagNames.indexOf(target.tagName) !== -1)
        ) {
            return;
        }

        // Limit drag direction to either left or right
        const dir = xDir < 0 ? -1 : 1;
        
        // Cards with substantial flick velocity will be marked for discard
        const shouldDiscard = velocity > Physics.DRAG_MAX_VELOCITY ;
        
        // Perform the discard if user is no longer touching down
        if (!down && shouldDiscard) {
            discarded.add(index);
            
            // Notify the card that it's being discarded
            setTimeout(() => {
                onCardDiscarded();
            }, Helpers.RESET_DECK_TIMEOUT_MS);
            

            setTimeout(() => {
                return prepareNextCard(index - 1);
            }, 300);
        }
        
        // Update spring data
        setCardSprings((i) => {
            // Targetting only the card being dragged
            if (index !== i) {
                return;
            }

            const isDiscarded = discarded.has(index);
    
            // If card is being discarded, send it off screen "plus some". 
            // Otherwise, put it back to zero
            const x = isDiscarded 
                ? (Physics.DRAG_BOUNDARY_PADDING_PX + window.innerWidth) * dir 
                : down 
                    ? mx 
                    : 0;
            
            // Update the card's rotation after it's flicked. If being discarded, rotation 
            // will correlate with its flick velocity.
            const rot = mx / 100 + (
                isDiscarded
                ? dir * Physics.DRAG_ROTATION_MULTIPLIER * velocity 
                : 0
            );
    
            // Slightly increase the card's size when pressed down
            const scale = down ? Physics.DRAG_SIZE_SCALE : 1;
    
            return { x, rot, scale, delay: undefined, config: { 
                friction: Physics.DRAG_FRICTION, 
                tension: down 
                    ? Physics.DRAG_TENSION_ONDOWN 
                    : isDiscarded 
                        ? Physics.DRAG_TENSION_ONDISCARD 
                        : Physics.DRAG_TENSION_DEFAULT 
            }}
        }); // --- end setCardSprings
    
    
        // Reset the stack if applicable
        if (!down && discarded.size === data.length){
            setTimeout(() => {
                discarded.clear();
                setCardSprings((i) => Helpers.to(i, data.length))
            }, Helpers.RESET_DECK_TIMEOUT_MS);
        }
    
    } // --- end onCardDragged

    const prepareNextCard = (nextIndex) => {
        
        // "Zero-out" transformed properties
        setCardSprings((i) => {
            if (nextIndex < 0 || nextIndex !== i) {
                return;
            }

            return { x:0, y: 0, rot:0, rotX: 180, scale:1, delay: undefined, config: { 
                friction: Physics.DRAG_FRICTION, 
                tension: Physics.DRAG_TENSION_ONDISCARD
            }}
        })
    }

    return (
        <div id="deck">
            {cardSprings.map(({ x, y, rot, rotX, scale }, i) => (
                <CardWrapper
                    i={i}
                    backgroundColor={`#${Helpers.CARD_COLORS_HEX[i % 10]}`}
                    data={data[i]}
                    drag={drag}
                    key={`Card${data[i]._id}`}
                    rot={rot}
                    rotX={rotX}
                    scale={scale}
                    x={x}
                    y={y}
                />
            ))}
        </div>
    );

} // --- end Deck

export default Deck;