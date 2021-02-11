import React, { useCallback } from 'react';
import { withDisplayName } from '../utils/with-display-name';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { RouteProps } from './type';
import Carousel from '../components/carousel';

export const Step1 = withDisplayName('Step1')(({

}: RouteProps): JSX.Element | null => {
    const history: any = useHistory();
    const navigateToStep2 = useCallback(() => {
        history.push('/step2');
    }, []);
    return (
        <Container >
            <Row className="justify-content-center">
                <div className="title">Qubit Shield Installation  &amp; Configuration</div>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col sm={1}>Step 1/5</Col>
                <Col sm={10}>Enable Developer Mode On Your Child's Device</Col>
                <Col sm={1}><div className="redCircle">?</div></Col>
            </Row>
            <Row>
                <Carousel />
            </Row>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={navigateToStep2}>Continue</Button>{''}
            </Row>
        </Container >
    );
});


