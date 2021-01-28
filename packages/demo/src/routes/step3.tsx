import React, { useCallback } from 'react';
import { withDisplayName } from '../utils/with-display-name';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { RouteProps } from './type';
import { useHistory } from "react-router-dom";
import { Install } from './install';

export const Step3 = withDisplayName('Step3')(({
    device,
}: RouteProps): JSX.Element | null => {
    const history: any = useHistory();

    const deviceInfo = history.location.state.deviceInfo;
    const deviceObject = history.location.state.device;

    // const downloadInstaller = useCallback(async () => {
    //     await deviceObject.exec('getprop', 'ro.product.manufacturer');
    // }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <div className="title">Qubit Sheild Installation  &amp; Configuration</div>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col sm={1}>Step 3/5</Col>
                <Col sm={10}>Confirm Installation</Col>
                <Col sm={1}><div className="redCircle">?</div></Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">1</div></Col><Col sm={11}>Device Compatibilty</Col>
                    </Row>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={5} style={{ color: 'blue' }} > Device Detected</Col>
                        <Col sm={6}>{deviceInfo.product.manufacturer} {deviceInfo.product.model}</Col>
                    </Row>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={5} style={{ color: 'blue' }} > OS Version</Col>
                        <Col sm={6}>{deviceInfo.os}{deviceInfo.buildVersion}</Col>
                    </Row>
                    <Row><Col>Your Device is compatible with Qubit Sheild.</Col></Row>
                </Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">2</div></Col><Col sm={11}>Download Qubit Sheild</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" >Download</Button>{''}
                    </Row>
                </Col>
            </Row>
            <Install />
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">4</div></Col><Col sm={11}>Configure Qubit Sheild</Col>
                    </Row>
                    <Row>
                        <Col>you will see a  dialog box on the device asking to allow Qubit sheild to become device owner.<br />
                        Please tap Ok or continue on the device.</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary">Configure</Button>{''}
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">5</div></Col><Col sm={11}>Installation sucessful. Click next to proceed.</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary">Next</Button>{''}
                    </Row>
                </Col>
            </Row>

        </Container >
    );
});
