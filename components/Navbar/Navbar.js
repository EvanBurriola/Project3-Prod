import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import styles from './Navbar.module.css'

export const NavbarServer = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/server" className={styles.logoContainer}>
                <Image
                    src={logo}
                    alt="Spin and Stone logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="customer-navbar" />
            <Navbar.Collapse id="customer-navbar">
            <Nav className="navigations">
                <Nav.Link className="me-2 ms-1" href="/manager">Manager View</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavbarCustomer = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/dashboard" className={styles.logoContainer}>
                <Image
                    src={logo}
                    alt="Spin and Stone logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="customer-navbar" />
            <Navbar.Collapse id="customer-navbar">
            <Nav className="navigations">
                <Nav.Link className="me-2 ms-1" href="">Order</Nav.Link>
                <Nav.Link className="me-2 ms-1" href="">Deals</Nav.Link>
                <Nav.Link className="me-2 ms-1" href="">Rewards</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavbarManager = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/manager" className={styles.logoContainer}>
                <Image
                    src={logo}
                    alt="Spin and Stone logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="manager-navbar" />
            <Navbar.Collapse id="manager-navbar">
                <Nav className="navigations">
                    <Nav.Link className="me-2 ms-1" href="">Dashboard</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Inventory</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Employees</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Server View</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavbarManager = () => {
    return (
        <Navbar bg="light">
            <Col md={2}>
                <Navbar.Brand href="Cust_manager">
                    <img
                        src="/logo.png"
                        width="30"
                        height="30"
                        alt="Spin and Stone logo"
                    />
                </Navbar.Brand>
            </Col>
            <Col className="d-flex justify-content-start">
                <Nav>
                    <Nav.Link className="me-2 ms-1" href="">Dashboard</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Inventory</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Employees</Nav.Link>
                </Nav>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button className="me-2 ms-1" href="/server" variant="primary">Server</Button>
            </Col>
        </Navbar>
    )
}