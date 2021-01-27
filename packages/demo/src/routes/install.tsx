import { DefaultButton, ProgressIndicator, Stack } from "@fluentui/react";
import React, { useCallback, useState } from "react";
import { pickFile, withDisplayName } from "../utils";
import { chunkFile } from "./file-manager";
import { RouteProps } from "./type";
import { Row, Col, Button } from 'react-bootstrap';

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

export const Install = withDisplayName('Install')(({
    device,
}: RouteProps): JSX.Element => {
    const [installing, setInstalling] = useState(false);
    const [progress, setProgress] = useState<Progress>();

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

        await device!.install(chunkFile(file), uploaded => {
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
        });

        setProgress({
            filename: file.name,
            stage: Stage.Completed,
            uploadedSize: file.size,
            totalSize: file.size,
            value: 1,
        });
        setInstalling(false);
    }, [device]);

    return (
        <>
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <Row>
                        <Col sm={1}><div className="numberCircle">3</div></Col><Col sm={11}>Install Qubit Sheild</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button variant="primary" onClick={handleOpen}>Install</Button>{''}
                    </Row>
                </Col>
            </Row>

            {progress && (
                <ProgressIndicator
                    styles={{ root: { width: 300 } }}
                    label={progress.filename}
                    percentComplete={progress.value}
                    description={Stage[progress.stage]}
                />
            )}
        </>
    );
});
