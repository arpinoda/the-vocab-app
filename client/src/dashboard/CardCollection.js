import React from 'react';

import { WordAPI } from '../api';
import { useAppState } from '../common';

const CardItem = React.lazy(() => import('./CardItem'));
const Instruction = React.lazy(() => import('./Instruction'));
const Toolbar = React.lazy(() => import('./Toolbar'));

const resource = WordAPI.getWords();

const CardCollection = () => {
    resource.read();
    const { words } = useAppState();

    return (
        <>
            <Toolbar />
            { words && words.map(word => <CardItem key={word._id} word={word} />)}
            { words && words.length === 0 && <Instruction /> }
        </>
    )

};

export default CardCollection;