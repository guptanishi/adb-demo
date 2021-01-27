import React from 'react';
import { withDisplayName } from '../utils/with-display-name';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { SelectDevice } from '../components';
import { RouteProps } from './type';

export const Step2 = withDisplayName('Step2')(({
    visible,
    device,
}: RouteProps): JSX.Element | null => {
    return (
        <Container>
            <Row className="justify-content-center">
                <b>Qubit Sheild installation  &amp; Configuration</b>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col sm={1}>Step 2/5</Col>
                <Col sm={10}>Connect your child's device through USB</Col>
                <Col sm={1}><div className="redCircle">?</div></Col>
            </Row>
            {/* step 1 */}
            <Row style={{ marginTop: '50px' }}>
                <Col sm={4}>
                    <Row><div className="numberCircle">1</div></Row>
                    <Row><div className="justify-content-start" style={{ marginTop: '50px' }}>Through the USB cable, connect the device to the computer.</div></Row>
                </Col>
                <Col sm={2}></Col>
                <Col sm={6}><img src={require('../images/laptop.jpg')} alt="xxcxc" className="imageSize" /></Col>
            </Row>
            {/* step 2, 3, 4 */}
            <SelectDevice></SelectDevice>
        </Container >
    );
});
