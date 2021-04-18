import React, { useState } from 'react';
import { NeomorphicButton } from '../common';
import { WordAPI } from '../api';

const Toolbar = () => {
    const [isSaving, setIsSaving] = useState(false);

    function handleError(err) {
        if(err.response) { 
            const { error } = err.response.data;
            setIsSaving(false);
            alert(error);
        }    
    }

    const createNewWord = (word) => {
        setIsSaving(true);
        WordAPI.createWord(word)
            .then(() => setIsSaving(false))
            .catch(handleError);
    }
    
    const showPrompt = () => {
        let word = window.prompt("Enter your word below");
        word = word ? word.trim().toLowerCase() : '';
        
        if (word) {
            createNewWord(word);
        }
    }

    return (
        <div style={{ left: '50%', zIndex:2 }} className="position-absolute pt-3 deck-toolbar"> 
            <NeomorphicButton
                className='add-new-word'
                onClick={showPrompt}
                disabled={isSaving}
                faIcon='fas fa-plus'
                style={{ marginLeft: '-50%', backgroundColor:'#ebf3fa'}}
                text={ isSaving ? 'Adding word' : 'Add a word' }
                
            />
        </div>
    );
}

export default Toolbar;