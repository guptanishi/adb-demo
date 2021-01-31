import React, { useCallback } from 'react';
import { withDisplayName } from '../utils/with-display-name';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { RouteProps } from './type';

export const Step4 = withDisplayName('Step4')(({
}: RouteProps): JSX.Element | null => {
    const history: any = useHistory();

    const device = history.location.state.device;

    const enableDeviceSetting = useCallback(async () => {
        const deviceSetting = await device.exec('pm grant', 'com.qubit.qmm.android.permission.Write_SECURE_SETTINGS');
        console.log(deviceSetting);
    }, [])

    const drawOverOtherApps = useCallback(async () => {
        const deviceSetting = await device.exec('pm grant', 'com.qubit.qmm.android.permission.Write_SECURE_SETTINGS');
        console.log(deviceSetting);
    }, [])

    const usageAccess = useCallback(async () => {
        const deviceSetting = await device.exec('pm grant', 'com.qubit.qmm.android.permission.Write_SECURE_SETTINGS');
        console.log(deviceSetting);
    }, [])
    const done = useCallback(() => {

    }, [])

    return (
        <Container>
            <Row className="justify-content-center">
                <div className="title">Qubit Sheild Installation  &amp; Configuration</div>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col sm={1}>Step 4/5</Col>
                <Col sm={10}>Grant Permissions</Col>
                <Col sm={1}><div className="redCircle">?</div></Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                Qubit Shield needs critical permission. Please grant these permissions to qubit shield one by one.
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col sm={1}>
                    <div className="numberCircle">1</div>
                </Col>
                <Col sm={9}>Change Device Setting</Col>
                <Col sm={2}><Button variant="primary" onClick={enableDeviceSetting}>Enable</Button>{''}</Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col sm={1}>
                    <div className="numberCircle">2</div>
                </Col>
                <Col sm={9}>Draw over other apps</Col>
                <Col sm={2}><Button variant="primary" onClick={drawOverOtherApps}>Enable</Button>{''}</Col>
            </Row>

            <Row style={{ marginTop: '50px' }}>
                <Col sm={1}>
                    <div className="numberCircle">3</div>
                </Col>
                <Col sm={9}>Usage Access</Col>
                <Col sm={2}><Button variant="primary" onClick={usageAccess}>Enable</Button>{''}</Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row className="justify-content-center" style={{ color: 'navy', fontSize: '18px' }}>
                        <p>Congratulations! Qubit Shield Installation &amp; Configuarion is now complete.</p>
                    </Row>

                </Col>
            </Row>

            <Row style={{ marginTop: '20px' }}  >
                <Col>
                    <Row style={{ color: 'gray', fontSize: '12px' }} className="justify-content-center">
                        <p>You may now disconnect your device from the computer by removing the USB cable.</p>
                        <p>After Disconnecting, Please launch Qubit Shield on the device and grant additional permission.
                            Please follow on screen instructions. </p>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" onClick={done}>Done</Button>{''}
                    </Row>

                </Col>
            </Row>

        </Container >
    );
});
