import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Instruction = ({ firstName }) => (
    <Container className="h-100 text-secondary">
        <Row className="h-100 justify-content-center align-items-center">
            <Col sm="12" style={{ letterSpacing: '0px', top: '40%' }} className="instruction position-absolute top-50 text-center">
                <h1>Welcome {firstName}!</h1>
                <h2 className="subtitle pt-2">Add a word to get started 🤓</h2>
            </Col>
        </Row>
    </Container>
);

export default Instruction;