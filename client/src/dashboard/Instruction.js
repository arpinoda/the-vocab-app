import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Instruction = (props) => (
    <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
            <Col sm="12" style={{ top: '40%' }} className="instruction position-absolute top-50 text-center">
                <p>Welcome!</p>
                <p className="subtitle">Tap + above to add a word</p>
            </Col>
            <Col>{props.children}</Col>
        </Row>
    </Container>
);

export default Instruction;