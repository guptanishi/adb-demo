import { Dialog, Dropdown, IDropdownOption, ProgressIndicator } from '@fluentui/react';
import { Adb, AdbBackend, AdbLogger } from '@yume-chan/adb';
import AdbWebBackend, { AdbWebBackendWatcher } from '@yume-chan/adb-backend-web';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ErrorDialogContext } from './error-dialog';
import { withDisplayName } from '../utils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const DropdownStyles = { dropdown: { width: '100%' } };

interface ConnectProps {
    device: Adb | undefined;

    logger?: AdbLogger;

    onDeviceChange: (device: Adb | undefined) => void;
}

export const Connect = withDisplayName('Connect')(({
    device,
    logger,
    onDeviceChange,
}: ConnectProps): JSX.Element | null => {
    const supported = AdbWebBackend.isSupported();

    const { show: showErrorDialog } = useContext(ErrorDialogContext);

    const [backendOptions, setBackendOptions] = useState<IDropdownOption[]>([]);
    const [selectedBackend, setSelectedBackend] = useState<AdbBackend | undefined>();
    const [deviceInfo, setDeviceInfo] = useState({
        device_owner: "",
        product: {
            manufacturer: "",
            model: "",
        },
        buildVersion: "",
        sdk: ""
    });
    const history = useHistory();
    const checkCompatibitlity = (deviceInfo: any) => {

        if (Number(deviceInfo.buildVersion) < 6.0) {
            showErrorDialog(`your device is not compatible with qubit sheild since it has OS version ${deviceInfo.buildVersion}`);
            return;
        } else {
            history.push({
                pathname: '/step3',
                state: { deviceInfo: deviceInfo, device: device }
            });
        }

    };

    useEffect(() => {
        if (!supported) {
            showErrorDialog('Unable to connect your device.You may try again.');
            return;
        }

        async function refresh() {
            const backendList = await AdbWebBackend.getDevices();

            const options = backendList.map(item => ({
                key: item.serial,
                text: `${item.serial} ${item.name ? `(${item.name})` : ''}`,
                data: item,
            }));
            setBackendOptions(options);

            setSelectedBackend(old => {
                if (old && backendList.some(item => item.serial === old.serial)) {
                    return old;
                }
                return backendList[0];
            });
        };

        refresh();
        const watcher = new AdbWebBackendWatcher(refresh);
        return () => watcher.dispose();
    }, []);

    const handleSelectedBackendChange = (
        _e: React.FormEvent<HTMLDivElement>,
        option?: IDropdownOption,
    ) => {
        setSelectedBackend(option?.data as AdbBackend);
    };

    const requestAccess = useCallback(async () => {
        const backend = await AdbWebBackend.requestDevice();
        if (backend) {
            setBackendOptions(list => {
                for (const item of list) {
                    if (item.key === backend.serial) {
                        setSelectedBackend(item.data);
                        return list;
                    }
                }

                setSelectedBackend(backend);
                return [...list, {
                    key: backend.serial,
                    text: `${backend.serial} ${backend.name ? `(${backend.name})` : ''}`,
                    data: backend,
                }];
            });
        }
    }, []);

    const [connecting, setConnecting] = useState(false);
    const connect = useCallback(async () => {
        try {
            if (selectedBackend) {
                const device = new Adb(selectedBackend, logger);

                // fetch('http://localhost:4000/deviceDetails', {
                //     method: 'POST',
                //     mode: 'cors',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({: deviceDetails })
                // })
                //     .then(response => {
                //         console.log(response)
                //     })

                try {
                    setConnecting(true);
                    await device.connect();
                    onDeviceChange(device);
                    let manufacturer = await device.exec('getprop', 'ro.product.manufacturer');
                    console.log("manufacturer" + "---" + manufacturer);
                    let model = await device.exec('getprop', 'ro.product.model');
                    console.log("model" + "---" + model);
                    let buildVersion = await device.exec('getprop', 'ro.build.version.release');
                    console.log("buildVersion" + "---" + buildVersion);
                    let sdk = await device.exec('getprop', 'ro.build.version.sdk');
                    console.log("sdk" + "---" + sdk);
                    let os = await device.exec('getprop', 'ro.com.google.clientidbase');
                    console.log("os" + "---" + os);
                    let device_owner = await device.exec('getprop', 'ro.device_owner');
                    console.log("device_owner" + "---" + device_owner);


                    let deviceDetails = {
                        device_owner: device_owner,
                        product: {
                            manufacturer: manufacturer,
                            model: model,
                        },
                        buildVersion: buildVersion,
                        sdk: sdk,
                        os: os
                    }
                    console.log(deviceDetails);
                    setDeviceInfo(deviceDetails);

                } catch (e) {
                    device.dispose();
                    throw e;
                }
            }
        } catch (e) {
            showErrorDialog(e.message);
        } finally {
            setConnecting(false);
        }
    }, [selectedBackend, logger, onDeviceChange]);
    useEffect(() => {
    }, [deviceInfo]);
    const disconnect = useCallback(async () => {
        try {
            await device!.dispose();
            onDeviceChange(undefined);
        } catch (e) {
            showErrorDialog(e.message);
        }
    }, [device]);
    useEffect(() => {
        return device?.onDisconnected(() => {
            onDeviceChange(undefined);
        });
    }, [device, onDeviceChange]);

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <Row><div className="numberCircle">2</div><Button variant="primary" className="justify-content-start" style={{ marginLeft: '50px' }} onClick={requestAccess} disabled={!supported}>Select Device</Button></Row>
                </Col>
                <Col sm={2}></Col>
                <Col sm={6}>
                    <Dropdown
                        disabled={!!device || backendOptions.length === 0}
                        label="Available devices"
                        placeholder="No available devices"
                        options={backendOptions}
                        styles={DropdownStyles}
                        dropdownWidth={300}
                        selectedKey={selectedBackend?.serial}
                        onChange={handleSelectedBackendChange}
                    />
                </Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col sm={4}>
                    <Row>
                        <div className="numberCircle">3</div>
                        <div className="justify-content-start">
                            <p>Now Your device is ready to connect Qubit Shield installer. Please press connect Button.</p>
                            <p>You will see dialog box on the device asking to allow USB Debugging. Tap Ok.</p>
                        </div>
                    </Row>

                    <Row className="justify-content-center" >
                        {!device ? (
                            <Button variant="primary" onClick={connect} disabled={!selectedBackend}>Connect</Button>
                        ) : (
                                <Button variant="primary" onClick={disconnect} >Disconnect</Button>
                            )
                        }
                    </Row>
                    <Dialog
                        hidden={!connecting}
                        dialogContentProps={{
                            title: 'Connecting...',
                            subText: 'Please authorize the connection on your device'
                        }}
                    >
                        <ProgressIndicator />
                    </Dialog>
                </Col>
                <Col sm={2}></Col>
                <Col sm={6}><img src={require('../images/usbDebugging.png')} alt="xxcxc" /></Col>
            </Row>

            <Row style={{ marginTop: '20px' }}></Row>
            <Row className="justify-content-start">After connecting the USB cable, please select your device from the list above.</Row>

            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <div className="numberCircle">4</div>
                        <div className="justify-content-start" style={{ marginLeft: '20px' }} >
                            Conection successful. Click Next to proceed.
                            </div>
                    </Row>
                    <Row className="justify-content-center" ><Button variant="primary" disabled={!device?.connected} onClick={() => checkCompatibitlity(deviceInfo)}>Next{connecting}</Button>{''}</Row>
                </Col>
            </Row>
        </Container>
    );
});
