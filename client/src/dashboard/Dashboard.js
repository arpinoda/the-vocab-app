import React from 'react';
import { WordAPI } from '../api';
import { useAppState } from '../common';

const Instruction = React.lazy(() => import('./Instruction'));
const Toolbar = React.lazy(() => import('./Toolbar'));
const Deck = React.lazy(() => import('./Deck'));

const resource = WordAPI.getWords();

const Dashboard = () => {
    resource.read();
    const { words, user } = useAppState();
    
    const nameParts = user.displayName.split(' ');
    let firstName = user.displayName;

    if (nameParts.length > 0) {
        firstName = nameParts[0];
    }

    return (
        <>
            <Toolbar />
            { words.length > 0 && <Deck data={words} /> }
            { words && words.length === 0 && <Instruction firstName={firstName}/> }
        </>
    );
};

export default Dashboard;