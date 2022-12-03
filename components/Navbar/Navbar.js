import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import styles from './Navbar.module.css'

export const NavbarServer = () => {
    return (
        <Navbar expand="lg" className={`${styles.navOffWhite}`}>
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
        <Navbar expand="lg" className={`${styles.navOffWhite}`}>
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
                    <Nav.Link className="me-2 ms-1" href="/manager">Dashboard</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="/inventory">Inventory</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Employees</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="/server">Server View</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
