import React, { useCallback } from 'react';
import { withDisplayName } from '../utils/with-display-name';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { RouteProps } from './type';

export const Step1 = withDisplayName('Step1')(({

}: RouteProps): JSX.Element | null => {
    const history: any = useHistory();
    const navigateToStep2 = useCallback(() => {
        history.push('/step2');
    }, []);
    return (
        <Container>
            <Row className="justify-content-center">
                <div className="title">Qubit Sheild Installation  &amp; Configuration</div>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col sm={1}>Step 1/5</Col>
                <Col sm={10}>Enable Developer Mode On Your Child's Device</Col>
                <Col sm={1}><div className="redCircle">?</div></Col>
            </Row>
            <Row className="mt-top">
                <Col sm={1}>
                    <div className="numberCircle">1</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/settingPage.png')} alt="xxcxc" />
                </Col>
                <Col sm={1}>
                    <div className="numberCircle">2</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/aboutPhone.png')} alt="xxcxc" />
                </Col>
            </Row>
            <Row className="mt-top20">
                <Col sm={6}>
                    Open setting App On the device. Go to System and scroll down to tap on About phone or About
                    tablet.
                </Col>
                <Col sm={6}>
                    Tap on the build number seven times.
                </Col>
            </Row>
            <Row className="mt-top">
                <Col sm={1}>
                    <div className="numberCircle">3</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/aboutPhone2.png')} alt="xxcxc" />
                </Col>
                <Col sm={1}>
                    <div className="numberCircle">4</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/aboutPhone3.png')} alt="xxcxc" />
                </Col>
            </Row>
            <Row className="mt-top20">
                <Col sm={6}>
                    When you start tapping you will see a message showing how many times are left.
                </Col>
                <Col sm={6}>
                    When you are done  you will see a message saying you are now a developer.
                </Col>
            </Row>

            <Row className="mt-top">
                <Col sm={1}>
                    <div className="numberCircle">5</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/developerOption.png')} alt="xxcxc" />
                </Col>
                <Col sm={1}>
                    <div className="numberCircle">6</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/enableUsbDebugging.png')} alt="xxcxc" />
                </Col>
            </Row>
            <Row className="mt-top20">
                <Col sm={6}>
                    Tap back. You will now see Developer Options in the Systems menu. Tap it.
                </Col>
                <Col sm={6}>
                    Scroll to USB debugging section. Toggle on USB Debugging.
                </Col>
            </Row>
            <Row className="mt-top">
                <Col sm={1}>
                    <div className="numberCircle">7</div>
                </Col>
                <Col sm={5}>
                    <img src={require('../images/usbDebugging.png')} alt="xxcxc" />
                </Col>
                <Col sm={1}>
                    <div className="numberCircle">8</div>
                </Col>
                <Col sm={5}>
                    <Row> Your device is now set for installation.</Row>
                    <Row className="justify-content-center"><Button variant="primary" onClick={navigateToStep2}>Next</Button>{''}</Row>
                </Col>
            </Row>
            <Row className="mt-top20">
                <Col>
                    <Row>Confirm to enable USB Debugging in the dialog box.</Row>
                </Col>
            </Row>
        </Container >
    );
});
