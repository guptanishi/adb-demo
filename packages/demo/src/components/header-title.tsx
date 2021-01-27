import React from 'react';
import { withDisplayName } from '../utils/with-display-name';
import { Navbar, Row, Col } from 'react-bootstrap';

export const HeaderTitle = withDisplayName('headerTitle')(() => {
    return (
        <Navbar bg="light">
            <Navbar.Brand href="/"><img src={require('../images/logo.png')} alt="xxcxc" className="imageSize" /></Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{ color: '#F00' }}>
                    <Row style={{ marginRight: '20px' }}>
                        <Col>
                            <Row>Email Us: <a href="#login" style={{ color: '#F00' }}>hello@qubitmobiles.com</a></Row>
                            <Row>Whatsapp Us: <a href="#login" style={{ color: '#F00' }}>+91 866 869 3434</a></Row>
                        </Col>
                    </Row>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
});
