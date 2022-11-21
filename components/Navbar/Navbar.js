import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserProfile from './UserProfile'
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import styles from './Navbar.module.css'

export const NavbarServer = ({user, ...props}) => {
    return (
        <Navbar expand="lg" className={`${styles.navOffWhite}`}>
            <Navbar.Brand href="/" className={styles.logoContainer}>
                <Image
                    src={logo}
                    alt="Spin and Stone logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="customer-navbar" />
            <Navbar.Collapse id="customer-navbar">
                <Nav className="navigations me-auto">
                    {user && user.role == 'M' && <Nav.Link className="mx-1" href="/manager">Manage Store</Nav.Link>}
                    <Nav.Link className="mx-1 active" href="/server">Take Orders</Nav.Link>
                    <Nav.Link className="mx-1" href="/customer">Self Service</Nav.Link>
                </Nav>
                <div id="google_translate_element" className='mx-1'></div>
                <UserProfile user={user}/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavbarCustomer = ({user, ...props}) => {
    return (
        <Navbar expand="lg" className={`${styles.navOffWhite}`}>
            <Navbar.Brand href="#" className={styles.logoContainer}>
                <Image
                    src={logo}
                    alt="Spin and Stone logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="customer-navbar" />
            <Navbar.Collapse id="customer-navbar">
                <Nav className="navigations me-auto">
                    <Nav.Link className="me-2 ms-1" href="">Order</Nav.Link>
                </Nav>
                <div id="google_translate_element" className='mx-1'></div>
                <UserProfile user={user}/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavbarManager = ({user, ...props}) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className={styles.logoContainer}>
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
                <div id="google_translate_element" className='mx-1'></div>
                <UserProfile user={user}/>
            </Navbar.Collapse>
        </Navbar>
    )
}
