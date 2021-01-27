import { Adb } from '@yume-chan/adb';
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CacheSwitch, CacheRoute, ErrorDialogProvider, HeaderTitle, LoggerContextProvider } from './components';
import './index.css';
import { Step2, Step3 } from './routes';

interface RouteInfo {
    path: string;

    exact?: boolean;

    name: string;

    children: JSX.Element | null;

    noCache?: boolean;
}

function App(): JSX.Element | null {

    const [device, setDevice] = useState<Adb | undefined>();

    const [leftPanelVisible, setLeftPanelVisible] = useState(() => innerWidth > 650);
    const toggleLeftPanel = useCallback(() => {
        setLeftPanelVisible(value => !value);
    }, []);


    const routes = useMemo((): RouteInfo[] => [
        {
            path: '/',
            exact: true,
            name: 'Step2',
            children: (
                <Step2 />
            )
        },
        {
            path: '/step3',
            exact: true,
            name: 'Step3',
            children: (
                <Step3 />
            )
        },

    ], [device]);


    return (
        <LoggerContextProvider>
            <HeaderTitle></HeaderTitle>
            <CacheSwitch>
                {routes.map<React.ReactElement>(route => (
                    <CacheRoute
                        exact={route.exact}
                        path={route.path}
                        noCache={route.noCache}>
                        {route.children}
                    </CacheRoute>
                ))}


            </CacheSwitch>
        </LoggerContextProvider >

    );
}

ReactDOM.render(
    <HashRouter>
        <ErrorDialogProvider>
            <App />
        </ErrorDialogProvider>
    </HashRouter>,
    document.getElementById('container')
);
