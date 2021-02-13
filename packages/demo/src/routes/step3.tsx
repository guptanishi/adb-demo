import React, { useCallback, useState, useContext } from 'react';
import { withDisplayName, pickFile } from '../utils';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { ProgressIndicator } from "@fluentui/react";
import { RouteProps } from './type';
import { useHistory } from "react-router-dom";
import { ErrorDialogContext } from './../components/error-dialog';
import axios from 'axios';
import { chunkFile } from "./file-manager";
enum Stage {
    Uploading,

    Installing,

    Completed,
}

interface Progress {
    filename: string;

    stage: Stage;

    uploadedSize: number;

    totalSize: number;

    value: number | undefined;
}

export const Step3 = withDisplayName('Step3')(({
    device,
}: RouteProps): JSX.Element | null => {
    const history: any = useHistory();
    const { show: showErrorDialog } = useContext(ErrorDialogContext);

    const deviceInfo = history.location.state.deviceInfo;
    const deviceObject = history.location.state.device;

    const [downloadInfo, setDownloadInfo] = useState({
        progress: 0,
        completed: false,
        total: 0,
        loaded: 0,
        fileName: ""
    });

    const [showDownloadBar, setShowHide] = useState("none");
    const [nextButton, enableNextButton] = useState(false);

    const [installing, setInstalling] = useState(true);
    const [progress, setProgress] = useState<Progress>();


    // Download functionlity 
    const downloadInstaller = () => {
        console.log("download start");
        setShowHide("block");
        const options = {
            onDownloadProgress: (progressEvent: any) => {
                const { loaded, total } = progressEvent;

                setDownloadInfo({
                    progress: Math.floor((loaded * 100) / total),
                    loaded,
                    total,
                    completed: false,
                    fileName: "QMM_100121.apk"
                });
            },
        };
        axios.get("https://cors-anywhere.herokuapp.com/https://qubitmobiles.com/APK/QMM_100121.apk", {
            responseType: "blob",
            ...options,
        }).then((response: any) => {
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: response.headers["application/octet-stream"],
                })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "QMM_100121.apk");
            document.body.appendChild(link);
            link.click();

            setDownloadInfo((info) => ({
                ...info,
                completed: true,
            }));

            setShowHide("none");
        }).catch(reason => {
            setShowHide("none");
            showErrorDialog('Download Failed !.' + reason);
        });
    }

    // install functionality   
    const handleOpen = useCallback(async () => {
        const file = await pickFile({ accept: '.apk' });
        if (!file) {
            return;
        }
        setInstalling(true);
        setProgress({
            filename: file.name,
            stage: Stage.Uploading,
            uploadedSize: 0,
            totalSize: file.size,
            value: 0,
        });

        try {
            await deviceObject!.install(chunkFile(file), (uploaded: any) => {
                if (uploaded !== file.size) {
                    setProgress({
                        filename: file.name,
                        stage: Stage.Uploading,
                        uploadedSize: uploaded,
                        totalSize: file.size,
                        value: uploaded / file.size * 0.8,
                    });
                } else {
                    setProgress({
                        filename: file.name,
                        stage: Stage.Installing,
                        uploadedSize: uploaded,
                        totalSize: file.size,
                        value: 0.8,
                    });
                }
            }).then(() => {
                setProgress({
                    filename: file.name,
                    stage: Stage.Completed,
                    uploadedSize: file.size,
                    totalSize: file.size,
                    value: 1,
                });
                setInstalling(false);
            }).catch((reason: Error) => {
                console.log(reason);
            });
        } catch (e) {
            showErrorDialog('Installaion Failed.Please try again.');
            setInstalling(false);
        }
    }, [deviceObject]);

    // configuration
    const configureDevice = useCallback(async () => {
        const result = await deviceObject.exec('dpm set-device-owner', 'com.qubit.qmm/com.qubit.qmm.source.DeviceAdminReceiver');
        console.log(result);
        let str = result.split(":");
        if (str != undefined && str[0] === "Success") {
            enableNextButton(true);
        } else {
            showErrorDialog(result);
        }

    }, []);

    // next button click handler
    const navigateToNextPage = () => {
        history.push({
            pathname: '/step4',
            state: { device: deviceObject }
        });
    };

    // skip steps
    const skipDownloadStep = useCallback(() => {
        setDownloadInfo((info) => ({
            ...info,
            completed: true,
        }));
    }, [downloadInfo]);

    const skipInstallation = useCallback(() => {
        setInstalling(false);
    }, [installing]);


    return (
        <Container>
            <Row className="justify-content-center">
                <div className="title">Qubit Shield Installation  &amp; Configuration</div>
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
                    <Row><Col>Your Device is compatible with Qubit Shield.</Col></Row>
                </Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">2</div></Col><Col sm={11}>Download Qubit Shield</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" onClick={downloadInstaller}>Download</Button>{''}

                    </Row>
                    <Row className="justify-content-center" style={{ fontSize: "14px" }}>
                        Already downloaded file? <a href="javascript:void(0)" onClick={skipDownloadStep} style={{ marginLeft: "10px" }}> Go to installation</a>
                    </Row>
                    <Row><Col sm={4} style={{ display: `${showDownloadBar}` }}>

                        <ProgressIndicator
                            styles={{ root: { width: 300 } }}
                            label={`${downloadInfo.progress}%`}
                            percentComplete={downloadInfo.progress}
                            description={downloadInfo.fileName}
                        />
                    </Col></Row>
                </Col>
            </Row>


            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">3</div></Col><Col sm={11}>Install Qubit Shield</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" onClick={handleOpen} disabled={!downloadInfo.completed}>Install</Button>{''}
                    </Row>
                    <Row className="justify-content-center" style={{ fontSize: "14px" }}>
                        Already file installed ? <a href="javascript:void(0)" onClick={skipInstallation} style={{ marginLeft: "10px" }}> Go to configuration</a>
                    </Row>
                    <Row><Col sm={4}>
                        {progress && (
                            <ProgressIndicator
                                styles={{ root: { width: 300 } }}
                                label={progress.filename}
                                percentComplete={progress.value}
                                description={Stage[progress.stage]}
                            />
                        )}
                    </Col></Row>
                </Col>
            </Row>


            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">4</div></Col><Col sm={11}>Configure Qubit Shield</Col>
                    </Row>
                    <Row>
                        <Col>you will see a  dialog box on the device asking to allow Qubit sheild to become device owner.<br />
                        Please tap Ok or continue on the device.</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" onClick={configureDevice} disabled={installing}>Configure</Button>{''}
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">5</div></Col><Col sm={11}>Installation sucessful. Click next to proceed.</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" onClick={navigateToNextPage} disabled={!nextButton}>Next</Button>{''}
                    </Row>
                </Col>
            </Row>

        </Container>
    );
});
