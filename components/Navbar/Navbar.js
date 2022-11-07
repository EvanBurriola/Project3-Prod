<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Updated Navbar
=======
import Container from 'react-bootstrap/Container';
>>>>>>> Server Navbar Done
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
<<<<<<< HEAD
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import styles from './Navbar.module.css'

export const NavbarServer = () => {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Updated Navbar
=======
>>>>>>> Updated Navbar
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
<<<<<<< HEAD
        </Navbar>
<<<<<<< HEAD
=======
        <h1>
            Navbar
        </h1>
>>>>>>> Layout done, TODO: Functionality
=======
>>>>>>> Updated Navbar
=======

export const NavbarServer = () => {
    return (
        <Navbar bg="light">
            <Col>
                <Navbar.Brand href="server">
                    <img
                        src="/logo.png"
                        width="30"
                        height="30"
                        alt="Spin and Stone logo"
                    />
                </Navbar.Brand>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button className="me-2 ms-1" href="/manager" variant="primary">Manager</Button>
            </Col>
=======
>>>>>>> Updated Navbar
        </Navbar>
>>>>>>> Server Navbar Done
    )
}

export const NavbarCustomer = () => {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Updated Navbar
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
<<<<<<< HEAD
        </Navbar>
    )
}export const NavbarManager = () => {
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
<<<<<<< HEAD
<<<<<<< HEAD
                    <Nav.Link className="me-2 ms-1" href="/server">Server View</Nav.Link>
=======
                    <Nav.Link className="me-2 ms-1" href="">Server View</Nav.Link>
>>>>>>> Updated Navbar
=======
                    <Nav.Link className="me-2 ms-1" href="/server">Server View</Nav.Link>
>>>>>>> MERGED: Manager_frame to server_framework
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
<<<<<<< HEAD
}
=======
// any imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const ManagerNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#dashboard">Spin 'N Stone</Navbar.Brand>
          <Navbar.Toggle aria-controls="manager-navbar" />
          <Navbar.Collapse id="manager-navbar">
            <Nav className="navigations">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#inventory">Inventory</Nav.Link>
              <Nav.Link href="../pages/Manager/employees.js">Employees</Nav.Link>
              <Nav.Link href="#server">Switch View</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
}
>>>>>>> Layout, Login View
=======
}
>>>>>>> Updated Navbar
=======
        <Navbar bg="light">
            <Col md={2}>
                <Navbar.Brand href="Cust_start_order">
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
                    <Nav.Link className="me-2 ms-1" href="">Order</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Deals</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Rewards</Nav.Link>
                </Nav>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button className="me-2 ms-1" href="/login" variant="primary">Login</Button>
            </Col>
=======
>>>>>>> Updated Navbar
        </Navbar>
    )
}

export const NavbarManager = () => {
    return (
<<<<<<< HEAD
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
=======
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
>>>>>>> Updated Navbar
                    <Nav.Link className="me-2 ms-1" href="">Dashboard</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Inventory</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Employees</Nav.Link>
                    <Nav.Link className="me-2 ms-1" href="">Server View</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}>>>>>>> Server Navbar Done
