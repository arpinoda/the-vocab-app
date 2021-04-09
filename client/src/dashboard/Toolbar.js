import React, { useState } from 'react';
import { Button } from 'reactstrap';
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
        let word = prompt("Please add a word below");
        word = word ? word.trim().toLowerCase() : '';
        
        if (word) {
            createNewWord(word);
        }
    }

    return (
        <Button id="btn-new-word" disabled={isSaving} onClick={showPrompt}>
            { isSaving ? 'Saving ...' : '+ New Word' }
        </Button>
    );
}

export default Toolbar;