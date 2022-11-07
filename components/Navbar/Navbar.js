<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Updated Navbar
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import styles from './Navbar.module.css'

export const NavbarServer = () => {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
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
        </Navbar>
<<<<<<< HEAD
=======
        <h1>
            Navbar
        </h1>
>>>>>>> Layout done, TODO: Functionality
=======
>>>>>>> Updated Navbar
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
                    <Nav.Link className="me-2 ms-1" href="/server">Server View</Nav.Link>
=======
                    <Nav.Link className="me-2 ms-1" href="">Server View</Nav.Link>
>>>>>>> Updated Navbar
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
