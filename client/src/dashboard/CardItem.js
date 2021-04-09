import React, { useState } from 'react';

import { WordAPI } from '../api';

const CardItem = ({ word }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    function handleError(err) {
        if(err.response) { 
            const { error } = err.response.data;
            setIsDeleting(false);
            alert(error);
        }    
    }

    function deleteWord(word) {
        setIsDeleting(true);
        WordAPI.deleteWord(word._id)
            .catch(handleError);
    }

    function showPrompt() {
        let result = window.confirm(`Are you sure you want to delete "${word.value}?"`);
        
        if (result) {
            deleteWord(word);
        }
    }

    return (
        <div key={word._id}>
            <div data-value={word.value}>{word.value}</div>
            <button data-value={`delete-${word.value}`} disabled={isDeleting} onClick={showPrompt} id={word.value}>
                { isDeleting ? 'Deleting ...' : 'x'}
            </button>
        </div>
    )
}

export default CardItem;
