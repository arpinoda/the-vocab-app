import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, NavLink, NavbarText, Container, Row, Col, Button } from 'reactstrap';
import Loading from './Loading';

function Dashboard({ user }) {
    let [isLoading, setIsLoading] = useState(true);
    let [words, setWords] = useState([]);

    function handleError(error) {
        if(error.response) { 
            alert(error.response.data)
            setIsLoading(false);
        }    
    }

    useEffect(() => {
        axios.get('/api/words')
            .then(({data}) => {
                setWords(data);
                setIsLoading(false);
            })
            .catch(handleError);
    }, []);

    function onDelete_tapped(id) {
        axios.delete('/api/words', { data: {id : id } })
            .then(({data}) => {
                let index = words.findIndex(w => w._id === data._id);
                let wordsCopy = [...words];
                wordsCopy.splice(index, 1);
                setWords(wordsCopy);
            })
            .catch(handleError);
    }

    function onAddNew_tapped() {
        let word = prompt("Please add a word below");

        word = word ? word.trim().toLowerCase() : '';

        if (word) {
            setIsLoading(true);

            axios.post('/api/words', { word: word })
                .then(({data}) => {
                    setIsLoading(false);
                    
                    setWords(old => [...old, data]);
                })
                .catch(handleError)
        }
    }

    return (
        <>
            <Navbar>
                <NavbarText className="text-light">{user.displayName}</NavbarText>
                    <Button disabled={isLoading} onClick={onAddNew_tapped}>+ New Word</Button>
                <NavLink className="text-light ml-auto" href="/auth/logout">Log Out</NavLink>
            </Navbar>

            {words.length > 0 && (
                <div>
                    <h3>My Words</h3>
                    <ul>
                        {words.map(word => (
                            <li key={word.value}>
                                {word.value}
                                <button id={word._id} onClick={()=> onDelete_tapped(word._id) }>x</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!isLoading && words.length === 0 && (
                <Container className="h-100">
                    <Row className="h-100 justify-content-center align-items-center">
                        <Col sm="12" style={{ top: '40%' }} className="position-absolute top-50 text-center">
                            <p>Welcome!</p>
                            <p>Tap + above to add a word</p>
                        </Col>
                    </Row>
                </Container>
            )}
            {isLoading && words.length === 0 && <Loading />}
        </>
    );
}

export default Dashboard;