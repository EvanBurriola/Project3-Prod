import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import UserProfile from './UserProfile'
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
import styles from './Navbar.module.css'

/**
 * Creating the layout for the Navbar of the Server View
 * @author Brandon Longuet */ 
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
                    {user && user.role == 'M' && 
                        <NavDropdown title="Manage Store" id="manage-store-dropdown">
                                <NavDropdown.Item href="/manager">Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="/inventory">Inventory</NavDropdown.Item>
                                <NavDropdown.Item href="/menu">Menu</NavDropdown.Item>
                        </NavDropdown>
                    }
                    <Nav.Link className="mx-1 active" href="/server">Take Orders</Nav.Link>
                    <Nav.Link className="mx-1" href="/customer">Self Service</Nav.Link>
                </Nav>
                <div id="google_translate_element" className='mx-1'></div>
                <UserProfile user={user}/>
            </Navbar.Collapse>
        </Navbar>
    )
}

/**
 * Creating the layout for the Navbar of the Customer View
 * @author Brandon Longuet */ 
export const NavbarCustomer = ({user, ...props}) => {
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
                    <Nav.Link className="me-2 ms-1" href="">Order</Nav.Link>
                </Nav>
                <div id="google_translate_element" className='mx-1'></div>
                <UserProfile user={user}/>
            </Navbar.Collapse>
        </Navbar>
    )
}

/**
 * Creating the layout for the Navbar of the Manager View
 * @author Brandon Longuet */ 
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
                <Nav className="navigations me-auto">
                    <NavDropdown title="Manage Store" id="manage-store-dropdown">
                            <NavDropdown.Item href="/manager">Dashboard</NavDropdown.Item>
                            <NavDropdown.Item href="/inventory">Inventory</NavDropdown.Item>
                            <NavDropdown.Item href="/menu">Menu</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link className="mx-1" href="/server">Take Orders</Nav.Link>
                    <Nav.Link className="mx-1" href="/customer">Self Service</Nav.Link>
                </Nav>
                <div id="google_translate_element" className='mx-1'></div>
                <UserProfile user={user}/>
            </Navbar.Collapse>
        </Navbar>
    )
}
