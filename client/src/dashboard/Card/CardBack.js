import React, { useState } from 'react';
import { WordAPI } from '../../api';
import { Card } from './';

function handleError(err) {
    if (err.response) { 
        const { error } = err.response.data;
        alert(error);
    }
}

const CardBack = (props) => {
    const { children, word, wordId, definition, synonyms = [] } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    const MAX_SYNONYM_COUNT = 6;
    
    const synonymMessage = 
        (synonyms.length > MAX_SYNONYM_COUNT) 
            ? `+ ${synonyms.length - MAX_SYNONYM_COUNT} more` 
            : '';

    function showPrompt() {
        let result = window.confirm(
            `Delete "${word}"? The deck will be re-shuffled.`
        );
        
        if (result) {
            deleteWord(word);
        }
    }

    function deleteWord(word) {
        setIsDeleting(true);
        WordAPI.deleteWord(wordId)
            .catch(handleError);
    }

    const headerStyle = {
        width: '100%',
        background: 'white',
        color: 'black',
        padding: '0.6rem 1.8rem',
        position: 'relative',
    }
    const mainStyle = {
        padding: '1.4rem 1.8rem',
        letterSpacing: '0.5px'
    }
    const tagContainerStyle = {
        fontSize: '40%',
    }
    const definitionStyle = {
        fontFamily: 'Lora',
        fontSize:'50%',
        color:'rgba(0,0,0, 0.6)',
    }

    return (
        <Card {...props}>
            <header style={headerStyle}>
                {word}
                {children}
            </header>
            <main style={mainStyle}>

                {synonyms.length > 0 && (
                    <div className="mb-3" style={tagContainerStyle}>
                        {synonyms.slice(0, MAX_SYNONYM_COUNT).map((synonym) =>
                            <div className="synonym" key={`synonym-${synonym}`}>{synonym}</div>
                        )}
                        <span className="pl-2 d-inline-block">{synonymMessage}</span>
                    </div>
                )}
                
                <div className="position-relative truncate-overflow" style={definitionStyle}>
                    {definition || <div>
                        Definition was not provided...
                        <p>Tap "View full entry" below for more details</p>
                    </div>}
                </div>

                <button
                    className="delete-button bottom-button"
                    data-value={`delete-${word}`}
                    disabled={isDeleting}
                    onClick={showPrompt}
                    id={wordId}
                >
                    { isDeleting ? 'Deleting ...' : 'Delete this word'}
                </button>

                <a
                    className="url-button bottom-button"
                    data-value={`goto-${word}`}
                    href={`https://www.google.com/search?q=${word}`}
                    rel='noreferrer'
                    target='_blank'
                >
                    {'View full entry'}
                </a>
                
            </main>
        </Card>
    );
}

export default CardBack;
