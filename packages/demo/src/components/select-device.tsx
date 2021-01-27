import React, { useState } from 'react';
import { Connect, AdbEventLogger } from '../components';
import '../index.css';
import { withDisplayName } from '../utils';
import { Adb } from '@yume-chan/adb';

export const SelectDevice = withDisplayName('selectDevice')(() => {

    const [device, setDevice] = useState<Adb | undefined>();
    const [logger] = useState(() => new AdbEventLogger());
    return (

        <Connect
            device={device}
            logger={logger.logger}
            onDeviceChange={setDevice}
        />
    );
});